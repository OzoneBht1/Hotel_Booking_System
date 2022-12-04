export interface TokenState {
  access: string;
  refresh: string;
}

export interface UserState {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}
export interface AuthState {
  authTokens: null | TokenState;
  // user: null | {};
}

export interface LoginInformation {
  email: string;
  password: string;
}
