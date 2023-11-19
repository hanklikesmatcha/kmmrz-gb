export const totalPrice = (price: number, quantity: number) => {
  const totalPrice = price * quantity;
  const roundedPrice = Math.round(totalPrice * 100) / 100;

  return roundedPrice;
};
