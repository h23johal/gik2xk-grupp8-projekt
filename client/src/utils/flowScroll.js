export function createFlowScroll({
  initialOffset = 0,
  updateOffset,
  deceleration = 0.012, // Extra slow deceleration
  maxMomentumDuration = 1800, // Much longer momentum
  maxVelocity = 0.0035, // Very gentle max velocity
  alignmentCalculator = null
}) {
  let offset = initialOffset;
  let velocity = 0;
  let targetVelocity = 0;
  let animFrame = null;
  let lastTime = null;
  let momentumStartTime = null;
  let refreshRate = 60;
  
  // Ultra-smooth thresholds for buttery experience
  const velocityStopThreshold = maxVelocity * 0.03;
  const velocitySnapThreshold = maxVelocity * 0.06;
  const velocityCap = maxVelocity * 1.1;
  
  // Very gentle acceleration for silky smooth starts
  const accelerationFactor = 0.045;

  // Detect refresh rate for consistent experience across devices
  const detectRefreshRate = () => {
    if (window.requestAnimationFrame) {
      let rafId;
      let frameCount = 0;
      let startTime;
      
      const countFrames = (timestamp) => {
        if (!startTime) {
          startTime = timestamp;
          frameCount = 0;
        } else if (timestamp - startTime >= 1000) {
          refreshRate = Math.max(30, Math.min(240, frameCount));
          return;
        }
        
        frameCount++;
        rafId = requestAnimationFrame(countFrames);
      };
      
      rafId = requestAnimationFrame(countFrames);
      
      setTimeout(() => {
        if (rafId) {
          cancelAnimationFrame(rafId);
        }
      }, 1200);
    }
  };
  
  detectRefreshRate();

  function setVelocity(newVelocity) {
    targetVelocity = Math.max(-maxVelocity, Math.min(maxVelocity, newVelocity));
  }

  function momentum(now) {
    if (!momentumStartTime) momentumStartTime = now;
    const dt = (now - lastTime) / 1000;
    lastTime = now;
    
    // Gradually approach target velocity with smoother curve
    if (Math.abs(velocity - targetVelocity) > 0.0001) {
      velocity += (targetVelocity - velocity) * accelerationFactor;
    }
    
    // Scale movement based on refresh rate
    offset += velocity * dt * refreshRate;
    
    // Get alignment information from consumer
    const alignmentInfo = alignmentCalculator ? alignmentCalculator(offset) : {
      alignedOffset: offset,
      distanceToAligned: 0,
      alignmentThreshold: 10
    };
    
    // Progressive deceleration based on proximity to alignment point
    const proximityFactor = Math.min(1, alignmentInfo.distanceToAligned / 
                                    (alignmentInfo.alignmentThreshold * 8)); // Increased from 5
    
    // Apply deceleration with proximity awareness
    const effectiveDeceleration = deceleration * (0.7 + 0.3 * (1 - proximityFactor));
    velocity *= Math.exp(-effectiveDeceleration * dt * 1000);
    targetVelocity *= Math.exp(-effectiveDeceleration * dt * 1000);
    
    // Prevent tiny movements
    if (Math.abs(velocity) < velocityStopThreshold) {
      velocity = 0;
      targetVelocity = 0;
    }
  
    updateOffset(offset);
    
    // Improved snap logic
    if (
      (Math.abs(velocity) < velocitySnapThreshold && 
       alignmentInfo.distanceToAligned < alignmentInfo.alignmentThreshold) || 
      now - momentumStartTime >= maxMomentumDuration
    ) {
      // Extra slow, buttery snap animation
      const snapStartTime = now;
      const snapStartOffset = offset;
      const snapDuration = 650; // Super slow, buttery smooth
      
      const snapAnimation = (snapNow) => {
        const progress = Math.min(1, (snapNow - snapStartTime) / snapDuration);
        // Smoother easing function
        const easedProgress = progress < 0.5 
          ? 2 * progress * progress 
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        
        offset = snapStartOffset + 
                (alignmentInfo.alignedOffset - snapStartOffset) * easedProgress;
        updateOffset(offset);
        
        if (progress < 1) {
          animFrame = requestAnimationFrame(snapAnimation);
        } else {
          offset = alignmentInfo.alignedOffset;
          updateOffset(offset);
          velocity = 0;
          targetVelocity = 0;
          animFrame = null;
          momentumStartTime = null;
        }
      };
      
      animFrame = requestAnimationFrame(snapAnimation);
      return;
    }
  
    animFrame = requestAnimationFrame(momentum);
  }

  function start() {
    if (animFrame) {
      cancelAnimationFrame(animFrame);
      animFrame = null;
    }
    velocity = 0;
    targetVelocity = 0;
    momentumStartTime = null;
    lastTime = performance.now();
  }

  function move(delta) {
    offset += delta;
    
    // Set target velocity based on movement, with a gentler approach
    targetVelocity = delta * 0.025; // Reduced from 0.05
    
    updateOffset(offset);
  }

  function end() {
    // Get alignment information from consumer
    const alignmentInfo = alignmentCalculator ? alignmentCalculator(offset) : {
      alignedOffset: offset,
      distanceToAligned: 0,
      alignmentThreshold: 10,
      nextAlignedOffset: offset,
      prevAlignedOffset: offset
    };
    
    // If barely moving, just snap to position
    if (Math.abs(targetVelocity) < velocitySnapThreshold * 0.5 && 
        alignmentInfo.distanceToAligned < alignmentInfo.alignmentThreshold * 0.8) {
      // Use smooth transition instead of immediate snap
      const snapStartTime = performance.now();
      const snapStartOffset = offset;
      const snapDuration = 300;
      
      const smoothSnap = (snapNow) => {
        const progress = Math.min(1, (snapNow - snapStartTime) / snapDuration);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        
        offset = snapStartOffset + 
                (alignmentInfo.alignedOffset - snapStartOffset) * easedProgress;
        updateOffset(offset);
        
        if (progress < 1) {
          animFrame = requestAnimationFrame(smoothSnap);
        } else {
          offset = alignmentInfo.alignedOffset;
          updateOffset(offset);
          velocity = 0;
          targetVelocity = 0;
          animFrame = null;
        }
      };
      
      lastTime = performance.now();
      animFrame = requestAnimationFrame(smoothSnap);
      return;
    }
    
    // Determine directional intent for meaningful movements
    const directionalIntent = Math.sign(targetVelocity);
    
    // Choose target based on intent and velocity
    let targetOffset;
    if (Math.abs(targetVelocity) > velocitySnapThreshold && 
        alignmentInfo.distanceToAligned > alignmentInfo.alignmentThreshold * 1.2) { // Reduced from 1.5
      // Clear directional intent detected
      targetOffset = directionalIntent > 0 ? 
                     alignmentInfo.nextAlignedOffset : 
                     alignmentInfo.prevAlignedOffset;
    } else {
      // For smaller movements, use predicted position
      const predictedStopOffset = offset + targetVelocity / deceleration;
      
      // Find closest alignment point to predicted position
      const distToNext = Math.abs(predictedStopOffset - alignmentInfo.nextAlignedOffset);
      const distToCurrent = Math.abs(predictedStopOffset - alignmentInfo.alignedOffset);
      const distToPrev = Math.abs(predictedStopOffset - alignmentInfo.prevAlignedOffset);
      
      if (distToNext <= distToCurrent && distToNext <= distToPrev) {
        targetOffset = alignmentInfo.nextAlignedOffset;
      } else if (distToPrev <= distToCurrent && distToPrev <= distToNext) {
        targetOffset = alignmentInfo.prevAlignedOffset;
      } else {
        targetOffset = alignmentInfo.alignedOffset;
      }
    }
    
    // Set a reduced velocity to smoothly move to the target
    const distance = targetOffset - offset;
    velocity = distance * deceleration * 0.2; // Reduced from 0.3
    targetVelocity = velocity;
    
    // Cap velocity for consistency
    velocity = Math.sign(velocity) * Math.min(Math.abs(velocity), velocityCap);
    targetVelocity = velocity;
  
    lastTime = performance.now();
    momentumStartTime = null;
    animFrame = requestAnimationFrame(momentum);
  }
  
  function cancel() {
    if (animFrame) {
      cancelAnimationFrame(animFrame);
      animFrame = null;
    }
    velocity = 0;
    targetVelocity = 0;
  }

  function getOffset() {
    return offset;
  }

  return {
    start,
    move,
    end,
    cancel,
    setVelocity,
    getOffset,
  };
}