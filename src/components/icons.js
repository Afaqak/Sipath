'use client';
export const Icons = {
  Loader2: (props) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-loader-2"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  ),
  google: (props) => (
    <svg {...props} viewBox="0 0 24 24">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
      <path d="M1 1h22v22H1z" fill="none" />
    </svg>
  ),
  facebook: (props) => (
    <svg
      {...props}
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="19.5478"
        height="19.5478"
        transform="translate(0.616943 0.726562)"
        fill="#1850BC"
      />
      <path
        d="M19.7577 10.5577C19.7577 5.3846 15.5642 1.191 10.3911 1.191C5.21801 1.191 1.02441 5.3846 1.02441 10.5577C1.02441 15.2328 4.44967 19.1079 8.92754 19.8105V13.2652H6.54928V10.5577H8.92754V8.49408C8.92754 6.14655 10.3259 4.84986 12.4655 4.84986C13.4903 4.84986 14.5622 5.0328 14.5622 5.0328V7.33788H13.3811C12.2175 7.33788 11.8546 8.0599 11.8546 8.80063V10.5577H14.4524L14.0371 13.2652H11.8546V19.8105C16.3325 19.1079 19.7577 15.2328 19.7577 10.5577Z"
        fill="white"
      />
    </svg>
  ),
  message: (props) => (
    <svg
      {...props}
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 2.75C3.82436 2.75 1.25 5.32436 1.25 8.5V21.4194C1.25 22.8868 2.94738 23.7026 4.09322 22.7859L6.92069 20.5239C7.14233 20.3466 7.41772 20.25 7.70156 20.25H17C20.1756 20.25 22.75 17.6756 22.75 14.5V8.5C22.75 5.32436 20.1756 2.75 17 2.75H7ZM7.0498 12.7998C7.74016 12.7998 8.2998 12.2402 8.2998 11.5498C8.2998 10.8594 7.74016 10.2998 7.0498 10.2998C6.35945 10.2998 5.7998 10.8594 5.7998 11.5498C5.7998 12.2402 6.35945 12.7998 7.0498 12.7998ZM13.2998 11.5498C13.2998 12.2402 12.7402 12.7998 12.0498 12.7998C11.3594 12.7998 10.7998 12.2402 10.7998 11.5498C10.7998 10.8594 11.3594 10.2998 12.0498 10.2998C12.7402 10.2998 13.2998 10.8594 13.2998 11.5498ZM17.0498 12.7998C17.7402 12.7998 18.2998 12.2402 18.2998 11.5498C18.2998 10.8594 17.7402 10.2998 17.0498 10.2998C16.3594 10.2998 15.7998 10.8594 15.7998 11.5498C15.7998 12.2402 16.3594 12.7998 17.0498 12.7998Z"
        fill="black"
      />
    </svg>
  ),
  bell: (props) => (
    <svg
      {...props}
      width="17"
      height="20"
      viewBox="0 0 17 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.51851 2.59164C6.34777 2.04541 7.34079 1.72754 8.40805 1.72754C11.3129 1.72754 13.6678 4.08241 13.6678 6.98729V8.79546C13.6678 9.74626 14.2805 10.5778 14.7675 11.3944C15.0235 11.8237 15.1706 12.3255 15.1706 12.8616C15.1706 14.2467 14.181 15.435 12.8091 15.6253C11.4466 15.8142 9.74424 16.0042 8.40804 16.0042C7.07184 16.0042 5.36944 15.8142 4.00702 15.6253C2.63508 15.435 1.64551 14.2467 1.64551 12.8616C1.64551 12.3255 1.79258 11.8237 2.04858 11.3944C2.53558 10.5778 3.1483 9.74625 3.1483 8.79544V6.98729C3.1483 6.26907 3.29225 5.58447 3.55288 4.96077"
        stroke="#616161"
        strokeWidth="1.7282"
        strokeLinecap="round"
      />
      <path
        d="M10.2861 18.002C9.88229 18.6093 9.19172 19.0096 8.40765 19.0096C7.62359 19.0096 6.93302 18.6093 6.52918 18.002"
        stroke="#616161"
        strokeWidth="1.7282"
        strokeLinecap="round"
      />
    </svg>
  ),
  addTitle: (props) => (
    <svg
      {...props}
      width="23"
      height="23"
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask maskUnits="userSpaceOnUse" x="0" y="0" width="23" height="23">
        <rect x="0.869141" y="0.639648" width="21.9609" height="21.9609" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_896_19934)">
        <path
          d="M10.8154 12.5352V15.2803C10.8154 15.5395 10.9031 15.7569 11.0785 15.9322C11.2539 16.1076 11.4712 16.1953 11.7305 16.1953C11.9897 16.1953 12.2071 16.1076 12.3824 15.9322C12.5578 15.7569 12.6455 15.5395 12.6455 15.2803V12.5352H15.3906C15.6499 12.5352 15.8672 12.4475 16.0426 12.2721C16.218 12.0967 16.3057 11.8794 16.3057 11.6201C16.3057 11.3609 16.218 11.1435 16.0426 10.9682C15.8672 10.7928 15.6499 10.7051 15.3906 10.7051H12.6455V7.95996C12.6455 7.7007 12.5578 7.48338 12.3824 7.308C12.2071 7.13261 11.9897 7.04492 11.7305 7.04492C11.4712 7.04492 11.2539 7.13261 11.0785 7.308C10.9031 7.48338 10.8154 7.7007 10.8154 7.95996V10.7051H8.07031C7.81105 10.7051 7.59373 10.7928 7.41835 10.9682C7.24296 11.1435 7.15527 11.3609 7.15527 11.6201C7.15527 11.8794 7.24296 12.0967 7.41835 12.2721C7.59373 12.4475 7.81105 12.5352 8.07031 12.5352H10.8154ZM11.7305 20.7705C10.4647 20.7705 9.27511 20.5303 8.16182 20.0499C7.04852 19.5695 6.0801 18.9176 5.25657 18.094C4.43303 17.2705 3.78107 16.3021 3.30067 15.1888C2.82028 14.0755 2.58008 12.8859 2.58008 11.6201C2.58008 10.3543 2.82028 9.16476 3.30067 8.05146C3.78107 6.93817 4.43303 5.96975 5.25657 5.14622C6.0801 4.32268 7.04852 3.67072 8.16182 3.19032C9.27511 2.70992 10.4647 2.46973 11.7305 2.46973C12.9963 2.46973 14.1858 2.70992 15.2991 3.19032C16.4124 3.67072 17.3808 4.32268 18.2044 5.14622C19.0279 5.96975 19.6799 6.93817 20.1603 8.05146C20.6407 9.16476 20.8809 10.3543 20.8809 11.6201C20.8809 12.8859 20.6407 14.0755 20.1603 15.1888C19.6799 16.3021 19.0279 17.2705 18.2044 18.094C17.3808 18.9176 16.4124 19.5695 15.2991 20.0499C14.1858 20.5303 12.9963 20.7705 11.7305 20.7705Z"
          fill="#1850BC"
        />
      </g>
    </svg>
  ),
  info: (props) => (
    <svg
      {...props}
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.40613 10.3605C1.78567 9.43354 1.42383 8.31888 1.42383 7.11971C1.42383 3.89805 4.0355 1.28638 7.25716 1.28638C10.4788 1.28638 13.0905 3.89805 13.0905 7.11971C13.0905 10.3414 10.4788 12.953 7.25716 12.953C6.09368 12.953 5.00976 12.6124 4.09968 12.0255"
        stroke="#616161"
        strokeWidth="0.875"
        strokeLinecap="round"
      />
      <path
        d="M7.54883 10.0366L7.54883 6.53662"
        stroke="#616161"
        strokeWidth="0.875"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.38216 6.53662L7.54883 6.53662"
        stroke="#616161"
        strokeWidth="0.875"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.54883 4.7867L7.54883 4.20337"
        stroke="#616161"
        strokeWidth="0.875"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  love: (props) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
      />
    </svg>
  ),
  comment: (props) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="black"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="white"
      className="md:w-8 w-6 h-6 md:h-8 md:relative md:right-0 absolute right-6 "
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
      />
    </svg>
  ),
  live: (props) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
    >
      <circle cx="12" cy="12" r="9" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="5" fill="white" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  play: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill=""
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="absolute top-1/2 left-1/2 fill-gray-300 -translate-x-1/2 -translate-y-1/2 w-14 h-14"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
      />
    </svg>
  ),
};
