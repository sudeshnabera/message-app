import { useEffect, useState } from "react";

export const useTimeAgo = (date) => {
  const calculateTimeAgo = () => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);

    const intervals = {
      year: 31536000,
      month: 2592000,
      day: 86400,
      hour: 3600,
      minute: 60,
    };

    for (let key in intervals) {
      const interval = Math.floor(seconds / intervals[key]);
      if (interval > 1) return `${interval} ${key}s ago`;
      if (interval === 1) return `1 ${key} ago`;
    }

    return "Just now";
  };

  const [timeAgo, setTimeAgo] = useState(calculateTimeAgo());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeAgo(calculateTimeAgo());
    }, 60000); // update every 1 min

    return () => clearInterval(timer);
  }, [date]);

  return timeAgo;
};