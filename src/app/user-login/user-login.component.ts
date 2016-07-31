import { Component, OnInit, Output,Input, EventEmitter } from '@angular/core';
import {User} from '../user';
import { AngularFire } from 'angularfire2';
import {LoginService} from '../login-service.service';
import {postList} from '../post-list/post-list.component';
@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: 'user-login.component.html',
  providers: [LoginService],
  directives:[postList]
 // styleUrls: ['app.component.css']
})
export class UserLogin implements OnInit {
  @Output() onUserLoggedIn = new EventEmitter<any>();
  @Input() currentUser :User;
  public user: User;
  
  constructor(private af: AngularFire, private lg: LoginService) {
 
  }

  ngOnInit() {
    this.initUser();
    this.af.auth.subscribe( (user) => {
      if (user) {
        this.initUser();
        this.onUserLoggedIn.next(user);
      }
    });
  }
  
  initUser() {
    this.user = {
      name: '',
      email: '',
      password: '',
      authed:false
    }  
  }
  
  login() {
   
    this.lg.login({ email: this.user.email, password: this.user.password }).subscribe(logindata=>{     
    });
  }
  

}