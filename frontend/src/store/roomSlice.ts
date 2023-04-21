import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IHotelRoom, IRoomWithQuantity } from "../components/types/types";

interface IRoomInitial {
  rooms: IRoomWithQuantity[];
}

const initialState: IRoomInitial = {
  rooms: [],
};

const roomSlice = createSlice({
  name: "rooms",
  initialState: initialState,
  reducers: {
    modifyRooms(state, action: PayloadAction<{ room: IRoomWithQuantity }>) {
      const { room } = action.payload;
      const foundRoomId = state.rooms.findIndex(
        (currRooms) => currRooms.id === room.id
      );
      const existingRoom = state.rooms[foundRoomId];
      if (existingRoom) {
        if (room.quantity === 0) {
          state.rooms.splice(foundRoomId, 1);
        } else {
          const updatedItem = {
            ...existingRoom,
            quantity: room.quantity,
          };
          state.rooms[foundRoomId] = updatedItem;
        }
      } else {
        if (room.quantity !== 0) {
          state.rooms.push(room);
        }
      }
    },
    clearRooms(state){
      state.rooms = []

    }
  },
});

export const roomActions = roomSlice.actions;
// export const user = (state: { auth: AuthState }) => state.auth.user;
export default roomSlice.reducer;
