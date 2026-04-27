import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface AuthUser {
  userId: number;
  name: string;
  email: string;
  role: string;
}

const BASE = 'http://localhost:5005/api/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _user: AuthUser | null = null;

  constructor(private http: HttpClient) {
    const stored = localStorage.getItem('user');
    if (stored) this._user = JSON.parse(stored);
  }

  get user(): AuthUser | null { return this._user; }
  get userId(): number { return this._user?.userId ?? 0; }
  get role(): string { return this._user?.role ?? ''; }
  get isLoggedIn(): boolean { return !!this._user; }

  login(email: string, password: string): Observable<AuthUser> {
    return this.http.post<AuthUser>(`${BASE}/login`, { email, password }).pipe(
      tap(user => {
        this._user = user;
        localStorage.setItem('user', JSON.stringify(user));
      })
    );
  }

  register(dto: any): Observable<AuthUser> {
    return this.http.post<AuthUser>(`${BASE}/register`, dto).pipe(
      tap(user => {
        this._user = user;
        localStorage.setItem('user', JSON.stringify(user));
      })
    );
  }

  logout(): void {
    this._user = null;
    localStorage.removeItem('user');
  }
}
