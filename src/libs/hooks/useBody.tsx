import React from 'react';

export default function useBody() {
  React.useEffect(() => {
    document.body.classList.add('text-gray-800', 'mt-24', 'font-light');
  }, []);
}
