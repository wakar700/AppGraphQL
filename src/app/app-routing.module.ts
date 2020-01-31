import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SoftwareComponent } from './software/software.component';
import { BookingComponent } from './booking/booking.component';
import { ClientComponent } from './client/client.component';


const routes: Routes = [
  {path: 'software', component: SoftwareComponent},
  {path: 'booking', component: BookingComponent},
  {path: 'client', component: ClientComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
