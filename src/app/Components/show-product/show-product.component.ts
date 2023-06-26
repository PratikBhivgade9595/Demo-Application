import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/Service/api-service.service';

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.scss']
})
export class ShowProductComponent implements OnInit {
  product: any;
  productDetails: any[] | undefined; // Property to store the product details
  token: string = 'WebAuth1234';
  userName = "John";
  isLoading = true;

  constructor(private _service: ApiServiceService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.getProductDetails();
  }

  body = {
    UserName: this.userName
  };

  getProductDetails() {
    
    this._service.getProductDetails(this.body, this.token)
      .subscribe(
        response => {
          // Handle successful response
          this.isLoading = true;
          console.log(response);
          this.product = response
          this.productDetails = JSON.parse(this.product.d);
          this.isLoading = false;
        },
        error => {
          // Handle error
          console.error('Error retrieving product details:', error);
        }
      );
      

  }

}
