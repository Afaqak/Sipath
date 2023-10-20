import Image from 'next/image';

export const PlaylistItem = ({ title, duration, isChecked, setVideoId, id }) => {
  console.log('click');
  return (
    <li
      onClick={() => {
        setVideoId(id);
        console.log('cl', id);
      }}
      className="flex gap-4 cursor-pointer"
    >
      <div className="flex items-center mb-4">
        <input
          id="default-checkbox"
          type="checkbox"
          checked={isChecked}
          className="w-4 h-4 text-blue-600 accent-blue-700"
        />
      </div>
      <div>
        <p className="border-b py-1">{title}</p>
        <div className="flex gap-2">
          <Image src={'/svgs/smartdisplay.svg'} width={15} height={15} alt="smart display" />
          <span className="text-[0.75rem] font-semibold">{duration}</span>
        </div>
      </div>
    </li>
  );
};
