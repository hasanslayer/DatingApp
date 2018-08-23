import { Routes } from '@angular/router';

import { AuthGuard } from './_guard/auth.guard';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { PreventUnsavedChanges } from './_guard/prevent-unsaved-changes.guard';
import { ListsResolver } from './_resolvers/lists.resolver';

export const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: '', // we use a dummy route to make the protection at higher level and protect his children routes
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'members',
        component: MemberListComponent,
        resolve: { users: MemberListResolver }
      },
      {
        path: 'members/:id',
        component: MemberDetailComponent,
        resolve: { user: MemberDetailResolver }
      },
      {
        path: 'member/edit',
        component: MemberEditComponent,
        resolve: { user: MemberEditResolver },
        canDeactivate: [PreventUnsavedChanges]
      },
      { path: 'messages', component: MessagesComponent },
      {
        path: 'lists',
        component: ListsComponent,
        resolve: { users: ListsResolver }
      }
    ]
  },

  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
