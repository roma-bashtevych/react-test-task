import {TypedUseSelectorHook, useSelector} from "react-redux";
import {RootState} from "../store";

export const useTapedSelector: TypedUseSelectorHook<RootState> = useSelector;
