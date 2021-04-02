import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSortModule} from '@angular/material/sort';
import {MatDatepickerModule} from '@angular/material/datepicker';
//import {MatNativeDateModule} from '@angular/material';
/*import {
  //MatInputModule,
 // MatCardModule,
  //MatButtonModule,
  //MatToolbarModule,
  //MatExpansionModule,
  //MatProgressSpinnerModule,
  //MatSelectModule,
  //MatPaginatorModule,
  //MatDialogModule,
  //MatSortModule,
 // MatNativeDateModule,
 // MatDatepickerModule  
} from "@angular/material";*/
 
import {ReactiveFormsModule, FormsModule } from '@angular/forms';

//import { OwlModule } from 'ngx-owl-carousel'; 
import { HeaderComponent } from './components/header/header.component';
import { BodyComponent } from './components/body/body.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { PlaygroundsComponent } from './components/playgrounds/playgrounds.component';
import { PlaygroundsDetailsComponent } from './components/playgrounds-details/playgrounds-details.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { PlayerLoginComponent } from './components/player-login/player-login.component';
import { PlayerRegisterComponent } from './components/player-register/player-register.component';
import { AdminRegisterComponent } from './components/admin-register/admin-register.component';
import { AuthInterceptor } from './components/auth-interceptor';
import {PlayerTokenInterceptorService} from '../app/components/services/auth/intercepter/player-token-interceptor.service'
import { PlaygroundCreateComponent } from './components/playground-create/playground-create.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { EditComponent } from './components/edit/edit.component';
import { DeleteComponent } from './components/delete/delete.component';
import { BookingComponent } from './components/booking/booking.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component'
import { PlayerService } from './components/services/player/player.service';
import { ErrorComponent } from './components/error/error.component';
import { ErrorInterceptor } from './error-interceptor';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
//import { AgmCoreModule,MarkerManager,GoogleMapsAPIWrapper } from '@agm/core';
import { RestPsssComponent } from './components/rest-psss/rest-psss.component';
import { RemoveplayerbookingComponent } from './components/removeplayerbooking/removeplayerbooking.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    HomeComponent,
    PlaygroundsComponent,
    PlaygroundsDetailsComponent,
    AdminLoginComponent,
    PlayerLoginComponent,
    PlayerRegisterComponent,
    AdminRegisterComponent,
    PlaygroundCreateComponent,
    AdminDashboardComponent,
    EditComponent,
    DeleteComponent,
    BookingComponent,
    PagenotfoundComponent,
    ErrorComponent,
    RestPsssComponent,
    RemoveplayerbookingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //OwlModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSortModule,
    MatDatepickerModule,
   // MatNativeDateModule,
    Ng2SearchPipeModule,
    /*AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD6ZHI3CpBR9-FV6o3zDhgvbOIunKtXeZU'
    })*/
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: PlayerTokenInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    PlayerService,
    //MarkerManager,
    //GoogleMapsAPIWrapper
     , Title
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule { }
