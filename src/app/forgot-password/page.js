import React from 'react';

const ForgotPassword = () => {
  return (
    <div className="h-[80vh] items-center justify-center flex">
      <div className="p-6 rounded-lg shadow-lg bg-white w-[80%] md:w-[40%] lg:w-[28%] flex flex-col gap-2 h-fit">
        <h1 className="font-semibold text-lg">Forgot Password</h1>
        <p className="text-[0.70rem] text-[#616161]">
          Enter the email address that is linked to your account. An email will be sent to you with
          a password reset link.
        </p>
        <input
          placeholder="Email Address"
          className="shadow-[inset_1px_3px_9px_rgba(0,0,0,0.2)] rounded-md px-4 py-1 placeholder:text-sm w-full border-none focus:outline-none"
          type="text"
          name="email"
        />
        <button className="w-full py-2 bg-black text-sm text-white rounded-md font-medium">
          Confirm
        </button>
        <span className="text-sm text-purple-500 italic text-center">
          Didnt see the Email?{' '}
          <span className="border-b border-purple-500 not-italic">Send Again</span>
        </span>
      </div>
    </div>
  );
};
export default ForgotPassword;
