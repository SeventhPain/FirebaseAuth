import { configureStore } from "@reduxjs/toolkit";
import * as AllSlices from './slices'
export const store = configureStore({
    reducer: AllSlices,
});