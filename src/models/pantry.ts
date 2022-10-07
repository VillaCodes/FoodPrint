interface PantryIngredient {
  ingredient: string;
  useCount: number;
  amountOnHand: string;
}

export const PantryDefault = [{
  ingredient: '',
  useCount: 0,
  amountOnHand: '',
}];

export { PantryIngredient };