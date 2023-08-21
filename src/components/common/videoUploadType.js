export const VideoUploadType = ({ type, setType }) => {
  const setUpload = (e) => {
    if (e.target.checked) {
      setType('premium');
    } else {
      setType('free');
    }
  };

  return (
    <div className="flex items-center gap-4 mb-4">
      <p>Free</p>
      <div className="flex gap-2 items-center">
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" onChange={setUpload} value="" class="sr-only peer" />
          <div class="w-11 h-5 bg-white rounded-full peer dark:bg-gray-700 peer-focus:ring-4 shadow-[inset_1px_3px_7px_rgba(0,0,0,0.2)] peer-focus:ring-[#371FCA] peer-checked:after:translate-x-full  after:content-[''] after:absolute after:top-0.8 after:left-[2px] after:bg-[#371FCA] after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600"></div>
          <span className="text-[#371FCA] ml-2 font-semibold">Premium</span>
        </label>
        <input
          type="number"
          disabled={type === 'free'}
          placeholder="00.00"
          className={`shadow-[inset_1px_3px_7px_rgba(0,0,0,0.2)] ${
            type === 'free' ? 'bg-[#D9D9D9]' : 'bg-white'
          } rounded-md px-3 placeholder:text-sm placeholder:text-center border-none w-[20%] focus:outline-none resize-none `}
        />
        $
      </div>
    </div>
  );
};
