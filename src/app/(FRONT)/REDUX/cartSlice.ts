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
    subTotal: number;
    deliverFee: number;
    total: number;
}

const initialState: ICartSlice = {
    cartData: [],
    subTotal: 0,
    deliverFee: 0,
    total: 0,
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
            cartSlice.caseReducers.calculateTotal(state);
        },

        // decreases quantity, and removes the meal when it reaches 0
        removeMealFromCart: (state, action: PayloadAction<string>) => {
            state.cartData = state.cartData
                .map(m => m._id === action.payload ? {...m, quantity: m.quantity - 1} : m)
                .filter(m => m.quantity > 0);
            cartSlice.caseReducers.calculateTotal(state);
        },
        calculateTotal:(state)=>{
           state.subTotal = state.cartData.reduce((total, item) => total + item.price * item.quantity, 0);
           state.deliverFee=state.subTotal > 20 ? 0 : 5;
           state.total = (state.subTotal + state.deliverFee)*1.13;
        }
    },
});

export const {addMealToCart, removeMealFromCart} = cartSlice.actions;
export default cartSlice.reducer;
