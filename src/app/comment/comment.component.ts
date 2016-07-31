import { Component, OnInit,Input } from '@angular/core';
import { FirebaseObjectObservable,FirebaseListObservable,AngularFire } from 'angularfire2';
import {comment} from '../comment';  
import {LoginService} from '../login-service.service'; 
import {Post} from '../post';  
import {User} from '../user';
import {CommentService} from '../comment.service';  
@Component({
  moduleId: module.id,
  selector: 'comment',
  templateUrl: 'comment.component.html',
  styleUrls: ['comment.component.css'],
   providers: [CommentService]
})
export class CommentComponent implements OnInit {
  @Input() postid :string;
  private username;
 public newComment: any = {};
 private currentUser :FirebaseObjectObservable<User>;
  public comments: FirebaseListObservable<any>;
  constructor(private commentService: CommentService, private LoginService:LoginService) {
     
     
  }
  ngOnInit() {
    this.currentUser=this.LoginService.getUser();
    this.comments=this.commentService.getAll(this.postid);
  }
createComment(){
  this.currentUser.subscribe((user)=>{this.username=user.name});
  this.commentService.create(this.postid,this.username,this.newComment.message);
}
}
