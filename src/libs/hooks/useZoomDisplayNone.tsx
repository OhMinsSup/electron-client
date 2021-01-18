import React from 'react';
import { useLocation } from 'react-router-dom';

export default function useZoomDisplayNone() {
  const location = useLocation();

  React.useLayoutEffect(() => {
    const zoomEl = document.getElementById('zmmtg-root');

    if (zoomEl) {
      console.log(location.pathname);
      if (!['/meeting-connect'].includes(location.pathname)) {
        zoomEl.classList.add('hidden');
      } else {
        zoomEl.classList.remove('hidden');
      }
    }
  }, [location.pathname]);
}
