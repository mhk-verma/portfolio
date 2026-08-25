export const smoothPoint = (currentPoint, previousPoint, smoothingFactor = 0.7) => {
  if (!previousPoint) return currentPoint;
  
  return {
    x: previousPoint.x + (currentPoint.x - previousPoint.x) * smoothingFactor,
    y: previousPoint.y + (currentPoint.y - previousPoint.y) * smoothingFactor
  };
};

export const smoothStroke = (points, windowSize = 3) => {
  if (points.length < windowSize) return points;
  
  const smoothed = [];
  
  for (let i = 0; i < points.length; i++) {
    const start = Math.max(0, i - Math.floor(windowSize / 2));
    const end = Math.min(points.length, i + Math.ceil(windowSize / 2));
    const window = points.slice(start, end);
    
    const avgX = window.reduce((sum, p) => sum + p.x, 0) / window.length;
    const avgY = window.reduce((sum, p) => sum + p.y, 0) / window.length;
    
    smoothed.push({ x: avgX, y: avgY });
  }
  
  return smoothed;
};

export const interpolatePoints = (point1, point2, numPoints = 5) => {
  const points = [];
  
  for (let i = 0; i <= numPoints; i++) {
    const t = i / numPoints;
    points.push({
      x: point1.x + (point2.x - point1.x) * t,
      y: point1.y + (point2.y - point1.y) * t
    });
  }
  
  return points;
};

export const calculateVelocity = (point1, point2, deltaTime) => {
  if (!deltaTime || deltaTime === 0) return 0;
  
  const dx = point2.x - point1.x;
  const dy = point2.y - point1.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  return distance / deltaTime;
};

export const calculatePressure = (velocity, minVelocity = 0, maxVelocity = 50) => {
  // Higher velocity = lower pressure (thinner line)
  const normalized = Math.min(Math.max((velocity - minVelocity) / (maxVelocity - minVelocity), 0), 1);
  return 1 - normalized; // Invert so faster = thinner
};
