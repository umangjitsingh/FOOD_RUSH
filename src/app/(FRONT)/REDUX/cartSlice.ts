import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface ICartItem {
    _id: string;
    name: string;
    category: string;
    price: number;
    size?: "NA" | "Small" | "Medium" | "Large";
    image: string[];
    quantity: number;
}

interface ICartSlice {
    cartData: ICartItem[];
}

const initialState: ICartSlice = {
    cartData: [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        // adds a new meal, or increases quantity if it's already in the cart
        addMealToCart: (state, action: PayloadAction<Omit<ICartItem, "quantity">>) => {
            const exists = state.cartData.some(m => m._id === action.payload._id);
            state.cartData = exists
                ? state.cartData.map(m =>
                    m._id === action.payload._id ? {...m, quantity: m.quantity + 1} : m
                )
                : [...state.cartData, {...action.payload, quantity: 1}];
        },

        // decreases quantity, and removes the meal when it reaches 0
        removeMealFromCart: (state, action: PayloadAction<string>) => {
            state.cartData = state.cartData
                .map(m => m._id === action.payload ? {...m, quantity: m.quantity - 1} : m)
                .filter(m => m.quantity > 0);
        },
    },
});

export const {addMealToCart, removeMealFromCart} = cartSlice.actions;
export default cartSlice.reducer;
