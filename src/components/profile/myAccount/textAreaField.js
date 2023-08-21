export const TextareaField = ({ label, name, value, onChange, placeholder, rows, cols }) => {
  return (
    <div className="flex flex-col gap-1 ">
      <label className="text-sm text-[#616161] font-thin">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        cols={cols}
        className="placeholder:text-sm py-1 resize-none focus:outline-none shadow-[inset_2px_2px_8px_rgba(0,0,0,0.1)] px-2 rounded"
        placeholder={placeholder}
      />
    </div>
  );
};
