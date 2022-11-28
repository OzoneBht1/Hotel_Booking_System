export interface TokenState {
  access: string;
  refresh: string;
}

export interface AuthState {
  authTokens: null | TokenState;
}

export interface LoginInformation {
  email: string;
  password: string;
}
