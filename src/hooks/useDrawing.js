import { useState, useRef, useCallback } from 'react';

export const useDrawing = () => {
  const [strokes, setStrokes] = useState([]);
  const [currentStroke, setCurrentStroke] = useState(null);
  const [brushSize, setBrushSize] = useState(4);
  const [brushColor, setBrushColor] = useState('#00ffff');
  const historyRef = useRef([]);
  const historyIndexRef = useRef(-1);

  const startStroke = useCallback((point) => {
    const newStroke = {
      points: [point],
      color: brushColor,
      size: brushSize
    };
    setCurrentStroke(newStroke);
  }, [brushColor, brushSize]);

  const continueStroke = useCallback((point) => {
    if (currentStroke) {
      setCurrentStroke(prev => ({
        ...prev,
        points: [...prev.points, point]
      }));
    }
  }, [currentStroke]);

  const endStroke = useCallback(() => {
    if (currentStroke && currentStroke.points.length > 1) {
      setStrokes(prev => [...prev, currentStroke]);
      
      // Update history
      historyIndexRef.current++;
      historyRef.current = historyRef.current.slice(0, historyIndexRef.current);
      historyRef.current.push([...strokes, currentStroke]);
    }
    setCurrentStroke(null);
  }, [currentStroke, strokes]);

  const clearCanvas = useCallback(() => {
    setStrokes([]);
    setCurrentStroke(null);
    historyRef.current = [];
    historyIndexRef.current = -1;
  }, []);

  const undo = useCallback(() => {
    if (historyIndexRef.current > 0) {
      historyIndexRef.current--;
      setStrokes(historyRef.current[historyIndexRef.current]);
    } else if (historyIndexRef.current === 0) {
      historyIndexRef.current = -1;
      setStrokes([]);
    }
  }, []);

  const redo = useCallback(() => {
    if (historyIndexRef.current < historyRef.current.length - 1) {
      historyIndexRef.current++;
      setStrokes(historyRef.current[historyIndexRef.current]);
    }
  }, []);

  return {
    strokes,
    currentStroke,
    brushSize,
    brushColor,
    startStroke,
    continueStroke,
    endStroke,
    clearCanvas,
    undo,
    redo,
    setBrushSize,
    setBrushColor
  };
};
