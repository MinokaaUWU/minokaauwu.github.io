import { useEffect } from 'react';
import './Notification.css';

export const Notification = ({ active, setActive, children, duration = 3000 }) => {
  useEffect(() => {
    if (!active) return;
    const timer = setTimeout(() => setActive(false), duration);
    return () => clearTimeout(timer);
  }, [active, duration, setActive]);

  return (
    <div className={active ? "notification active" : "notification"} onClick={() => setActive(false)}>
      <div className="notification__content">
        {children}
      </div>
      {active && (
        <div className="notification__progress" style={{ animationDuration: `${duration}ms` }} />
      )}
    </div>
  );
};
