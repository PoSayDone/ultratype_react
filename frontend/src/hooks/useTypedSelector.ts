import {TypedUseSelectorHook, useSelector} from "react-redux";
import {RootState} from "../store/reducers/allReducers";

export const useTypedSelector : TypedUseSelectorHook<RootState> = useSelector