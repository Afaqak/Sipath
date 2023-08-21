import Image from 'next/image';
export const IncomePerMedia = () => {
  return (
    <div className="mt-10">
      <div className=" ">
        <h1 className="text-xl mb-2 font-bold">Income Per Media</h1>
        <Media />
        <Media />
      </div>
    </div>
  );
};

const Media = () => {
  return (
    <div className="flex md:flex-row flex-col md:justify-between md:items-center p-3 mb-2 bg-white rounded-md shadow-md">
      <div className="flex gap-4 md:flex-row flex-col md:items-center">
        <Image
          src={'/new videos/demo-3.jpg'}
          className="rounded-md w-full md:w-32"
          width={130}
          height={130}
          alt="demo"
        />
        <div>
          <h1 className="font-bold text-lg">Video title goes here</h1>
          <div className="text-sm">
            <span className="text-[#616161] font-bold">24k Views</span> -{' '}
            <span className="text-[#1850BC] font-bold">Single Video</span>
          </div>
        </div>
      </div>
      <div className="mr-8 flex flex-col mt-2 md:justify-end md:items-end">
        <p className="text-[0.7rem]">Generated Profit from Views</p>
        <p className="md:text-2xl text-xl font-bold">$124,89</p>
      </div>
    </div>
  );
};
