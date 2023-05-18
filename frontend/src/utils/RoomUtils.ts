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

export const getTotalPrice = (rooms: IRoomWithQuantity[], days: number) => {
  let totalPrice = 0;

  for (const room of rooms) {
    totalPrice += room.quantity * room.price * days;
  }

  return totalPrice;
};

export const convertFormat = (
  booking: ITempBookingResponse
): ITempBookingModifiedFormat => {
  console.log(booking);
  const updatedRooms = booking.rooms.map((room) => ({
    ...room.room,
    quantity: room.quantity || 0,
  }));

  const updatedBooking: ITempBookingModifiedFormat = {
    ...booking,
    rooms: updatedRooms,
  };
  console.log(updatedBooking);

  return updatedBooking;
};

export const getDays = (checkIn: string | Date, checkOut: string | Date) => {
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const days =
    (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24);

  return days;
};
