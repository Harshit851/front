import { createAction, props } from '@ngrx/store';


export const signIn = createAction('[Auth] Sign In', props<{ username: string; password: string }>());
export const signInSuccess = createAction('[Auth] Sign In Success', props<{ token: string; user: any }>());
export const signInFailure = createAction('[Auth] Sign In Failure', props<{ error: string }>());

export const signUp = createAction('[Auth] Sign Up', props<{ user: any }>());
export const signUpSuccess = createAction('[Auth] Sign Up Success', props<{ user: any }>());
export const signUpFailure = createAction('[Auth] Sign Up Failure', props<{ error: string }>());

export const logout = createAction('[Auth] Logout');