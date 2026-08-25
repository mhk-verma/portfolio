export const mapCameraToCanvas = (
  normalizedX,
  normalizedY,
  videoWidth,
  videoHeight,
  canvasWidth,
  canvasHeight,
  mirrored = true
) => {
  // MediaPipe returns normalized coordinates (0-1)
  // We need to map these to canvas coordinates
  
  let x = normalizedX * canvasWidth;
  let y = normalizedY * canvasHeight;
  
  // Account for mirroring
  if (mirrored) {
    x = canvasWidth - x;
  }
  
  // Account for aspect ratio differences
  const videoAspect = videoWidth / videoHeight;
  const canvasAspect = canvasWidth / canvasHeight;
  
  if (videoAspect > canvasAspect) {
    // Video is wider than canvas - crop sides
    const scale = canvasHeight / videoHeight;
    const scaledWidth = videoWidth * scale;
    const xOffset = (scaledWidth - canvasWidth) / 2;
    x = (x * scale) - xOffset;
    y = y * scale;
  } else {
    // Video is taller than canvas - crop top/bottom
    const scale = canvasWidth / videoWidth;
    const scaledHeight = videoHeight * scale;
    const yOffset = (scaledHeight - canvasHeight) / 2;
    x = x * scale;
    y = (y * scale) - yOffset;
  }
  
  return { x, y };
};

export const getCanvasCoordinates = (
  landmarks,
  videoElement,
  canvasElement,
  mirrored = true
) => {
  if (!landmarks || !videoElement || !canvasElement) return null;
  
  const indexFingerTip = landmarks[8]; // Index finger tip landmark
  const canvas = canvasElement;
  
  return mapCameraToCanvas(
    indexFingerTip.x,
    indexFingerTip.y,
    videoElement.videoWidth,
    videoElement.videoHeight,
    canvas.width,
    canvas.height,
    mirrored
  );
};
