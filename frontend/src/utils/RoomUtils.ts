import {
  IRoomWithQuantity,
  ITempBookingResponse,
  ITempBookingModifiedFormat,
} from "../components/types/types";

export const getTotalQuantity = (rooms: IRoomWithQuantity[]) => {
  let totalQuantity = 0;

  for (const room of rooms) {
    totalQuantity += room.quantity;
  }

  return totalQuantity;
};

export const getTotalPrice = (rooms: IRoomWithQuantity[]) => {
  let totalPrice = 0;

  for (const room of rooms) {
    totalPrice += room.quantity * room.price;
  }

  return totalPrice;
};

export const convertFormat = (
  booking: ITempBookingResponse
): ITempBookingModifiedFormat => {
  const updatedRooms = booking.rooms.map((room) => ({
    ...room.room,
    quantity: room.quantity || 0,
  }));

  const updatedBooking: ITempBookingModifiedFormat = {
    ...booking,
    rooms: updatedRooms,
  };

  return updatedBooking;
};
