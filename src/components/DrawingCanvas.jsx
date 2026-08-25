import React, { useRef, useEffect } from 'react';

const DrawingCanvas = ({ 
  strokes, 
  currentStroke, 
  fingertipPosition,
  isDrawing,
  className = '' 
}) => {
  const canvasRef = useRef(null);
  const previousFingertipRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    console.log('DrawingCanvas render - strokes:', strokes.length, 'currentStroke points:', currentStroke?.points?.length, 'fingertipPosition:', fingertipPosition, 'isDrawing:', isDrawing);
    console.log('Canvas dimensions:', canvas.width, 'x', canvas.height);

    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw completed strokes
    strokes.forEach(stroke => {
      if (stroke.points.length < 2) return;
      
      console.log('Drawing stroke with', stroke.points.length, 'points');
      ctx.beginPath();
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = stroke.size;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      // Add glow effect
      ctx.shadowColor = stroke.color;
      ctx.shadowBlur = 15;
      
      ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
      
      for (let i = 1; i < stroke.points.length; i++) {
        ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
      }
      
      ctx.stroke();
      
      // Reset shadow
      ctx.shadowBlur = 0;
    });

    // Draw current stroke
    if (currentStroke && currentStroke.points.length > 1) {
      console.log('Drawing current stroke with', currentStroke.points.length, 'points');
      ctx.beginPath();
      ctx.strokeStyle = currentStroke.color;
      ctx.lineWidth = currentStroke.size;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      ctx.shadowColor = currentStroke.color;
      ctx.shadowBlur = 20;
      
      ctx.moveTo(currentStroke.points[0].x, currentStroke.points[0].y);
      
      for (let i = 1; i < currentStroke.points.length; i++) {
        ctx.lineTo(currentStroke.points[i].x, currentStroke.points[i].y);
      }
      
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    // Draw fingertip indicator
    if (fingertipPosition) {
      console.log('Drawing fingertip at:', fingertipPosition);
      ctx.beginPath();
      ctx.arc(fingertipPosition.x, fingertipPosition.y, isDrawing ? 12 : 8, 0, Math.PI * 2);
      
      if (isDrawing) {
        ctx.fillStyle = '#00ffff';
        ctx.shadowColor = '#00ffff';
        ctx.shadowBlur = 25;
      } else {
        ctx.fillStyle = 'rgba(0, 255, 255, 0.6)';
        ctx.shadowColor = '#00ffff';
        ctx.shadowBlur = 15;
      }
      
      ctx.fill();
      ctx.shadowBlur = 0;
      
      // Inner core
      ctx.beginPath();
      ctx.arc(fingertipPosition.x, fingertipPosition.y, isDrawing ? 6 : 4, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
    }

    previousFingertipRef.current = fingertipPosition;
  }, [strokes, currentStroke, fingertipPosition, isDrawing]);

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.parentElement) return;

    const rect = canvas.parentElement.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    
    console.log('Canvas resized to:', rect.width, 'x', rect.height, 'CSS pixels, actual:', canvas.width, 'x', canvas.height, 'pixels');
  };

  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
    />
  );
};

export default DrawingCanvas;
