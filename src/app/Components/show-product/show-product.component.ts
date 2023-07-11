import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { response } from 'express';
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
  myForm!: FormGroup;

  constructor(private _service: ApiServiceService,
    private fb: FormBuilder) { }

  

  ngOnInit(): void {
    this.myForm = this.fb.group({
      code: ['', [Validators.required, Validators.pattern(/^[110001-999999]{6,6}$/g)]],
      description: ['', [Validators.required, Validators.maxLength(60)]],
      packaging: ['', [Validators.required, Validators.maxLength(50)]],
      unit: ['', [Validators.required, Validators.maxLength(50)]]
    });
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

  deleteData(item: any) {

    const val = {
      UserName: this.userName,
      ItemCode: item.ItemCode
    }

    this._service.deleteProductDetails(val, this.token).subscribe(response =>{
      //console.log(response);
      const value:any = response;

      if (value.d === "00") {
          alert("Successfully Deleted")
      }else if (value.d === "01") {
        alert("Item Not Found")
      }else if (value.d === "02") {
        alert("System Error")
      }
      this.getProductDetails();
    },
    error => {
      console.log(error);
    }
    );
  }

  editProduct(itemCode: string, description: string, packages: string, unit: string ) {
    this.myForm.controls['code'].setValue(itemCode);
    this.myForm.controls['description'].setValue(description);
    this.myForm.controls['packaging'].setValue(packages);
    this.myForm.controls['unit'].setValue(unit);
  }

  onSubmit(form: FormGroup) {
    //const product = {...form.value}
    //  console.log(form.value);
    //  console.log(product);

    const product = {
      UserName: this.userName,
      ItemCode: form.value.code,
      Description: form.value.description,
      Packaging: form.value.packaging,
      Unit: form.value.unit,
    };
    //console.log(product);


    this._service.updateProductDetails(product, this.token).subscribe(
      response => {
        // Handle successful response
        //console.log('Product added successfully!', response);
        const value:any = response;
        console.log(value.d);

        if (value.d === "00") {
          // System error
          alert('Successfully Edited.');
        } else if (value.d === "01") {
          // Item already exists
          alert('Item Not Found.')
        } else if (value.d === "02") {
          // Product added successfully
          alert('System Error')
        }
        this.getProductDetails();
      },
      error => {
        // Handle error
        console.error('Error Updating product:', error);
        alert('Error Updating product:')
      }
    );
  }  

}
