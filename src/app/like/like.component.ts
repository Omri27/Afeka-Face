import { Component, OnInit,Input } from '@angular/core';
import { FirebaseObjectObservable, FirebaseListObservable, AuthProviders, AuthMethods, FirebaseAuthState } from 'angularfire2';
import {LoginService} from '../login-service.service'; 
import {User} from '../user';
import {LikeService} from '../like.service'; 
@Component({
  moduleId: module.id,
  selector: 'like',
  templateUrl: 'like.component.html',
  styleUrls: ['like.component.css'],
  providers:[LoginService,LikeService],
})
export class LikeComponent implements OnInit {
@Input() postid :string;
private islike:Boolean;
private likes: FirebaseListObservable<any>;
private currentUser :FirebaseObjectObservable<User>;
  constructor(private LikeService:LikeService, private LoginService:LoginService) {  }

  ngOnInit() {
    this.islike=this.LikeService.isLike(this.postid);
  }
  changeLike(){
    if(!this.islike)
      this.addLike();
      else
      this.removeLike();

  }
  addLike(){
    this.LikeService.addLike(this.postid)
      this.islike=true;
  }
  removeLike(){
  this.LikeService.removeLike(this.postid);
      this.islike=false;

  }
}
