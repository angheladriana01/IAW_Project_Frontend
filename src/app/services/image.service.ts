import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private apiUrl = 'http://localhost:8081/api/image';

  constructor(private http: HttpClient) {}

  getImageUrl(productId: number): Observable<string> {
    const url = `${this.apiUrl}/${productId}`;
    return this.http.get(url, { responseType: 'text' }).pipe(
      map((base64String) => {
        // Prefixăm stringul Base64 pentru a-l face afișabil ca URL
        return `data:image/jpeg;base64,${base64String}`;
      })
    );
  }


  uploadImage(productId: number, image: File): Observable<string> {
    const url = `${this.apiUrl}/${productId}`;
    const formData = new FormData();
    formData.append('image', image);

    return this.http.post(url, formData, { responseType: 'text' });
  }
}

