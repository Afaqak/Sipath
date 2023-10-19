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
  mic(props) {
    return (
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
        className="lucide lucide-mic"
      >
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" x2="12" y1="19" y2="22" />
      </svg>
    );
  },
  switchVideo(props) {
    return (
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
        className="lucide lucide-video"
      >
        <path d="m22 8-6 4 6 4V8Z" />
        <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
      </svg>
    );
  },
  endCall(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-phone"
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    );
  },
  rating(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        fill="orange"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="none"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
        />
      </svg>
    );
  },
  archivedPodcast(props) {
    console.log(props, 'from svg');
    return (
      <svg
        width="20"
        height="19"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          {...props}
          d="M2.5 6.16667L11.7308 2.32051C12.2231 2.11538 12.7769 2.11538 13.2692 2.32051L17.5 4.08333L22.5 6.16667M2.5 6.16667L7.5 8.25M2.5 6.16667V10.5M12.5 10.3333V22M12.5 10.3333L22.5 6.16667M12.5 10.3333L7.5 8.25M12.5 22L3.11538 18.0897C2.74274 17.9345 2.5 17.5704 2.5 17.1667V13.5M12.5 22L21.8846 18.0897C22.2573 17.9345 22.5 17.5704 22.5 17.1667V6.16667M7.5 8.25L14 5.5"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  },
  livePodcast(props) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-5 h-5"
      >
        <circle cx="12" cy="12" r="9" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="5" {...props} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  },
  upcomingPodcast(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
        />
      </svg>
    );
  },
  search(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6 p-1"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
    );
  },
  elipsis(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
        />
      </svg>
    );
  },
  trash(props) {
    return (
      <svg
        {...props}
        width="15"
        height="19"
        viewBox="0 0 15 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.5 9.91634V8.73491C2.5 7.87901 2.2224 7.0462 1.70886 6.36149V6.36149C1.00477 5.4227 1.67462 4.08301 2.8481 4.08301H12.1519C13.3254 4.08301 13.9952 5.4227 13.2911 6.36149V6.36149C12.7776 7.0462 12.5 7.87901 12.5 8.73491V13.4163C12.5 15.6255 10.7091 17.4163 8.5 17.4163H6.5C4.29086 17.4163 2.5 15.6255 2.5 13.4163V13.2497"
          stroke="#FB3C22"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M9.16699 13.25L9.16699 8.25"
          stroke="#FB3C22"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.83301 13.25L5.83301 8.25"
          stroke="#FB3C22"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.69736 1.84598C9.43524 1.67814 9.12535 1.58301 8.79878 1.58301H6.20132C5.87475 1.58301 5.56486 1.67814 5.30273 1.84598"
          stroke="#FB3C22"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    );
  },
  edit(props) {
    return (
      <svg
        {...props}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.565 7.40509L15.3036 2.6593C16.3753 1.58594 18.1136 1.58529 19.1861 2.65783L21.465 4.93666C22.5284 6.00005 22.5394 7.72157 21.4897 8.79853L11.2882 19.2654C10.5131 20.0606 9.45011 20.509 8.34008 20.509L5.21985 20.5088C4.34521 20.5088 3.64671 19.7797 3.6835 18.9051V18.9051L3.75095 17.3016L3.8184 15.698V15.698C3.86178 14.6666 4.29041 13.6892 5.01948 12.959L7.22542 10.7497"
          strokeWidth="2.05981"
          strokeLinecap="round"
        />
        <path
          d="M16.5821 8.41022L18.8975 10.7256"
          strokeWidth="2.05981"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  },
  expantArrow(props) {
    return (
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
        class="lucide lucide-chevron-down"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    );
  },
  profile(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="10" r="3" />
        <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
      </svg>
    );
  },
  logout(props) {
    return (
      <svg
        {...props}
        width="21"
        height="21"
        viewBox="0 0 21 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14 14V15.75C14 17.683 12.433 19.25 10.5 19.25H6.125C4.192 19.25 2.625 17.683 2.625 15.75V5.25C2.625 3.317 4.192 1.75 6.125 1.75H10.5C12.433 1.75 14 3.317 14 5.25V7"
          stroke="#FB3C22"
          strokeWidth="1.3125"
          strokeLinecap="round"
        />
        <path
          d="M16.625 13.125L18.6313 11.1187C18.973 10.777 18.973 10.223 18.6313 9.88128L16.625 7.875"
          stroke="#FB3C22"
          strokeWidth="1.3125"
          strokeLinecap="round"
        />
        <path
          d="M18.375 10.5L7.875 10.5"
          stroke="#FB3C22"
          strokeWidth="1.3125"
          strokeLinecap="round"
        />
      </svg>
    );
  },
  addVideo(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m22 8-6 4 6 4V8Z" />
        <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
      </svg>
    );
  },
  edit2(props) {
    return (
      <svg
        {...props}
        width="21"
        height="22"
        viewBox="0 0 21 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18.25 11.7285V15.2051C18.25 17.6051 16.3044 19.5508 13.9043 19.5508H6.95117C4.55111 19.5508 2.60547 17.6051 2.60547 15.2051V8.25195C2.60547 5.85189 4.55111 3.90625 6.95117 3.90625H10.4277"
          strokeWidth="1.30371"
          strokeLinecap="round"
        />
        <path
          d="M11.5538 6.40472L14.553 3.40098C15.2314 2.72162 16.3316 2.72121 17.0104 3.40005L18.4527 4.84238C19.1258 5.51543 19.1328 6.60503 18.4684 7.28667L12.0116 13.9114C11.521 14.4147 10.8482 14.6985 10.1456 14.6985L8.17075 14.6984C7.61717 14.6984 7.17507 14.2369 7.19835 13.6834V13.6834L7.24104 12.6685L7.28373 11.6535V11.6535C7.31119 11.0007 7.58248 10.3821 8.04393 9.91994L9.44013 8.52163"
          strokeWidth="1.30371"
          strokeLinecap="round"
        />
        <path
          d="M15.3627 7.04114L16.8281 8.50659"
          strokeWidth="1.30371"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  },
  editPencil(props) {
    return (
      <svg
        {...props}
        width="17"
        height="18"
        viewBox="0 0 17 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.1217 1.3345C12.3406 0.553448 11.0748 0.553927 10.2943 1.33557L8.63116 3.00125L13.9717 8.34174L15.6316 6.63865C16.396 5.85438 16.3879 4.60074 15.6135 3.82635L13.1217 1.3345ZM12.9246 9.41602L7.57131 4.06272L0.994399 10.6496C0.463331 11.1815 0.151106 11.8935 0.119509 12.6447L0.00135447 15.4537C-0.0345132 16.3064 0.646563 17.0174 1.49939 17.0174L4.25154 17.0175C5.05989 17.0175 5.83401 16.691 6.39844 16.1119L12.9246 9.41602Z"
          fill="white"
        />
      </svg>
    );
  },
  cross(props) {
    return (
      <svg
        {...props}
        width="9"
        height="8"
        viewBox="0 0 9 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.46506 7.75748C8.3148 7.90774 8.13802 7.98287 7.93473 7.98287C7.73143 7.98287 7.55466 7.90774 7.4044 7.75748L4.75275 5.10583L2.1011 7.75748C1.95084 7.90774 1.77406 7.98287 1.57077 7.98287C1.36747 7.98287 1.1907 7.90774 1.04044 7.75748C0.890175 7.60722 0.815045 7.43044 0.815045 7.22715C0.815045 7.02385 0.890175 6.84708 1.04044 6.69682L3.69209 4.04517L1.04044 1.39352C0.890175 1.24326 0.815045 1.06648 0.815045 0.863186C0.815045 0.659892 0.890175 0.483116 1.04044 0.332855C1.1907 0.182595 1.36747 0.107465 1.57077 0.107465C1.77406 0.107465 1.95084 0.182595 2.1011 0.332855L4.75275 2.98451L7.4044 0.332855C7.55466 0.182596 7.73143 0.107465 7.93473 0.107465C8.13802 0.107465 8.3148 0.182595 8.46506 0.332855C8.61532 0.483116 8.69045 0.659892 8.69045 0.863186C8.69045 1.06648 8.61532 1.24326 8.46506 1.39352L5.81341 4.04517L8.46506 6.69682C8.61532 6.84708 8.69045 7.02385 8.69045 7.22715C8.69045 7.43044 8.61532 7.60722 8.46506 7.75748Z"
          fill="white"
        />
      </svg>
    );
  },
  add(props) {
    return (
      <svg
        {...props}
        width="9"
        height="8"
        viewBox="0 0 9 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.46506 7.75748C8.3148 7.90774 8.13802 7.98287 7.93473 7.98287C7.73143 7.98287 7.55466 7.90774 7.4044 7.75748L4.75275 5.10583L2.1011 7.75748C1.95084 7.90774 1.77406 7.98287 1.57077 7.98287C1.36747 7.98287 1.1907 7.90774 1.04044 7.75748C0.890175 7.60722 0.815045 7.43044 0.815045 7.22715C0.815045 7.02385 0.890175 6.84708 1.04044 6.69682L3.69209 4.04517L1.04044 1.39352C0.890175 1.24326 0.815045 1.06648 0.815045 0.863186C0.815045 0.659892 0.890175 0.483116 1.04044 0.332855C1.1907 0.182595 1.36747 0.107465 1.57077 0.107465C1.77406 0.107465 1.95084 0.182595 2.1011 0.332855L4.75275 2.98451L7.4044 0.332855C7.55466 0.182596 7.73143 0.107465 7.93473 0.107465C8.13802 0.107465 8.3148 0.182595 8.46506 0.332855C8.61532 0.483116 8.69045 0.659892 8.69045 0.863186C8.69045 1.06648 8.61532 1.24326 8.46506 1.39352L5.81341 4.04517L8.46506 6.69682C8.61532 6.84708 8.69045 7.02385 8.69045 7.22715C8.69045 7.43044 8.61532 7.60722 8.46506 7.75748Z"
          fill="white"
        />
      </svg>
    );
  },
};
