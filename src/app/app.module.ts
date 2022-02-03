import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import {HttpModule} from '@angular/http';
import { AppComponent } from "./app.component";
import {HomeComponent} from './home/home.component';
//import {SliderComponent} from './slider/slider.component';
import { NgxUiLoaderModule, NgxUiLoaderConfig, SPINNER, 
  POSITION,PB_DIRECTION, NgxUiLoaderRouterModule, NgxUiLoaderHttpModule } from "ngx-ui-loader";


import { AppRoutingModule } from ".//app-routing.module";
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SignupResturantComponent } from './signup-resturant/signup-resturant.component';
import { HomeBannerComponent } from './home-banner/home-banner.component';
import { RestruantDetailComponent } from './restruant-detail/restruant-detail.component';
import { RestruantDetailUnavailableComponent } from './restruant-detail-unavailable/restruant-detail-unavailable.component';
import { SliderModule } from "./slider/slider.module";
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { TableComponent } from './table/table.component';
import { BillingComponent } from './billing/billing.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrdersComponent } from './orders/orders.component';
import { ProfileComponent } from './profile/profile.component';
import { VendorLoginComponent } from './vendor-login/vendor-login.component';
import { RestaurantSettingsComponent } from './restaurant-settings/restaurant-settings.component';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import { RecieveOrdersComponent } from './recieve-orders/recieve-orders.component';
import { ManageMenuComponent } from './manage-menu/manage-menu.component';
import { CreateMenuComponent } from './create-menu/create-menu.component';
import { ProfileCoverComponent } from './profile-cover/profile-cover.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MarkLocationComponent } from './mark-location/mark-location.component';
import { AgmCoreModule } from '@agm/core';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsConditionComponent } from './terms-condition/terms-condition.component';
import { AboutUsComponent } from './about-us/about-us.component';

import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  FacebookLoginProvider,
} from 'angularx-social-login';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { AccountVerificationComponent } from './account-verification/account-verification.component';
import { EmailActivationComponent } from './email-activation/email-activation.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ForgotMessageComponent } from './forgot-message/forgot-message.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { MenuDiscountComponent } from './menu-discount/menu-discount.component';
import { NotificationComponent } from './notification/notification.component';
const config: SocketIoConfig = { url: 'https://cheftogo.net/api', options: {} };
import {  ReactiveFormsModule } from '@angular/forms';
import { VendorOrdersComponent } from './vendor-orders/vendor-orders.component';

// const ngxUiLoaderConfig: NgxUiLoaderConfig = {
//   bgsColor: 'rgba(60,40,10,0.8)',
//   bgsOpacity: 1,
//   bgsPosition: POSITION.bottomRight,
//   bgsSize: 40,
//   bgsType: SPINNER.threeStrings,
//   fgsColor: 'rgba(60,40,10,0.8)',
//   fgsPosition: POSITION.centerCenter
//   };

const ngxUiLoaderConfig: NgxUiLoaderConfig =
{
  // "bgsColor": "orange",
  // "bgsOpacity": 0.5,
  // "bgsPosition": "bottom-right",
  // "bgsSize": 60,
  // "bgsType": "square-loader",
  "blur": 5,
  "delay": 0,
  "fastFadeOut": true,
  "fgsColor": "orange",
  "fgsPosition": "center-center",
  "fgsSize": 60,
  "fgsType": "square-loader",
  "overlayBorderRadius": "0",
  "overlayColor": "rgba(60,40,10,0.8)",
  "pbColor": "orange"
}

@NgModule({
  declarations: [
    AppComponent,HomeComponent, HeaderComponent, 
    FooterComponent, LoginComponent, 
    SignupComponent, SignupResturantComponent, 
    HomeBannerComponent, RestruantDetailComponent, RestruantDetailUnavailableComponent, TableComponent, BillingComponent, OrderDetailsComponent, OrdersComponent, ProfileComponent, VendorLoginComponent, RestaurantSettingsComponent, ManageOrdersComponent, RecieveOrdersComponent, ManageMenuComponent, CreateMenuComponent, ProfileCoverComponent, MarkLocationComponent, PrivacyPolicyComponent, TermsConditionComponent, AboutUsComponent, AccountVerificationComponent, EmailActivationComponent, ForgotPasswordComponent, ForgotMessageComponent, ResetPasswordComponent, MenuDiscountComponent, NotificationComponent, VendorOrdersComponent
  ],
  imports: [GooglePlaceModule,BrowserModule, AppRoutingModule,FormsModule,HttpModule,SliderModule, BrowserAnimationsModule,HttpClientModule,
    ToastrModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBS4EJ2n_d0w2zTROnHt-3VKZCz9U0_gwM',
      libraries: ['places']
    }),    
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    SocialLoginModule,
    SocketIoModule.forRoot(config),
     ReactiveFormsModule,
     NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
     NgxUiLoaderRouterModule,
     NgxUiLoaderHttpModule,
  ],
  providers: [   {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider('308790540150300'),
        },
      ],
    } as SocialAuthServiceConfig,
  }],
  bootstrap: [AppComponent]
})
export class AppModule {}
