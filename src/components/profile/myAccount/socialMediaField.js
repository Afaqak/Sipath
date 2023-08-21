import React from 'react';

export const SocialMediaField = ({ label, name, value, onChange, placeholder, color }) => {
  return (
    <div className="flex items-center justify-between w-full ">
      <label className={`text-sm font-thin text-${color}`}>{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        type="text"
        className={`placeholder:text-sm py-1 w-4/5 focus:outline-none shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1)] px-2 rounded`}
        placeholder={placeholder}
      />
    </div>
  );
};
