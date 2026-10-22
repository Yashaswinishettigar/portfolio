import { useEffect, useState } from 'react';
import { useMediaQuery } from '@mui/material';

function hasWebGL() {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) return false;
    // Release the probe context immediately so it doesn't count against the browser limit.
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return true;
  } catch {
    return false;
  }
}

/**
 * Decides how much 3D to render:
 *  - 'full'   desktop / tablet with WebGL
 *  - 'simple' small screens: lower geometry detail, lower DPR, no pointer tracking
 *  - 'static' no WebGL or a low-power device: a pure CSS orb is shown instead
 */
export default function use3DMode() {
  const small = useMediaQuery('(max-width:599.95px)');
  const [capable, setCapable] = useState(false);

  useEffect(() => {
    const lowPower =
      (navigator.deviceMemory && navigator.deviceMemory <= 2) ||
      (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2);
    setCapable(!lowPower && hasWebGL());
  }, []);

  if (!capable) return 'static';
  return small ? 'simple' : 'full';
}
