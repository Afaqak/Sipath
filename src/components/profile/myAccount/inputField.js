export const InputField = ({ label, name, value, onChange, placeholder }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-[#616161] font-thin">{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        className="placeholder:text-sm py-1 focus:outline-none shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1)] px-2 rounded"
        type="text"
        placeholder={placeholder}
      />
    </div>
  );
};
