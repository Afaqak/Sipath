import { TranslationToggleButton } from '@/components';

export const VideoUploadType = ({ type, setType, setPrice }) => {
  const setUpload = (isTranslated) => {
    console.log(isTranslated, 'from videouptype');
    if (isTranslated) {
      setType('premium');
    } else {
      setType('free');
    }
  };

  return (
    <div className="flex items-center gap-4 ">
      <p className="text-[#1850BC] font-bold">Free</p>
      <div className="flex gap-4 items-center">
        <TranslationToggleButton onClick={setUpload} color={'#371FCA'} />
        <input
          onChange={type === 'premium' ? (e) => setPrice(e.target.value) : null}
          type="number"
          disabled={type === 'free'}
          placeholder="00.00"
          className={`shadow-[inset_1px_3px_7px_rgba(0,0,0,0.2)] ${
            type === 'free' ? 'bg-[#D9D9D9]' : 'bg-white'
          } rounded-md px-3 placeholder:text-sm placeholder:text-center border-none w-[30%] text-center focus:outline-none resize-none `}
        />
        $
      </div>
    </div>
  );
};
