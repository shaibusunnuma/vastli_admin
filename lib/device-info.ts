import { DeviceInfo } from "@/types/auth.types";

export const getDeviceInfo = (): DeviceInfo => {
  const userAgent = typeof window !== 'undefined' ? window.navigator.userAgent : 'Unknown';
  let deviceType = 'Desktop';
  if (/Mobi|Android/i.test(userAgent)) {
    deviceType = 'Mobile';
  } else if (/Tablet|iPad/i.test(userAgent)) {
    deviceType = 'Tablet';
  }

  let deviceId = typeof window !== 'undefined' ? localStorage.getItem('deviceId') : null;

  if (!deviceId && typeof window !== 'undefined' && window.crypto && window.crypto.randomUUID) {
    deviceId = `web-${window.crypto.randomUUID()}`
    localStorage.setItem('deviceId', deviceId);
  } else if (!deviceId) {
    console.warn('crypto.randomUUID not available or localStorage inaccessible. Using fallback ID generation.');
    deviceId = `web-fallback-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
    if (typeof window !== 'undefined') {
       localStorage.setItem('deviceId', deviceId);
    }
  }


  const platform = typeof window !== 'undefined' ? (window.navigator.platform || 'Unknown Platform') : 'Unknown Platform';
  const deviceName = `${deviceType} Browser (${platform})`;
  // --- End Simulation ---

  return {
    deviceId: deviceId,
    deviceName: deviceName,
    deviceType: deviceType,
  };
};