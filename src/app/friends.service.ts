import { Injectable } from '@angular/core';
import { AngularFire, FirebaseAuth } from 'angularfire2';
import {LoginService} from './login-service.service'; 
import { FirebaseObjectObservable, FirebaseListObservable, AuthProviders, AuthMethods, FirebaseAuthState } from 'angularfire2';
@Injectable()
export class FriendsService {
  userid:string;
private userdb: FirebaseListObservable<any[]>
  constructor(private LoginService: LoginService,private af: AngularFire) {
    this.userdb = this.af.database.list('timeline/users');
  }
addFriend(friendId:string){
   this.userid=this.LoginService.getUserId();
   this.af.database.object(`timeline/users/${this.userid}/friends/${friendId}`).set(true);
}
getAll(): FirebaseListObservable<any> {
    return this.af.database.list(`timeline/users`);
  }
}
