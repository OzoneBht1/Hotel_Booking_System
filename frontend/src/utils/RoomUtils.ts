import { IRoomWithQuantity } from "../components/types/types";

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
