export type AuthenticationStateType = {
  isAuthenticated: boolean;
  authToken: string | null;
  currentUser: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  } | null;
};
