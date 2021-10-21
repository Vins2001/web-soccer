import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ScoringsComponent } from './scorings/scorings.component';
import { StandingsComponent } from './standings/standings.component';

const routes: Routes = [
  {path:'scorings',component:ScoringsComponent},
  {path:'standings',component:StandingsComponent},
  {path:'admin',component:AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
