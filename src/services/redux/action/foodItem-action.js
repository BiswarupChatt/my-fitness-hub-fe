export const FOOD_ITEM = "FOOD_ITEM"

export const setFoodItem = (foodItem) => {
    return { type: FOOD_ITEM, payload: foodItem }
}