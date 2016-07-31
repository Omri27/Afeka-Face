import { Component, OnInit } from '@angular/core';
import {LoginService} from '../login-service.service'; 
import {User} from '../user';
import {FriendsService} from '../friends.service'; 
import {FriendsPipe} from '../friends.pipe'; 
import { FirebaseObjectObservable, FirebaseListObservable, AuthProviders, AuthMethods, FirebaseAuthState } from 'angularfire2';
@Component({
  moduleId: module.id,
  selector: 'friends',
  templateUrl: 'friends.component.html',
  styleUrls: ['friends.component.css'],
  providers:[LoginService,FriendsService],
  pipes:[FriendsPipe]
})
export class FriendsComponent implements OnInit {
  searchText:string;
  currentUser:FirebaseObjectObservable<User>;
  private user:User
private friendsdb: FirebaseListObservable<User[]>
  constructor(private FriendsService: FriendsService,private LoginService: LoginService) {
    
  }
addFriend(friendid:string){
  this.FriendsService.addFriend(friendid);
}
  ngOnInit() {
    //this.currentUser=this.LoginService.getUser();
    this.LoginService.getUser().subscribe(user=>{this.user=user});
    this.friendsdb=this.FriendsService.getAll();
    this.searchText = "";
  }

}
