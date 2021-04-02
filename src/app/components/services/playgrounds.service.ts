import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Subject, Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { Playground } from '../playground.model';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class PlaygroundsService {
  private playgrounds:Playground[] = [];
  private playgroundsUpdated = new Subject<{playgrounds:Playground[], playgroundCount: number }>();


  constructor(private http: HttpClient, private router: Router) { }

  getPlaygrounds(playgroundPerPage: number, currentPage: number,sortingOrder:number){
    const queryParams = `?pagesize=${playgroundPerPage}&page=${currentPage}&sortingOrder=${sortingOrder}`;
    this.http
    .get<{ message: string; playgrounds: any;
      maxPlaygrounds: number  }>(
      "http://localhost:3000/playgrounds/getPlaygrounds" + queryParams
    )
    .pipe(
      map((playgroundData) => {
      return{ 
        playgrounds: playgroundData.playgrounds.map(playground => {
          return {
          id: playground._id, 
          name: playground.name,
          description: playground.description,
          owner:playground.owner,
          price:playground.price,
          phone:playground.phone,
          pmHours:playground.pmHours,
          amHours:playground.amHours,
          location:playground.location,
          imagePath:playground.imagePath,
          ownerId:playground.ownerId
 
         };
       }),
       maxPlaygrounds: playgroundData.maxPlaygrounds 
    } 
    }))
    .subscribe(comingplaygrounds => {
      this.playgrounds = comingplaygrounds.playgrounds;
      this.playgroundsUpdated.next({
        playgrounds:[...this.playgrounds],
        playgroundCount:comingplaygrounds.maxPlaygrounds
      });
      
    });
  }

  getPlaygroundUpdateListener() {
    return this.playgroundsUpdated.asObservable();
  }
  

  

  getDetails(id):Observable<any>{
    return this.http.get<any>('http://localhost:3000/playgrounds/'+id);
  }

  getAvaliableHours(id,selectedDate):Observable<any>{
    const queryParams = `?playgroundId=${id}&date=${selectedDate}`

    return this.http.get<any>('http://localhost:3000/bookings/check/'+queryParams,{
      observe :'body',   
      params : new HttpParams().append('playerToken',localStorage.getItem('playerToken'))});
  }

  getMapLocation(location):Observable<any>{
    const queryParams = `?location=${location}`

    return this.http.get<any>('http://localhost:3000/playgrounds/mapCity/'+queryParams);
  }
  

    
addPlayground(
    name:string,
    description:string,
    owner:string,
    price:number,
    phone:string,
    pmHours:[],
    amHours:[],
    location:string,
    image:File){ 
    const playgroundData=new FormData();
    playgroundData.append('name',name);
    playgroundData.append('description',description); 
    playgroundData.append('owner',owner); 
    playgroundData.append('price',JSON.stringify(price)); 
    playgroundData.append('phone',phone);
    playgroundData.append('pmHours',JSON.stringify(pmHours));
    playgroundData.append('amHours',JSON.stringify(amHours));
    playgroundData.append('location',location);
    playgroundData.append('image',image,name);  
    this.http
    .post<{ message: string, playground:Playground }>
    ("http://localhost:3000/playgrounds/postPlay", playgroundData)
    .subscribe(responseData =>{
      this.router.navigate(["/playgrounds"]); 
    })  
  }

  updatePlayground(
    id: string,
    name:string,
    description:string,
    owner:string,
    price:number,
    phone:string,
    pmHours:[],
    amHours:[],
    location:string,
    image:any){
      let playgroundData;
      console.log(typeof(image))
      if (typeof(image) === "object") {
         playgroundData=new FormData();
        playgroundData.append('id',id); 
        playgroundData.append('name',name);
        playgroundData.append('description',description); 
        playgroundData.append('owner',owner); 
        playgroundData.append('price',JSON.stringify(price)); 
        playgroundData.append('phone',phone);
        playgroundData.append('pmHours',JSON.stringify(pmHours));
        playgroundData.append('amHours',JSON.stringify(amHours));
        playgroundData.append('location',location);
        playgroundData.append('image',image,name); 
      }
       else{
       playgroundData={
          id:id,
          name:name,
          description:description,
          owner:owner,
          price:price,
          phone:phone,
          pmHours:pmHours,
          amHours:amHours,
          location:location,
          imagePath:image
        }
      }
      this.http
      .put("http://localhost:3000/playgrounds/" + id, playgroundData)
      .subscribe(response => {
        this.router.navigate(["/edit"]);
      });
       
  }

}

  
 
