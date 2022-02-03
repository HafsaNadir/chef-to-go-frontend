import { Component, OnInit } from '@angular/core';
import { CategoryService } from "../core/services/category.service";
import { Subscription } from 'rxjs';
import * as jQuery from 'jquery';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { NotificationService } from '../core/notification.service'
import { environment } from './../../environments/environment';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  subscriptions: Subscription[] = [];
  category : [];
  customers : [];
  variantsArray  : string[ ] = [ ];
  menus : any;
  categoryId : string = null;
  itemName : string = null;
  shortDesc: string = null;
  price: string;
  longDesc: string = null
  image: string = null;
  imgageUrl: string = null;
  fileData: File = null;
  previewUrl:any = null;
  previewUrlE:any = null;

  fileUploadProgress: string = null;
  uploadedFilePath: string = null; 

  categoryIdE : string = null;
  itemNameE : string = null;
  shortDescE: string = null;
  priceE: string;
  longDescE: string = null
  imageE: string = null;
  imgageUrlE: string = null;
  editId: string = null;  
  variationId: string = null;
  vType : number = null;
  productForm: FormGroup;
  vName : string = null;
  variationData : any;

  constructor(private http: HttpClient,private categoryService: CategoryService ,private notifyService : NotificationService ,private fb:FormBuilder) {
    this.imgageUrl = environment.imageBase;
    this.categoryService.getMenu();
    this.categoryService.getCategory();
    this.productForm = this.fb.group({
      quantities: this.fb.array([]) ,
    });
    this.subscriptions[0] = this.categoryService.categoryData$.subscribe(data => {
      if (data && data.length > 0) {
        this.category = data;
      }
    });  

    this.subscriptions[1] = this.categoryService.menuData$.subscribe(data => {
      console.log('data',data);
      if (data && data.length > 0) {
        this.menus = data;
        console.log('this.menus)',this.menus);
      }
    });  
    

  }
  ngOnInit(): void {
  }
  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
}

