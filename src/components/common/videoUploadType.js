import { TranslationToggleButton } from '@/components';

export const VideoUploadType = ({ type, setType }) => {
  const setUpload = (isTranslated) => {
    if (isTranslated) {
      setType('premium');
    } else {
      setType('free');
    }
  };

  return (
    <div className="flex items-center gap-4 mb-4">
      <p>Free</p>
      <div className="flex gap-2 items-center">
        <TranslationToggleButton onClick={setUpload} color={'#371FCA'} />
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
