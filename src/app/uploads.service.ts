import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadsService {

  constructor(
    private httpClient: HttpClient
  ) { }

  uploadProfilePhoto(files: Set<File>, url: string){
    const email: string = localStorage.getItem('email') ?? ''
    const formData = new FormData();
    formData.append('email', email) 
    files.forEach((file: any) => {
      formData.append('files', file, file.name)
    })
    const request = new HttpRequest('POST', url, formData);
    return this.httpClient.request(request);
  }
}
