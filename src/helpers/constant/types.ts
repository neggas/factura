import { JSX } from "react";

export type UserSession = {
  expires: Date;
  user: {
    id: string;
    name: string;
    email: string;
  };
};

export type NavigationLinkType = {
  component: JSX.Element;
};
