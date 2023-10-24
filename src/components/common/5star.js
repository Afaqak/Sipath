import React, { useState } from 'react';
import { Icons } from '../icons';

export const Stars = ({ rating, setRating, initialRating }) => {
  const [hover, setHover] = useState(null);
  console.log(rating, '{from star}');

  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, indx) => {
        const currentRating = indx + 1;

        return (
          <div
            key={indx}
            style={{ cursor: 'pointer' }}
            onClick={() => setRating(currentRating)}
            onMouseEnter={() => setHover(currentRating)}
            onMouseLeave={() => setHover(null)}
          >
            <Icons.stars
              fill={currentRating <= (hover || rating || initialRating) ? '#f6ab0e' : null}
            />
          </div>
        );
      })}
    </div>
  );
};
