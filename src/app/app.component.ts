import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {User} from './user';
import { AngularFire,FirebaseObjectObservable ,FirebaseAuth} from 'angularfire2';
import {UserLogin} from './user-login/user-login.component';
import {postList} from './post-list/post-list.component';
import {LoginService} from './login-service.service';
import {FriendsComponent} from './friends/friends.component';
import {signUpComponent} from './signUp/signUp.component';
@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
   directives: [UserLogin,postList,FriendsComponent,signUpComponent],
   providers:[LoginService]
})
export class AppComponent {
  
  private title:string= "Afeka-Face";
  private loggedIn: boolean = false;
  private user: User;
  private currentUser:FirebaseObjectObservable<any>;
    constructor(private af: AngularFire, private lg: LoginService,private auth: FirebaseAuth) {
  }
   onUserLoggedIn(user) {
     this.loggedIn = true;
    this.user = user;
    this.currentUser=this.lg.getUsernew(user);
  }
  logOut(){
this.lg.logOut();
 this.loggedIn = false;
  }
}