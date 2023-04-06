export interface ITokenState {
  access: string;
  refresh: string;
}

export interface IUserJwt {
  token_type: string;
  exp: number;
  iat: number;
  jti: string;
  user_id: number;
}
export interface IAuthState {
  authTokens: null | ITokenState;
  user: null | IUserJwt;
}

export interface ILoginCreds {
  email: string;
  password: string;
}

export interface ICountryData {
  name: string;
  capital: string;
  currencies: Array<any>;
  flag?: string;
  independant?: boolean;
}

export interface IRegistration {
  email: string;
  password: string;
  password2: string;
  first_name: string;
  last_name: string;
  gender: string;
  country: string;
  image?: File | null;
}

export interface ISelect {
  value: string;
  label: string;
}
export interface IUserData {
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  country: string;
  image: string;
}

export interface IHotelData {
  id: number;
  name: string;
  address: string;
  description: string;
  amenities: string[];
  hotel_images?: {
    id: number;
    created_at: string;
    updated_at: string;
    image: string;
    hotel: number;
  }[];
  price: number;
  category: string;
  hotel_score: number;
  //images? : string[];
  rating: number;
  numReviews: number;
  countInStock: number;
  lat: number;
  lng: number;
}

export interface ISearchResponse {
  count: number;
  next: string;
  previous: string;
  results: IHotelData[];
}

export interface IHomePageItems extends IHotelData {}

export interface IQuery {
  checkInDate: string;
  checkOutDate: string;
  searchQuery: string;
  people: number;
  rooms: number;
}

export interface IListProperty{
  email : string;
  hotel_name : string;
  hotel_address : string;
  amenities : string[];
  // rooms : []; 
  
}
