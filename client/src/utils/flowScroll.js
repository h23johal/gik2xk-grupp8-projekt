// // export function createFlowScroll({
// //   initialOffset = 0,
// //   updateOffset,
// //   cardWidth = 280,
// //   deceleration = 0.1,
// //   snapThreshold = 0.5,
// //   onSnap = () => {}
// // }) {
// //   let offset = initialOffset;
// //   let velocity = 0;
// //   let lastTime = performance.now();
// //   let animFrame = null;
  
// //   function momentum() {
// //     const now = performance.now();
// //     const dt = now - lastTime;
// //     lastTime = now;
    
// //     if (velocity > 0) {
// //       velocity = Math.max(velocity - deceleration * dt, 0);
// //     } else if (velocity < 0) {
// //       velocity = Math.min(velocity + deceleration * dt, 0);
// //     }
    
// //     const delta = velocity * dt;
// //     if (Math.abs(delta) < 0.5) {
// //       velocity = 0;
// //       snapToCard();
// //       return;
// //     }
    
// //     offset += delta;
// //     updateOffset(offset);
// //     animFrame = requestAnimationFrame(momentum);
// //   }
  
// //   function snapToCard() {
// //     if (Math.abs(offset) < cardWidth * snapThreshold) {
// //       offset = 0;
// //     } else {
// //       offset = offset > 0 ? cardWidth : -cardWidth;
// //     }
// //     updateOffset(offset);
// //     onSnap(offset);
// //   }
  
// //   function start() {
// //     lastTime = performance.now();
// //     if (animFrame) {
// //       cancelAnimationFrame(animFrame);
// //       animFrame = null;
// //     }
// //   }
  
// //   function move(delta) {
// //     offset += delta;
// //     updateOffset(offset);
// //   }
  
// //   function end() {
// //     lastTime = performance.now();
// //     animFrame = requestAnimationFrame(momentum);
// //   }
  
// //   function cancel() {
// //     if (animFrame) {
// //       cancelAnimationFrame(animFrame);
// //       animFrame = null;
// //     }
// //   }
  
// //   function setVelocity(newVelocity) {
// //     velocity = newVelocity;
// //   }
  
// //   function getOffset() {
// //     return offset;
// //   }
  
// //   return {
// //     start,
// //     move,
// //     end,
// //     cancel,
// //     setVelocity,
// //     getOffset,
// //   };
// // }

// export function createFlowScroll({
//   initialOffset = 0,
//   updateOffset,
//   cardWidth = 280,
//   // deceleration = 0.015,
//   snapThreshold = 0.2,
//   maxVelocity = 1.2,
//   maxMomentumDuration = 1000, // milliseconds

//   onSnap = () => {},
// }) {
//   let offset = initialOffset;
//   let velocity = 0;
//   let animFrame = null;
//   let lastTime = null;

//   const clamp = (num, min, max) => Math.max(min, Math.min(max, num));

//   function easeOutCubic(t) {
//     return (--t) * t * t + 1;
//   }
  
//   let momentumStartTime = null;
//   let initialVelocity = 0;
  
//   function momentum(now) {
//     if (!momentumStartTime) {
//       momentumStartTime = now;
//       initialVelocity = velocity;
//     }
  
//     const elapsed = now - momentumStartTime;
//     const progress = elapsed / maxMomentumDuration;
//     const easedProgress = easeOutCubic(Math.min(progress, 1));
  
//     velocity = initialVelocity * (1 - easedProgress);
//     offset += velocity * (now - lastTime);
//     lastTime = now;
  
//     updateOffset(offset);
  
//     if (progress >= 1 || Math.abs(velocity) < 0.02) {
//       snapToNearestCard();
//       animFrame = null;
//       momentumStartTime = null;
//       velocity = 0;
//       return;
//     }
  
//     animFrame = requestAnimationFrame(momentum);
//   }
  
//   function start() {
//     if (animFrame) {
//       cancelAnimationFrame(animFrame);
//       animFrame = null;
//     }
//     velocity = 0;
//     lastTime = null;
//     momentumStartTime = null;
//   }

//   function snapToNearestCard() {
//     const cardIndex = Math.round(offset / cardWidth);
//     const targetOffset = cardIndex * cardWidth;
//     const distanceToSnap = targetOffset - offset;
  
//     if (Math.abs(distanceToSnap) < cardWidth * snapThreshold) {
//       offset = targetOffset;
//     } else {
//       offset += distanceToSnap > 0 ? cardWidth : -cardWidth;
//     }
  
//     updateOffset(offset);
//     onSnap(offset);
//   }
  

//   function start() {
//     if (animFrame) {
//       cancelAnimationFrame(animFrame);
//       animFrame = null;
//     }
//     velocity = 0;
//     lastTime = null;
//   }

