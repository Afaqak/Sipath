import React from 'react';
import { PodcastFeed } from '@/components';

export const UpcomingPodcast = () => {
  return (
    <div className="mt-4">
      <PodcastFeed
        title={'test1'}
        sender={'tester-1'}
        btnTxt={'Clain free ticket'}
        desc={
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua.dfg swd fghjkl'
        }
        avatar={'/new videos/demo-5.png'}
      />
      <PodcastFeed
        title={'test2'}
        price={'19.99'}
        sender={'tester-2'}
        btnTxt={'Buy ticket'}
        desc={
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua.dfg swd fghjkl'
        }
        avatar={'/new videos/demo-3.jpg'}
      />
      <PodcastFeed
        title={'test3'}
        sender={'tester-3'}
        btnTxt={'Clain free ticket'}
        desc={
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua.dfg swd fghjkl'
        }
        avatar={'/new videos/demo-8.png'}
      />
    </div>
  );
};
