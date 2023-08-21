import React from 'react';

const ResetPassword = () => {
  return (
    <div className="h-[80vh] items-center justify-center flex">
      <div className="p-7 rounded-lg shadow-lg bg-white w-[80%] md:w-[40%] lg:w-[28%] flex flex-col gap-2 h-fit">
        <h1 className="font-semibold mb-2 text-lg">Forgot Password</h1>

        <input
          placeholder="Password"
          className="shadow-[inset_1px_3px_7px_rgba(0,0,0,0.2)] placeholder:opacity-50 rounded-md px-4 py-1 placeholder:text-sm w-full border-none focus:outline-none"
          type="password"
          name="password"
        />
        <input
          placeholder="Reset Password"
          className="shadow-[inset_1px_3px_7px_rgba(0,0,0,0.2)] placeholder:opacity-50 rounded-md px-4 py-1 placeholder:text-sm w-full border-none focus:outline-none"
          type="password"
          name="reset password"
        />
        <button className="w-full mt-2 py-2 bg-black text-sm text-white rounded-md font-medium">
          Confirm
        </button>
      </div>
    </div>
  );
};
export default ResetPassword;
