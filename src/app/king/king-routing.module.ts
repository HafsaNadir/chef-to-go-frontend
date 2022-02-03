import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


import {KingComponent} from './king.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

const routes:Routes=[
    {path:'',component:KingComponent}
]


@NgModule({
    imports:[RouterModule.forChild(routes),Ng2SearchPipeModule ],
    exports:[RouterModule]
})

export class KingRoutingModule{}