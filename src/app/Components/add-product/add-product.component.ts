import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { response } from 'express';
import { ApiServiceService } from 'src/Service/api-service.service';
import { isJSDocReadonlyTag } from 'typescript';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  myForm!: FormGroup;
  value: any;
  token: string = 'WebAuth1234';

  constructor(private fb: FormBuilder,
    private _service: ApiServiceService) { }

  ngOnInit() {
    //Reactive Form
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      code: ['', [Validators.required, Validators.pattern(/^[110001-999999]{6,6}$/g)]],
      description: ['', [Validators.required, Validators.maxLength(60)]],
      packaging: ['', [Validators.required, Validators.maxLength(50)]],
      unit: ['', [Validators.required, Validators.maxLength(50)]],
      photo: ['', Validators.required]
    });
  }

  onSubmit(form: FormGroup) {
    //const product = {...form.value}
    //  console.log(form.value);
    //  console.log(product);

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

      },
      error => {
        // Handle error
        console.error('Error adding product:', error);
        alert('Error adding product:')
      }
    );
    this.myForm.reset();
  }
}