//   function move(delta) {
//     offset += delta;
//     updateOffset(offset);
//   }

//   function end() {
//     velocity = clamp(velocity, -maxVelocity, maxVelocity);
//     lastTime = null;
//     animFrame = requestAnimationFrame(momentum);
//   }

//   function cancel() {
//     if (animFrame) {
//       cancelAnimationFrame(animFrame);
//       animFrame = null;
//     }
//     velocity = 0;
//   }

//   function setVelocity(newVelocity) {
//     velocity = clamp(newVelocity, -maxVelocity, maxVelocity);
//   }

//   function getOffset() {
//     return offset;
//   }

//   return {
//     start,
//     move,
//     end,
//     cancel,
//     setVelocity,
//     getOffset,
//   };
// }
// export function createFlowScroll({
//   initialOffset = 0,
//   updateOffset,
//   cardWidth = 280,
//   deceleration = 0.004,
//   maxMomentumDuration = 800,
//   onSnap = () => {},
// }) {
//   let offset = initialOffset;
//   let velocity = 0;
//   let animFrame = null;
//   let lastTime = null;
//   let momentumStartTime = null;

//   function momentum(now) {
//     if (!momentumStartTime) momentumStartTime = now;
//     const dt = (now - lastTime) / 1000;
//     lastTime = now;

//     offset += velocity * dt * 1000;
//     velocity *= Math.exp(-deceleration * dt * 1000);

//     updateOffset(offset);

//     if (
//       Math.abs(velocity) < 0.01 &&
//       Math.abs(offset % cardWidth) < 1 ||
//       now - momentumStartTime >= maxMomentumDuration
//     ) {
//       snapToNearestCard();
//       velocity = 0;
//       animFrame = null;
//       momentumStartTime = null;
//       return;
//     }

//     animFrame = requestAnimationFrame(momentum);
//   }

//   function snapToNearestCard() {
//     offset = Math.round(offset / cardWidth) * cardWidth;
//     updateOffset(offset);
//     onSnap(offset);
//   }

//   function start() {
//     if (animFrame) {
//       cancelAnimationFrame(animFrame);
//       animFrame = null;
//     }
//     velocity = 0;
//     momentumStartTime = null;
//     lastTime = performance.now();
//   }

//   function move(delta) {
//     offset += delta;
//     updateOffset(offset);
//   }

//   function end() {
//     const predictedStopOffset = offset + velocity / deceleration;
//     const alignedOffset = Math.round(predictedStopOffset / cardWidth) * cardWidth;
//     velocity = (alignedOffset - offset) * deceleration;
  
//     lastTime = performance.now();
//     momentumStartTime = null;
//     animFrame = requestAnimationFrame(momentum);
//   }
  

//   function cancel() {
//     if (animFrame) {
//       cancelAnimationFrame(animFrame);
//       animFrame = null;
//     }
//     velocity = 0;
//   }

//   function setVelocity(newVelocity) {
//     velocity = newVelocity;
//   }

//   function getOffset() {
//     return offset;
//   }

//   return {
//     start,
//     move,
//     end,
//     cancel,
//     setVelocity,
//     getOffset,
//   };
// }
export function createFlowScroll({
  initialOffset = 0,
  updateOffset,
  cardWidth = 280,
  deceleration = 0.004,
  maxMomentumDuration = 100,
  maxVelocity = 2.5,
}) {
  let offset = initialOffset;
  let velocity = 0;
  let animFrame = null;
  let lastTime = null;
  let momentumStartTime = null;

  function setVelocity(newVelocity) {
    velocity = Math.max(-maxVelocity, Math.min(maxVelocity, newVelocity));
  }

  function momentum(now) {
    if (!momentumStartTime) momentumStartTime = now;
    const dt = (now - lastTime) / 1000;
    lastTime = now;
  
    offset += velocity * dt * 1000;
    velocity *= Math.exp(-deceleration * dt * 1000);
  
    updateOffset(offset);
  
    if (
      Math.abs(velocity) < 0.01 ||
      now - momentumStartTime >= maxMomentumDuration
    ) {
      velocity = 0;
      animFrame = null;
      momentumStartTime = null;
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
    momentumStartTime = null;
    lastTime = performance.now();
  }

  function move(delta) {
    offset += delta;
    updateOffset(offset);
  }

  function end() {
    const predictedStopOffset = offset + velocity / deceleration;
    const alignedOffset = Math.round(predictedStopOffset / cardWidth) * cardWidth;
    
    // velocity needed to reach alignedOffset smoothly
    velocity = (alignedOffset - offset) * deceleration;
  
    // Correct direction explicitly
    velocity = Math.sign(alignedOffset - offset) * Math.abs(velocity);
  
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
