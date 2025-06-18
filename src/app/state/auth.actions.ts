import { createAction, props } from '@ngrx/store';


export const signIn = createAction(
  '[Auth] Sign In',
  props<{ email: string; password: string }>()
);


export const signInFailure = createAction('[Auth] Sign In Failure', props<{ error: string }>());
export const signInSuccess = createAction(
  '[Auth] Sign In Success',
  props<{ token: string; user: { email?: string; username?: string; role?: string } }>()
);
export const signUp = createAction('[Auth] Sign Up', props<{ user: any }>());
export const signUpSuccess = createAction('[Auth] Sign Up Success', props<{ user: any }>());
export const signUpFailure = createAction('[Auth] Sign Up Failure', props<{ error: string }>());

export const logout = createAction('[Auth] Logout');

