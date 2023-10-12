import axios from 'axios';
import { Skeleton } from '@/components/ui/skeleton';

const instance = axios.create({
  baseURL: 'http://localhost:4000',
  withCredentials: true,
});

export const axiosPrivate = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;

export const formatTimeAgo = (timestamp) => {
  const now = new Date();
  const createdAt = new Date(timestamp);

  const timeDiff = now - createdAt;
  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);

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
    return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
  }
};

export const LoadingSkeletons = ({ times }) => (
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 ">
    {[...Array(times)].map((_, idx) => (
      <div key={idx} className="bg-white rounded-md p-4 shadow-md">
        <Skeleton className="h-48 mb-2 " />
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>
    ))}
  </div>
);
