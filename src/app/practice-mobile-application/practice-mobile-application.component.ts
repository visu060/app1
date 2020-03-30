import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormArray, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';



class Brand{
  id;
  name;
}
class Features{
  constructor(public id, public name)
  {

  }
 
}
class Color{
  id;
  name;
}
@Component({
  selector: 'app-Practice-Mobile-Application',
  template: 
  `
  
  <form [formGroup] = "myForm" (ngSubmit)="test1()">
  First Name: <input type="text" formControlName="firstName"/> <br/>
  Last  Name: <input type="text" formControlName="lastName"/> <br/>
  

  Brand:
  <label *ngFor="let b1 of brands">
     <input type="radio" formControlName="brand" value="{{b1.id}}"> {{b1.name}}
  </label>
  <br/>
  Features:
  
  <label formArrayName="features" *ngFor="let f1 of myForm.controls.features.controls; let i=index">
       <input type='checkbox' [formControlName]="i"/> {{features[i].name}} 
  </label>
  <br/>
  Color:
  <select formControlName="color">
    <option *ngFor="let color of colors" value="{{color.id}}">
      {{ color.name }}
    </option>
  </select>
  <input type="submit" value="submit"/>   
</form>
  `,
  styles: []
})
export class PracticeMobileApplicationComponent implements OnInit {
  brands  = [];
  colors = [];
  features = [];
  myForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private http: HttpClient) 
  {
    this.myForm = formBuilder.group({
      firstName: new FormControl(),
      lastName: new FormControl(),
      brand: new FormControl(),
      features: new FormArray([]),
      color: new FormControl()
    });
   
  }  
  ngOnInit() { 
    this.http.get<Brand[]>('http://localhost:9093/allBrands').subscribe(
      results =>{
        this.brands = results;
      }
    );
    this.http.get<Color[]>('http://localhost:9093/allColors').subscribe(
      results =>{
        this.colors = results;
      }
    );    
    this.http.get<Features[]>('http://localhost:9093/allFeatures').subscribe(
      results =>{
        this.features = results;
        this.populate();
      }
    );        
  }

  populate()
  {
     for(let i = 0; i < this.features.length; i++)
    {
      (this.myForm.get('features') as FormArray).push(new FormControl());
    }
  }
  
  test1()
  {
    var selectedFeaturesIds = this.myForm.value.features
    .map((v, i) => v ? this.features[i].id : null).filter(v => v !== null);

    var selectedFeaturesIdsArray = selectedFeaturesIds.toString().split(',');
    
    var featuresArray = [];
    for(var i = 0; i < selectedFeaturesIds.length; i++)
    {
      alert(selectedFeaturesIdsArray[i]);
      featuresArray.push({id: selectedFeaturesIdsArray[i]})
    }
    alert(JSON.stringify(featuresArray));
    this.myForm.value.features = featuresArray;
    this.myForm.value.brand = {id:this.myForm.value.brand};
    this.myForm.value.color = {id:this.myForm.value.color};
    var jsonStr = JSON.stringify(this.myForm.value);
    var jsonObj = JSON.parse(jsonStr);
    this.http.post('http://localhost:9093/saveMobile', jsonObj).subscribe(
      r1 =>
      {
        console.log(r1);        
      }
    )
    console.log(this.myForm);
  }
 
}

