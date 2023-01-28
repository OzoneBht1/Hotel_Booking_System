export interface tokenState {
  access: string;
  refresh: string;
}

export interface userState {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}
export interface authState {
  authTokens: null | tokenState;
  user: null | userState;
}

export interface loginCredentials {
  email: string;
  password: string;
}

export interface countryData {
  name: string;
  capital: string;
  currencies: Array<any>;
  flag?: string;
  independant?: boolean;
}

export interface registrationData {
  email: string;
  password: string;
  password2: string;
  first_name: string;
  last_name: string;
  gender: string;
  country: string;
  image?: File | null;
}

export interface SelectState {
  value: string;
  label: string;
}
