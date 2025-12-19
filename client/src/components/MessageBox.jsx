import React, { useEffect, useRef, useState } from 'react';

const MessageBox = ({ message = "✅ Task completed successfully", duration = 4000 }) => {
  const [visible, setVisible] = useState(true);
  const progressRef = useRef(null);

  useEffect(() => {

    if (progressRef.current) {
      progressRef.current.style.transition = `width ${duration}ms linear`;
      progressRef.current.style.width = '0%';
    }
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  return (
    <div className="fixed top-10 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-green-100 text-green-800 border border-green-300 rounded shadow-lg overflow-hidden z-50">
      <div className="px-4 py-3 text-sm">
        {message}
      </div>
      <div ref={progressRef} className="h-1 bg-green-500 w-full" />
    </div>
  );
};

export default MessageBox;
