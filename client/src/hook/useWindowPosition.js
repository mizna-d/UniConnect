import { useLayoutEffect, useState } from 'react';

export default function useWindowPosition(id) {
  const [animation, setAnimation] = useState(false);

  useLayoutEffect(() => {

    window.addEventListener('scroll', updatePosition);
    updatePosition();
    return () => window.removeEventListener('scroll', updatePosition);
  }, [id]);
  function updatePosition() {
    const offetSetHeight = window.document.getElementById(id).offsetHeight;
    if (window.pageYOffset > offetSetHeight * 0.6) {
      setAnimation(true);
    }
  }
  return animation;
}