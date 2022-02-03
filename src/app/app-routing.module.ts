import { NotificationComponent } from './notification/notification.component';
import { MenuDiscountComponent } from './menu-discount/menu-discount.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { EmailActivationComponent } from './email-activation/email-activation.component';
import { AccountVerificationComponent } from './account-verification/account-verification.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { SignupResturantComponent } from "./signup-resturant/signup-resturant.component";

import { RestruantDetailComponent } from "./restruant-detail/restruant-detail.component";
import { RestruantDetailUnavailableComponent } from "./restruant-detail-unavailable/restruant-detail-unavailable.component";

import { BillingComponent } from "./billing/billing.component";
import { OrdersComponent } from "./orders/orders.component";
import { OrderDetailsComponent } from "./order-details/order-details.component";
import { ProfileComponent } from "./profile/profile.component";
import { VendorLoginComponent } from "./vendor-login/vendor-login.component";

import { TableComponent } from "./table/table.component";
import { AuthGuard } from './core/auth/auth.guard';
import { RestaurantSettingsComponent } from "./restaurant-settings/restaurant-settings.component";

import { ProfileCoverComponent } from "./profile-cover/profile-cover.component";

import { MarkLocationComponent } from "./mark-location/mark-location.component";
import { ManageOrdersComponent } from "./manage-orders/manage-orders.component";
import { ForgotMessageComponent } from './forgot-message/forgot-message.component';

import { AboutUsComponent } from "./about-us/about-us.component";

import { VendorOrdersComponent } from "./vendor-orders/vendor-orders.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "posts",
    loadChildren: "../app/posts/posts.module#PostsModule"
  },
  {
    path: "restaurants/lat/:lat/long/:long",
   // loadChildren: "../app/king/king.module#KingModule"
	 loadChildren: () => import('../app/king/king.module').then(k => k.KingModule)

  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path : "vendor-login",
    component : VendorLoginComponent
  },
  {
    path: "view",
    component: TableComponent, canActivate: [AuthGuard]
  },
  {
    path: "signup",
    component: SignupComponent
  } ,
  {
    path: "signup-resturant",
    component: SignupResturantComponent
  },  

  {
    path: "resturant-detail/:name",
    component: RestruantDetailComponent
  }, 
  {
    path: "resturant-detail-unavailable",
    component: RestruantDetailUnavailableComponent
  },
  {
    path: "location",
    component: MarkLocationComponent
  },
  {
    path: "checkout",
    component: BillingComponent, canActivate: [AuthGuard] 
  },
  {
    path: "profile",
    component: ProfileComponent, canActivate: [AuthGuard] 
  },
  {
    path: "my-orders",
    component: OrdersComponent, canActivate: [AuthGuard] 
  },
  {
    path: "order-details",
    component: OrderDetailsComponent
  },
  {
    path : "restaurant-settings",
    component : RestaurantSettingsComponent
  },
  {
    path : "profile-cover-settings",
    component : ProfileCoverComponent
  } ,
  {
    path : "noti",
    component : ManageOrdersComponent
  },  
  {
    path : "account_verification",
    component : AccountVerificationComponent 
   },
   {
    path : "email/verification/:hash/:id",
    component : EmailActivationComponent 
   },
   {
     path: "password/reset/:hash/:id",
     component: ResetPasswordComponent
   },
   {
     path: 'forgot-password',
     component: ForgotPasswordComponent
   },
   {
     path: 'forgot-message',
     component: ForgotMessageComponent
   },
   {
    path: 'menu-discount',
    component: MenuDiscountComponent
  },
  {
        path: 'about-us',
        component: AboutUsComponent
  },
  {
        path: 'notification',
        component: NotificationComponent, canActivate: [AuthGuard] 
  },
  {
    path: 'orders',
    component: VendorOrdersComponent, canActivate: [AuthGuard] 
  },
  {
    path: 'orders/:id',
    component: VendorOrdersComponent, canActivate: [AuthGuard] 
  }


  
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
