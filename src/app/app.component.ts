import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { AppState } from './reducers';
import { AuthActions } from './auth/action-types';
import { isLoggedInSelector, isLogOutSelector } from './auth/auth.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loading = true;
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;
  constructor(private router: Router, private store: Store<AppState>) { }

  ngOnInit() {
    const userProfile = localStorage.getItem('user');
    if (userProfile) {
      this.store.dispatch(AuthActions.login({ user: JSON.parse(userProfile) }));
    }
    this.router.events.subscribe(event => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });

    this.isLoggedIn$ = this.store.select(isLoggedInSelector);

    this.isLoggedOut$ = this.store.select(isLogOutSelector);
    // .pipe(tap(isLogOut => {
    //   if (isLogOut) {
    //     this.router.navigateByUrl('/login');
    //   }
    // }));
    // this.isLoggedOut$ = this.store.pipe(
    //   select(state => !state['auth'].user)
    // );
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }

}
