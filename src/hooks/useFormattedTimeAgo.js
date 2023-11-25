import moment from 'moment-timezone';
import { useMemo } from 'react';

export const useFormattedTimeAgo = (timestamp, userTimeZone = 'GMT') => {
  const formattedTimeAgo = useMemo(() => {
    const now = moment();
    const createdAt = moment(timestamp).tz(userTimeZone);

    const seconds = now.diff(createdAt, 'seconds');
    const minutes = now.diff(createdAt, 'minutes');
    const hours = now.diff(createdAt, 'hours');
    const days = now.diff(createdAt, 'days');
    const weeks = now.diff(createdAt, 'weeks');
    const months = now.diff(createdAt, 'months');

    if (months > 0) {
      return `${months} month${months > 1 ? 's' : ''} ago`;
    } else if (weeks > 0) {
      return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    } else if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      return createdAt.fromNow();
    }
  }, [timestamp, userTimeZone]);

  return formattedTimeAgo;
};
