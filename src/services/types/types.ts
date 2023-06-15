import { Action, ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { TBurgerIngredientsAction } from "../actions/burgerIngredientsAction";
import { TBurgerOrderAction } from "../actions/burgerOrderAction";
import { TForgotPasswordAction } from "../actions/forgotPasswordAction";
import { TGetUserAction } from "../actions/getUserAction";
import { TUserLoginAction } from "../actions/loginUserAction";
import { TUserLogoutAction } from "../actions/logoutUserAction";
import { TRefreshTokenAction } from "../actions/refreshTokenAction";
import { TUserRegisterAction } from "../actions/registerUserAction";
import { TResetPasswordAction } from "../actions/resetPasswordAction";
import { TUserUpdateAction } from "../actions/updateUserAction";
import { store } from "../store";


export type IIngredient = {
    _id: string,
    name: string,
    type: string,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
    __v: number,
    id?: string,
};

export type TOrderInfo = {
    _id: string,
    ingredients: string[],
    status: string,
    createdAt: string,
    updatedAt: string,
    number: number,
    name: string,
};

type TApplicationActions = 
    | TGetUserAction
    | TUserUpdateAction
    | TResetPasswordAction
    | TUserRegisterAction
    | TRefreshTokenAction
    | TUserLogoutAction
    | TUserLoginAction
    | TBurgerOrderAction
    | TForgotPasswordAction
    | TBurgerIngredientsAction;

export type AppDispatch = Dispatch<TApplicationActions>;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<TReturn = void> = ActionCreator<
    ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;
