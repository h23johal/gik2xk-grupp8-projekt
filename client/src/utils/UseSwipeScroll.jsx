// En hook för att hantera svep-scroll med mus- och touch-händelser
import { useState, useRef } from "react";

export function useSwipeScroll({ flowScroll, onMove, direction = "x" } = {}) {
  const [isDragging, setIsDragging] = useState(false);
  const startRef = useRef(0);

  const getPosition = (e) => (direction === "x" ? e.pageX : e.pageY);
  const getTouchPosition = (e) =>
    direction === "x" ? e.touches[0].pageX : e.touches[0].pageY;

  const handleMouseDown = (e) => {
    if (flowScroll && typeof flowScroll.start === "function") {
      flowScroll.start();
    }
    setIsDragging(true);
    startRef.current = getPosition(e);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const pos = getPosition(e);
    const delta = pos - startRef.current;
    startRef.current = pos;
    if (flowScroll && typeof flowScroll.move === "function") {
      flowScroll.move(delta);
    } else if (onMove && typeof onMove === "function") {
      onMove(delta);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (flowScroll && typeof flowScroll.end === "function") {
      flowScroll.end();
    }
  };

  const handleMouseLeave = () => {
    if (isDragging) handleMouseUp();
  };

  const handleTouchStart = (e) => {
    if (flowScroll && typeof flowScroll.start === "function") {
      flowScroll.start();
    }
    setIsDragging(true);
    startRef.current = getTouchPosition(e);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const pos = getTouchPosition(e);
    const delta = pos - startRef.current;
    startRef.current = pos;
    if (flowScroll && typeof flowScroll.move === "function") {
      flowScroll.move(delta);
    } else if (onMove && typeof onMove === "function") {
      onMove(delta);
    }
    e.preventDefault();
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (flowScroll && typeof flowScroll.end === "function") {
      flowScroll.end();
    }
  };

  return {
    isDragging,
    swipeProps: {
      onMouseDown: handleMouseDown,
      onMouseMove: handleMouseMove,
      onMouseUp: handleMouseUp,
      onMouseLeave: handleMouseLeave,
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    },
  };
}
