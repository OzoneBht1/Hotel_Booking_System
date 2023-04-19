import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IHotelRoom } from "../components/types/types";

interface IRoom extends IHotelRoom {
  quantity: number;
}

interface IRoomInitial {
  totalQuantity: number;
  rooms: IRoom[];
}

const initialState: IRoomInitial = {
  totalQuantity: 0,
  rooms: [],
};

const roomSlice = createSlice({
  name: "rooms",
  initialState: initialState,
  reducers: {
    addRoom(state, action: PayloadAction<{ room: IRoom }>) {
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
  },
});

export const roomActions = roomSlice.actions;
// export const user = (state: { auth: AuthState }) => state.auth.user;
export default roomSlice.reducer;
