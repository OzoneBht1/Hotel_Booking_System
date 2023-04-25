import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IHotelRoom, IListProperty } from "../components/types/types";

const initialState: IListProperty = {
  email: null,
  hotel_name: null,
  hotel_address: null,
  amenities: [],
  rooms: [],
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
      state.hotel_name = action.payload.hotel_name;
      state.hotel_address = action.payload.hotel_address;
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
  },
});

export const listActions = listingSlice.actions;
// export const user = (state: { auth: AuthState }) => state.auth.user;
export default listingSlice.reducer;
