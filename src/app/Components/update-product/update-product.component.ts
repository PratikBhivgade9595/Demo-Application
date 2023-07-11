import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceService } from 'src/Service/api-service.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {
  token: string = 'WebAuth1234';
  
  constructor(private route: ActivatedRoute,
    private _service: ApiServiceService,
    private fb: FormBuilder) { }

  myForm!: FormGroup;

  ngOnInit(): void {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      code: ['', [Validators.required, Validators.pattern(/^[110001-999999]{6,6}$/g)]],
      description: ['', [Validators.required, Validators.maxLength(60)]],
      packaging: ['', [Validators.required, Validators.maxLength(50)]],
      unit: ['', [Validators.required, Validators.maxLength(50)]]
    });

    console.log(this.route.snapshot.params['id'] ,"Id");
    
    // this._service.getProductDetails(this.route.snapshot.params['id'], this.token).subscribe(response => {
    //     console.log(response);
        
    // })
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
      },
      error => {
        // Handle error
        console.error('Error Updating product:', error);
        alert('Error Updating product:')
      }
    );
    this.myForm.reset();
  }  

}
