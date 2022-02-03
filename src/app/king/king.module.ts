import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";

import {KingRoutingModule} from './king-routing.module';
import {SliderModule} from '../slider/slider.module';
import { KingComponent } from "./king.component";
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
    imports:[
        CommonModule,
        KingRoutingModule,
        SliderModule,
        FormsModule,
        Ng2SearchPipeModule
    ],
    declarations:[KingComponent]

})

export class KingModule{}