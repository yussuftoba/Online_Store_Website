import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit {
  productId:any;
  product:any;

  categories: string[] = ['All', 'Electronics', 'Fashion', 'Accessories', 'Home'];
  constructor(public service:ProductService, public activatedRoute:ActivatedRoute, public router:Router){
    this.productId=this.activatedRoute.snapshot.params['id'];
  }
 
myForm=new FormGroup({
  name:new FormControl('',[
    Validators.required,
        Validators.minLength(3)
  ] ),
  description:new FormControl('',[
    Validators.required
  ] ),
  price:new FormControl('',[
    Validators.required,
        Validators.min(1)
  ] ),
  image:new FormControl('',[
    Validators.required
  ] ),
  category:new FormControl('',[
    Validators.required
  ] ),
  stock:new FormControl('',[
    Validators.required,
        Validators.min(0)
  ] ),
  rating: new FormControl('', [
    Validators.required, 
    Validators.min(0), 
    Validators.max(5)])
});
  

 ngOnInit(): void {
    if(this.productId !=0){
      this.service.getById(this.productId).subscribe({
        next:(data:any)=>{
          this.product=data;
          this.getName.setValue(this.product.name);
          this.getDescription.setValue(this.product.description);
          this.getprice.setValue(this.product.price);
          this.getImage.setValue(this.product.image);
          this.getCategory.setValue(this.product.category);
          this.getStock.setValue(this.product.stock);
          this.getRating.setValue(this.product.rating)
        },
        error:(err:any)=>{
          console.error('Error fetching product:', err);
        },
        complete:()=>{
          console.log('Product data fetched successfully');
        }
      });
    }
  }
get getName(){
    return this.myForm.controls['name'];
  }

  get getDescription(){
    return this.myForm.controls['description'];
  }

  get getprice(){
    return this.myForm.controls['image'];
  }

  get getImage(){
    return this.myForm.controls['price'];
  }

  get getCategory(){
    return this.myForm.controls['category'];
  }

  get getStock(){
    return this.myForm.controls['stock'];
  }

  get getRating(){
    return this.myForm.controls['rating'];
  }
  
  onSubmit(form:any){
    if(form.valid){
      
      if(this.productId==0){
        this.service.addProduct(form.value).subscribe({
          next:(data:any)=>{
           
          alert("Product added successfully!");
          this.router.navigate(['/products']);
          },
          error:(err:any)=>{
            alert('Error adding product: ' + err.message);
          }
        });
      }
      else{
        this.service.editProduct(form.value, this.productId).subscribe({
          next:(data:any)=>{
            alert("Product Updated successfully!");
            this.router.navigate(['/products']);
          },
          error:(err:any)=>{
            alert('Error updating product: '+err.message);
          }
        });
      }
    }
  }

}
