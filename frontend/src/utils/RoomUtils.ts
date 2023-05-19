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

export const getDateTime = (date: string) => {
  const dateTimeObj: Date = new Date(date);
  const formattedDate: string = dateTimeObj.toISOString().split("T")[0];
  const formattedTime: string = dateTimeObj
    .toISOString()
    .split("T")[1]
    .split(".")[0];
  const formattedDateTime: string = formattedDate + " " + formattedTime;
  return formattedDateTime;
};

export const getDate = (date: string) => {
  const dateTimeObj: Date = new Date(date);
  const formattedDate: string = dateTimeObj.toISOString().split("T")[0];
  return formattedDate;
};

export const getTimeHHMM = (date: string) => {
  const dateTimeObj: Date = new Date(date);
  const hours: string = String(dateTimeObj.getHours()).padStart(2, "0");
  const minutes: string = String(dateTimeObj.getMinutes()).padStart(2, "0");
  const formattedTime: string = `${hours}:${minutes}`;
  return formattedTime;
};
