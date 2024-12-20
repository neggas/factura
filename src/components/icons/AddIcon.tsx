"use client";

import { createIcon } from "@chakra-ui/react";

const AddIcon = createIcon({
  displayName: "AddIcon",
  viewBox: "0 0 16 16",
  path: (
    <>
      <g clipPath="url(#clip0_7_1882)">
        <path
          d="M7.99999 5.33337V10.6667M10.6667 8.00004H5.33333"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.6667 8.00004C14.6667 4.31814 11.6819 1.33337 8 1.33337C4.31809 1.33337 1.33333 4.31814 1.33333 8.00004C1.33333 11.6819 4.31809 14.6667 8 14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 8.00004Z"
          stroke="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_7_1882">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </>
  ),
});

export default AddIcon;