preview() {
  // Show preview 
  var mimeType = this.fileData.type;
  if (mimeType.match(/image\/*/) == null) {
    return;
  }

  var reader = new FileReader();      
  reader.readAsDataURL(this.fileData); 
  reader.onload = (_event) => { 
    this.previewUrl = reader.result; 
    this.previewUrlE = reader.result;
  }
}

resetHighlight(){
  let elem = document.getElementsByClassName("form-c");
  //elem.style = "color:red; border: 1px solid red";
  jQuery('.form-c').css('border','');

}

changeStatus(i,e){
  console.log(i);
  let status = (e)? false : true;
  console.log(status);
  this.categoryService.chageMenuStatus(i,{status});

}
showHighlight(e){
  let elem: HTMLElement = document.getElementById(e);
  elem.setAttribute("style", "border: 1px solid red;");
}

editForm(j,i){
  let editData =  this.menus[i];
  console.log('editData',editData);
  this.categoryIdE  = editData.categoryId._id;
  this.itemNameE  = editData.name;
  this.shortDescE = editData.shortDesc;
  this.priceE = editData.price;
  this.longDescE = editData.longDesc;
  this.imageE = editData.image;
  this.editId = editData._id;
  this.previewUrlE = this.imgageUrl+editData.image;
}

variation(i){
  this.variationId = i;
  //this.variantsArray.push({});
}

addMoreVariant(){
  
  let obj = {
    name : "asd",
    type : "dasd"
  };

 // this.variantsArray.push(obj);
}

removeImg(){
  this.previewUrlE = null;
}

variantTypeSel(i){
 this.vType = i;
}

remove(id){
  this.categoryService.deleteMenu(id)
  .subscribe((res) => {
    if (res['success']) {
      this.menus = this.menus.filter((menu) => menu['_id'] !== id)
      this.notifyService.showSuccess('Successfully Deleted', 'Success')
    } else {
      this.notifyService.showWarning('Something went wrong', 'Error');
    }
  },
  (err) => {
    const errObj = err.error.error;
    this.notifyService.showWarning(errObj, 'Error');
  })


}

onSubmit() {
  console.log('this.fileData',this.fileData);

  this.resetHighlight();
  if(this.categoryId == null){
    this.notifyService.showWarning("category required", "Error");
    this.showHighlight('categoryId');
    return false;
  }
  if(this.fileData == null){
    this.notifyService.showWarning("Image required", "Error");
    return false;
  }
  if(this.itemName == null){
    this.notifyService.showWarning("item required", "Error");
    this.showHighlight('itemName');
    return false;
  }
  if(this.shortDesc == null){
    this.notifyService.showWarning("Short Desc required", "Error");
    this.showHighlight('shortDesc');
    return false;
  }
  if(this.price == "" || !Number(this.price)){
    this.notifyService.showWarning("Price required", "Error");
    this.showHighlight('price');
    return false;
  }
  const formData = new FormData();
    formData.append('file', this.fileData);
    formData.append('categoryId',this.categoryId);
    formData.append('name', this.itemName);
    formData.append('shortDesc', this.shortDesc);
    formData.append('price', this.price);
    formData.append('longDesc', this.longDesc);

    this.categoryService.createMenu(formData)
    .subscribe(res => {
      console.log(res);
      this.notifyService.showSuccess("Added successfully.","Success")
      this.categoryService.getMenu();
      jQuery('.close').trigger('click');
      this.fileData = null;
      this.categoryId = null;
      this.itemName = null;
      this.shortDesc = null;
      this.price = null;
    //  this.uploadedFilePath = res.data.filePath;

    })

}

onSubmitEdit() {
  console.log('this.fileData',this.fileData);

  this.resetHighlight();
  if(this.categoryIdE == null){
    this.notifyService.showWarning("category required", "Error");
    this.showHighlight('categoryIdE');
    return false;
  }
  if(this.itemNameE == null){
    this.notifyService.showWarning("item required", "Error");
    this.showHighlight('itemNameE');
    return false;
  }
  if(this.shortDescE == null){
    this.notifyService.showWarning("Short Desc required", "Error");
    this.showHighlight('shortDescE');
    return false;
  }
  if(this.priceE == "" || !Number(this.priceE)){
    this.notifyService.showWarning("Price required", "Error");
    this.showHighlight('priceE');
    return false;
  }
  const formData = new FormData();
    formData.append('file', this.fileData);
    formData.append('categoryId',this.categoryIdE);
    formData.append('name', this.itemNameE);
    formData.append('shortDesc', this.shortDescE);
    formData.append('price', this.priceE);
    formData.append('longDesc', this.longDescE);
    formData.append('image', this.imageE);

    this.categoryService.editMenu(formData,this.editId)
    .subscribe(res => {
      this.notifyService.showSuccess("Updated successfully.","Success")
      console.log(res);
     this.categoryService.getMenu();
     jQuery('.close').trigger('click');
     this.fileData = null;
     this.categoryIdE = null;
     this.itemNameE = null;
     this.shortDescE = null;
     this.priceE = null;

    })

}

quantities() : FormArray {
  return this.productForm.get("quantities") as FormArray
}
 
newQuantity(): FormGroup {
  return this.fb.group({
    name: '',
    price: '',
  })
}
 
addQuantity() {
  this.quantities().push(this.newQuantity());
}
 
removeQuantity(i:number) {
  this.quantities().removeAt(i);
}
 
onSubmits() {
  console.log(this.productForm.value.quantities);
  this.resetHighlight();
  if(this.vName == null){
    this.notifyService.showWarning("name required", "Error");
    this.showHighlight('vName');
    return false;
  }
  if(this.vType == null){
    this.notifyService.showWarning("please select type", "Error");
    this.showHighlight('vType');
    return false;
  }
  if(this.productForm.value.quantities.length == 0){
    this.notifyService.showWarning("Please add variation", "Error");
    return false;
  }
  this.variationData = {
    name : this.vName,
    type : this.vType,
    items : this.productForm.value.quantities
  };
  this.categoryService.addVariation(this.variationData,this.variationId).subscribe(resp =>{
        //console.log('r',);
        if(resp['success']){
          jQuery('.close').trigger('click');
          this.notifyService.showSuccess("Added successfully.","Success")
          this.variationData = [];
          this.productForm.value.quantities = [];
 
        }
  });
  

}

}
