import { Component, OnInit, ViewChild } from '@angular/core';

import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { User } from '../../_models/User';
import { AlertifyService } from '../../_services/alertify.service';
import { NgForm } from '../../../../node_modules/@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  user: User;
  @ViewChild('editForm')
  editFrom: NgForm;

  constructor(
    private route: ActivatedRoute,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
  }

  updateUser() {
    console.log(this.user);
    this.alertify.success('Profile updated successfully');
    this.editFrom.reset(this.user);
  }
}
