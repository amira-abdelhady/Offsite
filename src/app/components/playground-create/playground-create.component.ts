import { Component, OnInit } from '@angular/core'; 
import { NgForm,FormGroup,FormControl, Validators } from '@angular/forms';
import { PlaygroundsService } from '../services/playgrounds.service'
import { ActivatedRoute, ParamMap } from "@angular/router";
import { mimeType } from '../mime-type.validator'
import { Playground } from '../playground.model';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-playground-create',
  templateUrl: './playground-create.component.html',
  styleUrls: ['./playground-create.component.css']
})
export class PlaygroundCreateComponent implements OnInit {
  private mode = "create";
  private playgroundId: string;
  playground:Playground;  
  selectedPmHours;
  selectedAmHours;
  selectedLocation='';
  form: FormGroup; 
  imagePreview: any; 
  avaliableList = 
  ['12-02', '02-04', '04-06', '06-08', '08-10', '10-12'];
  locations=['Qena','Cairo','Aswan','Banha','Asyut',
  'Beni Suef','Alexandria','Gizeh','Luxor','al-Mansura','Sohag','al-Minya','Ismailia'];

  
  constructor(public playgroundServ:PlaygroundsService,public route:ActivatedRoute,private titleService: Title) { }
//form:NgForm
  onAddPlayground(){
    if(this.form.invalid){
      return;
    }
    if (this.mode === "create"){
      this.playgroundServ.addPlayground( 
        this.form.value.playgroundName,
        this.form.value.description,
        this.form.value.playgroundOwner,
        this.form.value.playgroundPrice,
        this.form.value.playgroundPhone,
        this.form.value.playgroundPm,
        this.form.value.playgroundAm,
        this.form.value.playgroundLocation,
        this.form.value.image
    
        )
    }else{
       this.playgroundServ.updatePlayground(
        this.playgroundId,
        this.form.value.playgroundName,
        this.form.value.description,
        this.form.value.playgroundOwner,
        this.form.value.playgroundPrice,
        this.form.value.playgroundPhone,
        this.form.value.playgroundPm,
        this.form.value.playgroundAm,
        this.form.value.playgroundLocation,
        this.form.value.image 
       )
    }  
    this.form.reset(); 
  }
 
   


  
  async onImagePicked(event: Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.readAsDataURL(file);   
    this.imagePreview = await new Promise((resolve, reject) => {
      reader.onload = function(event) {
      resolve(reader.result)
      }
    })
 
  }
  


  ngOnInit() { 
    this.titleService.setTitle( 'Creating your football playground' );
    this.form = new FormGroup({
      playgroundName: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      }), 
      playgroundOwner: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      playgroundPrice: new FormControl(null, {
        validators: [Validators.required]
      }),
      playgroundPhone: new FormControl(null, {
        validators: [Validators.required]
      }),
      playgroundAm: new FormControl(null, {
        validators: [Validators.required]
      }),
      playgroundPm: new FormControl(null, {
        validators: [Validators.required]
      }),
      playgroundLocation: new FormControl(null, {
        validators: [Validators.required]
      }),
      description: new FormControl(null, {
        validators: [Validators.required]
      }) 

    })
    
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if (paramMap.has("playgroundId")){
        this.mode='edit';
        this.playgroundId = paramMap.get("playgroundId");
        this.playgroundServ.getDetails(this.playgroundId).subscribe(postData => {
           
          this.playground=postData;
          this.form.setValue({
            playgroundName: this.playground.name,
            image: this.playground.imagePath,
            playgroundOwner: this.playground.owner,
            playgroundPrice: this.playground.price,
            playgroundPhone: this.playground.phone,
            playgroundAm: this.playground.amHours,
            playgroundPm: this.playground.pmHours,
            playgroundLocation: this.playground.location,
            description: this.playground.description 
          });
        });
      }else{
        this.mode = "create";
        this.playgroundId = null;
      }

    })

  }

}
