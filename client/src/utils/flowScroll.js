export function createFlowScroll({
  initialOffset = 0,
  updateOffset,
  deceleration = 0.04,
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
  
  // Justerade trösklar för en smidig upplevelse
  const velocityStopThreshold = maxVelocity * 0.08;
  const velocitySnapThreshold = maxVelocity * 0.15;
  const velocityCap = maxVelocity * 1.5;
  
  // Accelerationsfaktor för mjukare starter
  const accelerationFactor = 0.15;

  // Upptäck uppdateringsfrekvens för konsekvent upplevelse på alla enheter
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
    
    // Närma dig gradvis målhastigheten
    if (Math.abs(velocity - targetVelocity) > 0.0001) {
      velocity += (targetVelocity - velocity) * accelerationFactor;
    }
    
    // Skalrörelse baserat på uppdateringsfrekvens
    offset += velocity * dt * refreshRate;
    
    // Få information om anpassning från konsumenten
    const alignmentInfo = alignmentCalculator ? alignmentCalculator(offset) : {
      alignedOffset: offset,
      distanceToAligned: 0,
      alignmentThreshold: 10
    };
    
    // Progressiv retardation baserad på närhet till inriktningspunkten
    const proximityFactor = Math.min(1, alignmentInfo.distanceToAligned / 
                                      (alignmentInfo.alignmentThreshold * 5));
    
    // Tillämpa retardation med närhetsmedvetenhet
    const effectiveDeceleration = deceleration * (0.8 + 0.4 * (1 - proximityFactor));
    velocity *= Math.exp(-effectiveDeceleration * dt * 1000);
    targetVelocity *= Math.exp(-effectiveDeceleration * dt * 1000);
    
    // Förhindra små rörelser
    if (Math.abs(velocity) < velocityStopThreshold) {
      velocity = 0;
      targetVelocity = 0;
    }
  
    updateOffset(offset);
    
    // Förbättrad snapplogik
    if (
      (Math.abs(velocity) < velocitySnapThreshold && 
       alignmentInfo.distanceToAligned < alignmentInfo.alignmentThreshold) || 
      now - momentumStartTime >= maxMomentumDuration
    ) {
      // Smidig snapanimering
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
    
    // Ställ in målhastighet baserat på rörelse, men med ett mjukare tillvägagångssätt
    targetVelocity = delta * 0.05;
    
    updateOffset(offset);
  }

  function end() {
    // Få information om anpassning från konsumenten
    const alignmentInfo = alignmentCalculator ? alignmentCalculator(offset) : {
      alignedOffset: offset,
      distanceToAligned: 0,
      alignmentThreshold: 10,
      nextAlignedOffset: offset,
      prevAlignedOffset: offset
    };
    
    // Om den knappt rör sig, snäpp bara till position
    if (Math.abs(targetVelocity) < velocitySnapThreshold * 0.5 && 
        alignmentInfo.distanceToAligned < alignmentInfo.alignmentThreshold * 0.8) {
      offset = alignmentInfo.alignedOffset;
      updateOffset(offset);
      velocity = 0;
      targetVelocity = 0;
      return;
    }
    
    // Bestäm riktad avsikt för meningsfulla rörelser
    const directionalIntent = Math.sign(targetVelocity);
    
    // Välj mål baserat på avsikt och hastighet
    let targetOffset;
    if (Math.abs(targetVelocity) > velocitySnapThreshold && 
        alignmentInfo.distanceToAligned > alignmentInfo.alignmentThreshold * 1.5) {
      // Tydlig riktningsavsikt upptäckt
      targetOffset = directionalIntent > 0 ? 
                     alignmentInfo.nextAlignedOffset : 
                     alignmentInfo.prevAlignedOffset;
    } else {
      // För små rörelser, använd förutspådd position
      const predictedStopOffset = offset + targetVelocity / deceleration;
      
      // Hitta närmaste inriktningspunkt till förutsagd position
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
    
    // Ställ in en reducerad hastighet för att smidigt flytta till målet
    const distance = targetOffset - offset;
    velocity = distance * deceleration * 0.3;
    targetVelocity = velocity;
    
    // Cap-hastighet för konsistens
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