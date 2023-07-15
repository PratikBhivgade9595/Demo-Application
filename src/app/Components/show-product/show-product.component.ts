import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  myAddForm!: FormGroup;
  photo!: string;
  Base64: any;
  //cd: any;
  files: any;
  //sampleString: string | undefined;


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

    this.myAddForm = this.fb.group({
      name: ['', Validators.required],
      code: ['', [Validators.required, Validators.pattern(/^[110001-999999]{6,6}$/g)]],
      description: ['', [Validators.required, Validators.maxLength(60)]],
      packaging: ['', [Validators.required, Validators.maxLength(50)]],
      unit: ['', [Validators.required, Validators.maxLength(50)]],
      photo: ['', Validators.required]
    });
  }

  // getVal(val:string) {
  //     this.userName = val;
  // }

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

    this._service.deleteProductDetails(val, this.token).subscribe(response => {
      //console.log(response);
      const value: any = response;

      if (value.d === "00") {
        alert("Successfully Deleted")
      } else if (value.d === "01") {
        alert("Item Not Found")
      } else if (value.d === "02") {
        alert("System Error")
      }
      this.getProductDetails();
    },
      error => {
        console.log(error);
      }
    );
  }

  editProduct(itemCode: string, description: string, packages: string, unit: string) {
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
        const value: any = response;
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



  onSubmitAddPrd(form: FormGroup) {
    //const product = {...form.value}
    //  console.log(form.value);

    const product = {
      UserName: form.value.name,
      ItemCode: form.value.code,
      Description: form.value.description,
      Packaging: form.value.packaging,
      Unit: form.value.unit,
      Photo: form.value.photo
    };
    //console.log(product);


    this._service.addProduct(product, this.token).subscribe(
      response => {
        // Handle successful response
        //console.log('Product added successfully!', response);
        // this.value = response;
        // console.log(this.value.d);

        const res1 = { d: '00' };
        const res2 = { d: '01' };
        const res3 = { d: '02' };
        const res4 = { d: 'Authentication Fail' };

        if (JSON.stringify(response) === JSON.stringify(res3)) {
          // System error
          console.log('Unable to add product. System error.');
          alert('Unable to add product. System error.');
        } else if (JSON.stringify(response) === JSON.stringify(res2)) {
          // Item already exists
          console.log('Item already exists.');
          alert('Item already exists.')
        } else if (JSON.stringify(response) === JSON.stringify(res1)) {
          // Product added successfully
          console.log('Product added successfully!', response);
          alert("Product added successfully!")
        } else if (JSON.stringify(response) === JSON.stringify(res4)) {
          // Authentication failure
          console.log('Authentication failed. Invalid username or password.');
          alert('Authentication failed. Invalid username or password.')
        } else {
          // Handle other response cases as needed
        }
        this.myForm.reset();
        this.getProductDetails();
      },
      error => {
        // Handle error
        console.error('Error adding product:', error);
        alert('Error adding product:')
      }
    );
   
  }

  refresh() {
    this.myAddForm.reset();
    //this.files = null
  }

  handleFileInput(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result, "result");
      const result : any = reader.result
      const base64WithoutPrefix = result?.replace(/^data:image\/\w+;base64,/, '');

      //this.myAddForm.get("photo")?.setValue(reader.result)
      
      this.myAddForm.controls['photo'].setValue(base64WithoutPrefix);
      // this.myAddForm.get("photo")?.patchValue({
      //   photo: reader.result
      // });

      //this.cd.markForCheck();
    };
  }

}















