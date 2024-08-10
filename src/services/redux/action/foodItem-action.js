export const FOOD_ITEM = "FOOD_ITEM"

export const setFoodITem = (foodItem) => {
    return { type: FOOD_ITEM, payload: foodItem }
}