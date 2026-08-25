export const isWritingGesture = (landmarks) => {
  if (!landmarks || landmarks.length < 21) return false;
  
  // For now, just return true if hand is detected
  // This makes it much easier to test
  console.log('Hand detected, returning true for writing gesture');
  return true;
};

export const isPointingGesture = (landmarks) => {
  if (!landmarks || landmarks.length < 21) return false;
  
  const indexTip = landmarks[8];
  const indexPip = landmarks[6];
  const middleTip = landmarks[12];
  const middlePip = landmarks[10];
  const ringTip = landmarks[16];
  const ringPip = landmarks[14];
  const pinkyTip = landmarks[20];
  const pinkyPip = landmarks[18];
  
  // Index extended
  const indexExtended = indexTip.y < indexPip.y;
  
  // Others can be slightly extended but not as much as index
  const middleLessExtended = middleTip.y > middlePip.y || 
    (middleTip.y - middlePip.y) > (indexTip.y - indexPip.y) * 2;
  
  const ringLessExtended = ringTip.y > ringPip.y || 
    (ringTip.y - ringPip.y) > (indexTip.y - indexPip.y) * 2;
  
  const pinkyLessExtended = pinkyTip.y > pinkyPip.y || 
    (pinkyTip.y - pinkyPip.y) > (indexTip.y - indexPip.y) * 2;
  
  return indexExtended && middleLessExtended && ringLessExtended && pinkyLessExtended;
};

export const isFistGesture = (landmarks) => {
  if (!landmarks || landmarks.length < 21) return false;
  
  const indexTip = landmarks[8];
  const indexPip = landmarks[6];
  const middleTip = landmarks[12];
  const middlePip = landmarks[10];
  const ringTip = landmarks[16];
  const ringPip = landmarks[14];
  const pinkyTip = landmarks[20];
  const pinkyPip = landmarks[18];
  
  // All fingers curled
  const indexCurled = indexTip.y > indexPip.y;
  const middleCurled = middleTip.y > middlePip.y;
  const ringCurled = ringTip.y > ringPip.y;
  const pinkyCurled = pinkyTip.y > pinkyPip.y;
  
  return indexCurled && middleCurled && ringCurled && pinkyCurled;
};

export const getGestureType = (landmarks) => {
  if (isWritingGesture(landmarks)) return 'writing';
  if (isPointingGesture(landmarks)) return 'pointing';
  if (isFistGesture(landmarks)) return 'fist';
  return 'unknown';
};
