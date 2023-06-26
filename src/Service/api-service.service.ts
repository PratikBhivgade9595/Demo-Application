import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http: HttpClient) { }

  //Add New Product Method
  addProduct(product: any, token: string) {
    const headers = new HttpHeaders({
       'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  
    const apiUrl = 'https://www.aspiresoft.co.ke/Wt/APIs.aspx/additem'; // Replace with your API endpoint
  
    return this.http.post(apiUrl, product, { headers });
  }

  //Get Product
  getProductDetails(body: any, token: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  
    const apiUrl = `https://www.aspiresoft.co.ke/Wt/APIs.aspx/getproductlisting`; // Replace with your API endpoint
  
    return this.http.post(apiUrl, body, { headers });
  }
  
}
