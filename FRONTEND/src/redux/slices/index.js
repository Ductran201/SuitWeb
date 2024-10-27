import { combineReducers } from "redux";
import categorySlice from "./categorySlice";
import productSlice from "./productSlice";
import userSlice from "./userSlice";
import sizeSlice from "./sizeSlice";
import colorSlice from "./colorSlice";
import productDetailSlice from "./productDetailSlice";
const reducers = combineReducers({
  category: categorySlice,
  product: productSlice,
  user: userSlice,
  size: sizeSlice,
  color: colorSlice,
  productDetail: productDetailSlice,
});

export default reducers;
