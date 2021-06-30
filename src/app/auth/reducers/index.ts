import {
  Action,
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on
} from '@ngrx/store';
import { AuthActions } from '../action-types';
import { User } from '../model/user.model';


export interface AuthState {
  user: User;
}
export const initialAuthState: AuthState = {
  user: undefined
};


// export const reducers: ActionReducerMap<AuthState> = {

// };

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (_, action) => {
    return {
      user: action.user
    };
  }),
  on(AuthActions.logout, (_) => initialAuthState)
);
