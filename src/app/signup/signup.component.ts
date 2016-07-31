import { Component, OnInit, Output,Input, EventEmitter } from '@angular/core';
import {User} from '../user';
import { AngularFire } from 'angularfire2';
import {LoginService} from '../login-service.service';
import {postList} from '../post-list/post-list.component';
@Component({
  moduleId: module.id,
  selector: 'signUp',
  templateUrl: 'signUp.component.html',
  providers: [LoginService],
  directives:[postList]
 // styleUrls: ['app.component.css']
})
export class signUpComponent implements OnInit {
  // @Output() onUserLoggedIn = new EventEmitter<any>();
  @Input() currentUser :User;
  public user: User;
  
  constructor(private af: AngularFire, private lg: LoginService) {
 
  }

  ngOnInit() {
    this.initUser();
    this.af.auth.subscribe( (user) => {
      if (user) {
        this.initUser();
        // this.onUserLoggedIn.next(user);
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
  
  signUp() {
    //this.lg.signUp(this.user.email,this.user.password,this.user.name,this.user.uid)
  // console.log({ name: this.user.name, email: this.user.email })
    var email = this.user.email;
    var name= this.user.name;
    var password = this.user.password;
    this.lg.registerUser({ email: email, password: password }).subscribe(registerData => {
       
      this.lg.login(registerData).subscribe(loginData => {

        this.af.database.object(`timeline/users/${this.lg.getUserId()}`).set({ name: name, email: email });
      }, loginError => {
        // setTimeout(() => {

        //   this.error = loginError;
        // }, 1000);
      });
      //this.router.navigate(['/user', this.auth.getUserId()]);
    }, registerError => {
      // setTimeout(() => {
      //   this.error = registerError;
      // }, 1000);
    });

 // }
  }

}