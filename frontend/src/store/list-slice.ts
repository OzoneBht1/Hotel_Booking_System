import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IFAQCreate,
  IHotelRoom,
  IHouseRules,
  IListProperty,
} from "../components/types/types";

const initialState: IListProperty = {
  email: null,
  name: null,
  address: null,
  amenities: [],
  rooms: [],
  house_rules: {
    smoking_allowed: false,
    pets_allowed: false,
    parties_allowed: false,
    self_check_in: false,
  },
  faqs: { faqs: [] },
};

const listingSlice = createSlice({
  name: "listProperty",
  initialState: initialState,
  reducers: {
    setEmail(state, action: PayloadAction<{ email: string }>) {
      const { email } = action.payload;
      state.email = email;
    },

    setHotelNameAndAddress(
      state,
      action: PayloadAction<{ hotel_name: string; hotel_address: string }>
    ) {
      state.name = action.payload.hotel_name;
      state.address = action.payload.hotel_address;
    },
    addAmenity(state, action: PayloadAction<{ amenity: string }>) {
      state.amenities.push(action.payload.amenity);
    },
    removeAmenity(state, action: PayloadAction<{ amenity: string }>) {
      const foundAmenity = state.amenities.find(
        (existingAmenity) => existingAmenity === action.payload.amenity
      );

      if (foundAmenity) {
        const index = state.amenities.indexOf(foundAmenity);
        state.amenities.splice(index, 1);
      }
    },
    addRoom(state, action: PayloadAction<{ room: IHotelRoom }>) {
      state.rooms.push(action.payload.room);
    },
    removeRoom(state) {
      state.rooms.pop();
    },
    setHouseRules(state, action: PayloadAction<{ house_rules: IHouseRules }>) {
      state.house_rules = action.payload.house_rules;
    },
    setFaq(state, action: PayloadAction<IFAQCreate>) {
      console.log(action.payload);
      state.faqs.faqs = action.payload.faqs;
    },
  },
});

export const listActions = listingSlice.actions;
// export const user = (state: { auth: AuthState }) => state.auth.user;
export default listingSlice.reducer;
