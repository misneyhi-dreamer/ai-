
import React from 'react';

export const SpeakerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 18.75a6 6 0 006-6v-1.5a6 6 0 00-6-6v1.5a6 6 0 00-6 6v1.5a6 6 0 006 6zM12 18.75a6 6 0 00-6-6v-1.5a6 6 0 006-6v1.5a6 6 0 006 6v1.5a6 6 0 00-6 6z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 12.75a.75.75 0 000-1.5.75.75 0 000 1.5z"
    />
  </svg>
);
