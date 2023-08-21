'use client'
import { ContentPlayer, VideoInfo ,CommentInput} from '@/components';
import Image from 'next/image';

const videoArray=['/new videos/demo-1.jpg','/new videos/demo-2.jpg','/new videos/demo-3.jpg','/new videos/demo-4.jpg','/new videos/demo-5.png']

const WatchVideo = () => {
    return (
        <div className=''>
            <div className='grid grid-cols-1 lg:grid-cols-8'>
                <div className='live-message col-span-5 relative lg:my-8 px-4 lg:px-0 lg:pl-8'>
                    <ContentPlayer noPremium={true}/>
                    <VideoInfo />
                    {/* Render the Comments component for large screens */}
                    <div className='hidden lg:block'>
                        <Comments />
                    </div>
                </div>
                {/* Render the video list for all screens */}
                <div className='mt-8 relative lg:px-8 px-4 overflow-y-scroll col-span-3 overflow-hidden live-message'>
                    {videoArray.map((img) => {
                        return <NextVideo img={img} key={img} />;
                    })}
                {/* Render the Comments component for small screens */}
                <div className='lg:hidden my-8'>
                    <Comments />
                </div>
                </div>
            </div>
        </div>
    );
};

export default WatchVideo;

let NextVideo=({img})=>{
    return(
        <div>
            <div className='p-3 flex gap-4 bg-white rounded-md shadow-md mb-4'>
                <div>
                <Image src={img} width={200} height={200} className='object-cover h-32 rounded-md' alt='demo-3'/>
                    </div>
                <div className='flex flex-col justify-evenly text-sm'>
                    <h1 className='font-semibold'>Video title goes here</h1>
                    <div>owner name </div>
                    <h2 className="font-extrabold gap-1 flex items-center">
                        4.7{" "}
                        <Image
                            src="/svgs/star.png"
                            className=""
                            width={24}
                            height={24}
                        />
                    </h2>
                    <div className='font-semibold text-[#616161] text-[0.70rem] whitespace-nowrap'>
                        <span>24K Views</span> . <span>2 months</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Comments = () => {
    return (<div className=' mt-8'>
      <div className='justify-between font-bold text-lg mb-2 flex'>
        <h2>132 comments</h2>
        <h2>Sort by</h2>
      </div>
      <div className='bg-white p-4 rounded-md shadow-md'>
        <CommentInput />

      </div>
    </div>)
  }