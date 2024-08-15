import { AdminsListComponent } from './admins-list/admins-list.component';
import { UsersListComponent } from './users-list/users-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { MyRequestsComponent } from './my-requests/my-requests.component';
import { MyServersComponent } from './my-servers/my-servers.component';
import { NewRequestComponent } from './new-request/new-request.component';
import { ServerDetailsComponent } from './server-details/server-details.component';
import { RequestDetailsComponent } from './request-details/request-details.component';
import { AdminDetailsComponent } from './admin-details/admin-details.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { AnsweredRequestsComponent } from './answered-requests/answered-requests.component';

const routes: Routes = [
  { path: '', redirectTo: '/signup', pathMatch: 'full' },
  { path:"login", component: LoginComponent},
  { path:"signup", component: SignupComponent},
  { path: 'my-requests', component: MyRequestsComponent },
  { path: 'my-servers', component: MyServersComponent },
  { path: 'new-request', component: NewRequestComponent },
  { path: 'server-details', component: ServerDetailsComponent },
  { path: 'request-details/:id', component: RequestDetailsComponent },
  { path: 'users-list', component: UsersListComponent },
  { path: 'admins-list', component: AdminsListComponent },
  { path: 'user-details', component: AdminDetailsComponent },
  { path: 'create-user', component: CreateUserComponent },
  { path: 'answered-requests', component: AnsweredRequestsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
