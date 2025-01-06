import { combineReducers } from "redux";
import categorySlice from "./categorySlice";
import productSlice from "./productSlice";
import userSlice from "./userSlice";
import sizeSlice from "./sizeSlice";
import colorSlice from "./colorSlice";
import productDetailSlice from "./productDetailSlice";
import authSlice from "./authSlice";
import cartSlice from "./cartSlice";
import wishListSlice from "./wishListSlice";
import historyViewSlice from "./historyViewSlice";
import addressSlice from "./addressSlice";
import orderSlice from "./orderSlice";
const reducers = combineReducers({
  category: categorySlice,
  product: productSlice,
  user: userSlice,
  size: sizeSlice,
  color: colorSlice,
  productDetail: productDetailSlice,
  auth: authSlice,
  listCart: cartSlice,
  wishList: wishListSlice,
  historyView: historyViewSlice,
  address: addressSlice,
  order: orderSlice,
});

export default reducers;
