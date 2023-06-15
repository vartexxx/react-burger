import { TForgotPasswordAction } from "./forgotPasswordAction";
import { TGetUserAction } from "./getUserAction";
import { TUserLoginAction } from "./loginUserAction";
import { TUserLogoutAction } from "./logoutUserAction";
import { TRefreshTokenAction } from "./refreshTokenAction";
import { TUserRegisterAction } from "./registerUserAction";
import { TResetPasswordAction } from "./resetPasswordAction";
import { TUserUpdateAction } from "./updateUserAction";


export type TUserActions =
    | TGetUserAction
    | TForgotPasswordAction
    | TUserLoginAction
    | TUserLogoutAction
    | TRefreshTokenAction
    | TUserRegisterAction
    | TResetPasswordAction
    | TUserUpdateAction;
