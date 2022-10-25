import { configureStore } from "@reduxjs/toolkit";

import studentSlice from "./studentSlice";
import loginSlice from "./loginSlice";
const store = configureStore({
    reducer: {
        student: studentSlice,
        login:  loginSlice,
    },
})
export default store;