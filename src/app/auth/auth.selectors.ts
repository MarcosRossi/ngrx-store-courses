import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './reducers';
// propiedad  que queremos del global store
export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const isLoggedInSelector = createSelector(
    // state => state['auth'],
    selectAuthState,
    (auth) => !!auth.user
);

export const isLogOutSelector = createSelector(
    isLoggedInSelector,
    (isLoggedIn) => !isLoggedIn
);

