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
  cheapest_price: number;
  category: string;
  hotel_score: number;
  //images? : string[];
  rating: number;
  review_count: number;
  countInStock: number;
  lat: number;
  lng: number;
}

export interface IPaginated<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface IHotelReview {
  id: number;
  created_at: string;
  updated_at: string;
  review: string;
  score: number;
  user: number;
  hotel: number;
  room: number;
  user_image: string;
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

export interface IHotelRoom {
  id: number;
  room_type: string;
  price: number;
  amount: number;
}

export interface IRoomWithQuantity extends IHotelRoom {
  quantity: number;
}

export interface ITempRoom {
  room: number;
  quantity: number;
}

export interface ITempBooking {
  user_id: number;
  hotel_id: number;
  rooms: ITempRoom[];
}

export interface IListProperty {
  email: string;
  hotel_name: string;
  hotel_address: string;
  amenities: string[];
  rooms: IHotelRoom[];
}
