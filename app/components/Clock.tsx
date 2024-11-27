'use client';

import { useState, useEffect } from 'react';

export default function Clock() {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    // Set initial time
    setTime(new Date().toLocaleTimeString());

    // Update time every second
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
      
      // Check for hour change
      const now = new Date();
      if (now.getMinutes() === 0 && now.getSeconds() === 0) {
        console.log("Hour changed!");
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Don't render anything until we're on the client
  if (!time) return null;

  return (
    <div className="text-center">
      <div className="text-4xl font-bold">
        {time}
      </div>
    </div>
  );
}
