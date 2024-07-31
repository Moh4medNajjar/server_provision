import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private apiUrl = 'http://localhost:3000/api/requests'; // Replace with your API URL

  constructor(private http: HttpClient, private authService: AuthService) { }

createRequest(requestData: any): Observable<any> {
  const token = this.authService.getToken();

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
  return this.http.post<any>(this.apiUrl, requestData, { headers });
}

getRequestsByUserId(userId: string): Observable<any> {
  return this.http.get(`${this.apiUrl}/user/${userId}`);
}

getRequestById(id: string): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.get<any>(`${this.apiUrl}/${id}`, { headers });
}

getRequests(): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.get<any>(`${this.apiUrl}`, {headers});
}

}
