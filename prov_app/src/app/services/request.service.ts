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
  // Get the token from the authService
  const token = this.authService.getToken();

  // Create the headers with the Authorization token
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  // Return the Observable from the HTTP POST request
  return this.http.post<any>(this.apiUrl, requestData, { headers });
}

getRequestsByUserId(userId: string): Observable<any> {
  return this.http.get(`${this.apiUrl}/user/${userId}`);
}

}
