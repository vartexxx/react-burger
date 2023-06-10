import { TForgotPasswordAction } from "./forgotPasswordAction";
import { TGetUserAction } from "./getUserAction";

export type TUserActions =
    | TForgotPasswordAction
    | TGetUserAction;