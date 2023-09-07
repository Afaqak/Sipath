export const TextareaField = ({
  label,
  name,
  value,
  register,
  onChange,
  placeholder,
  rows,
  cols,
}) => {
  return (
    <div className="flex flex-col gap-1 ">
      <label className="text-sm text-[#616161] font-thin">{label}</label>
      <textarea
        {...register}
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        cols={cols}
        className="placeholder:text-sm py-2 resize-none focus:outline-none shadow-[inset_2px_1px_6px_rgba(0,0,0,0.2)] px-4 rounded"
        placeholder={placeholder}
      />
    </div>
  );
};
