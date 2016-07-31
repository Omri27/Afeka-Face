import { Injectable } from '@angular/core';
import { AngularFire, FirebaseAuth } from 'angularfire2';

import { FirebaseObjectObservable, FirebaseListObservable, AuthProviders, AuthMethods, FirebaseAuthState } from 'angularfire2';
import {Observable} from "rxjs/Observable";


@Injectable()
export class LoginService {
    private userdb: FirebaseListObservable<any[]>
    public authState: FirebaseAuthState = null;
    
    constructor(private af: AngularFire, private auth: FirebaseAuth) {
        this.userdb = this.af.database.list('timeline/users');
        this.auth.subscribe((state: FirebaseAuthState) => {
            this.authState = state;
        });
    }
getUserId()
  {
    return this.authState.uid;
     
  }
  isLogged(){
      return this.authState!=null;
  }
    // signUp(email:string, password:string, name:string, uid: string):void {

    // this.af.auth.createUser({ email: email, password: password });
    // this.userdb.push({uid,name,email,password,});
    registerUser(credentials: any) {
        return Observable.create(observer => {
            this.af.auth.createUser(credentials).then(authData => {
                credentials.created = true;
                observer.next(credentials);
            }).catch(error => {
                observer.error(error);
            });
        });
        //}
    }

    login(credentials) {
        return Observable.create(observer => {
            this.af.auth.login(credentials, {
                provider: AuthProviders.Password,
                method: AuthMethods.Password
            }).then((authData) => {
                observer.next(authData);
            }).catch((error) => {
                observer.error(error);
            });
        });
    }
 
    getUser() {
        
        //this.af.database.object(`timeline/users/${this.getUserId()}`);
        return this.af.database.object(`timeline/users/${this.getUserId()}`);
    }
    getUsernew(user:FirebaseAuthState) {
        //this.auth.getAuth().uid;
        //this.af.database.object(`timeline/users/${user.uid}`);
        return this.af.database.object(`timeline/users/${user.uid}`);
    }
    logOut() {
        
        //console.log(user);
        this.af.auth.logout();

    }
}
