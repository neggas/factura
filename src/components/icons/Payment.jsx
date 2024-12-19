"use client";

import { createIcon } from "@chakra-ui/react";

const PaymentIcon = createIcon({
  displayName: "PaymentIcon",
  viewBox: "0 0 17 16",
  path: (
    <>
      <rect
        x="15.1667"
        y="2"
        width="12"
        height="13.3333"
        rx="2"
        transform="rotate(90 15.1667 2)"
        stroke="#28303F"
      />
      <ellipse
        cx="4.50001"
        cy="11.3333"
        rx="0.666667"
        ry="0.666667"
        fill="#28303F"
      />
      <path
        d="M1.83332 4.66666L15.1667 4.66666L15.1667 7.33332L1.83332 7.33332L1.83332 4.66666Z"
        stroke="#28303F"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </>
  ),
});

export default PaymentIcon;
