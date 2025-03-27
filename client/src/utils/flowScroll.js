export function createFlowScroll({
  initialOffset = 0,
  updateOffset,
  deceleration = 0.0004,
  maxMomentumDuration = 800,
  maxVelocity = 0.01,
  alignmentCalculator = null
}) {
  let offset = initialOffset;
  let velocity = 0;
  let targetVelocity = 0;
  let animFrame = null;
  let lastTime = null;
  let momentumStartTime = null;
  let refreshRate = 60;
  
  // Tuned thresholds for a smooth experience
  const velocityStopThreshold = maxVelocity * 0.08;
  const velocitySnapThreshold = maxVelocity * 0.15;
  const velocityCap = maxVelocity * 1.5;
  
  // Acceleration factor for smoother starts
  const accelerationFactor = 0.15;

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
    
    // Gradually approach the target velocity
    if (Math.abs(velocity - targetVelocity) > 0.0001) {
      velocity += (targetVelocity - velocity) * accelerationFactor;
    }
    
    // Scale movement based on refresh rate
    offset += velocity * dt * refreshRate;
    
    // Get alignment information from the consumer
    const alignmentInfo = alignmentCalculator ? alignmentCalculator(offset) : {
      alignedOffset: offset,
      distanceToAligned: 0,
      alignmentThreshold: 10
    };
    
    // Progressive deceleration based on proximity to alignment point
    const proximityFactor = Math.min(1, alignmentInfo.distanceToAligned / 
                                      (alignmentInfo.alignmentThreshold * 5));
    
    // Apply deceleration with proximity awareness
    const effectiveDeceleration = deceleration * (0.8 + 0.4 * (1 - proximityFactor));
    velocity *= Math.exp(-effectiveDeceleration * dt * 1000);
    targetVelocity *= Math.exp(-effectiveDeceleration * dt * 1000);
    
    // Prevent tiny movements
    if (Math.abs(velocity) < velocityStopThreshold) {
      velocity = 0;
      targetVelocity = 0;
    }
  
    updateOffset(offset);
    
    // Enhanced snapping logic
    if (
      (Math.abs(velocity) < velocitySnapThreshold && 
       alignmentInfo.distanceToAligned < alignmentInfo.alignmentThreshold) || 
      now - momentumStartTime >= maxMomentumDuration
    ) {
      // Smooth snap animation
      const snapStartTime = now;
      const snapStartOffset = offset;
      const snapDuration = 150; // ms
      
      const snapAnimation = (snapNow) => {
        const progress = Math.min(1, (snapNow - snapStartTime) / snapDuration);
        const easedProgress = 1 - Math.pow(1 - progress, 3); // Cubic ease-out
        
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
    
    // Set target velocity based on movement, but with a gentler approach
    targetVelocity = delta * 0.05;
    
    updateOffset(offset);
  }

  function end() {
    // Get alignment information from the consumer
    const alignmentInfo = alignmentCalculator ? alignmentCalculator(offset) : {
      alignedOffset: offset,
      distanceToAligned: 0,
      alignmentThreshold: 10,
      nextAlignedOffset: offset,
      prevAlignedOffset: offset
    };
    
    // If barely moved, just snap to position
    if (Math.abs(targetVelocity) < velocitySnapThreshold * 0.5 && 
        alignmentInfo.distanceToAligned < alignmentInfo.alignmentThreshold * 0.8) {
      offset = alignmentInfo.alignedOffset;
      updateOffset(offset);
      velocity = 0;
      targetVelocity = 0;
      return;
    }
    
    // Determine directional intent for meaningful movements
    const directionalIntent = Math.sign(targetVelocity);
    
    // Select target based on intent and velocity
    let targetOffset;
    if (Math.abs(targetVelocity) > velocitySnapThreshold && 
        alignmentInfo.distanceToAligned > alignmentInfo.alignmentThreshold * 1.5) {
      // Clear directional intent detected
      targetOffset = directionalIntent > 0 ? 
                     alignmentInfo.nextAlignedOffset : 
                     alignmentInfo.prevAlignedOffset;
    } else {
      // For small movements, use predicted position
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
    
    // Set a reduced velocity to smoothly move to target
    const distance = targetOffset - offset;
    velocity = distance * deceleration * 0.3;
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