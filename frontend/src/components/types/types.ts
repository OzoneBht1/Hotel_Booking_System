export interface tokenState {
  access: string;
  refresh: string;
}

export interface userState {
  token_type: string;
  exp: number;
  iat: number;
  jti: string;
  user_id: number;
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

export interface UserDetails {
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  country: string;
  image: string;
}

export interface ISearchResult {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  rating: number;
  numReviews: number;
  countInStock: number;
}

export interface ISearchResponse {
  count: number;
  next: string;
  previous: string;
  results: ISearchResult[];
}
