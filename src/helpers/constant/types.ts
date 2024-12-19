export type UserSession = {
  expires: Date;
  user: {
    id: string;
    name: string;
    email: string;
  };
};
