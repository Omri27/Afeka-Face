// feed.component.ts
import {Component, OnInit,Input,NgZone} from '@angular/core';  
import {Post} from '../post';  
import {User} from '../user';
import {PostService} from '../post.service';  
import {LoginService} from '../login-service.service'; 
import {CommentComponent} from '../comment/comment.component';  
import {Subscription} from 'rxjs/Subscription';
import { FirebaseObjectObservable,FirebaseListObservable,AngularFire } from 'angularfire2';
import {StorageService} from '../storage.service'; 
import {LikeComponent} from '../like/like.component';  

@Component({
  moduleId: module.id,
  selector: 'feed',
  templateUrl:'post-list.component.html',
  providers: [PostService,LoginService,StorageService],
  directives:[CommentComponent,LikeComponent]
})
export class postList implements  OnInit {  
  private currentUser :FirebaseObjectObservable<User>;
  public newPost: any = {};
  private count:any;
  private currentUserUid :string;
  public posts: FirebaseListObservable<any>;
  private photos:any;
  private urls;
  pics:any;
  constructor(
    private postService: PostService, private loginService:LoginService,private StorageService:StorageService,private  af: AngularFire
  ) {
    this.posts= this.postService.getAll();
    this.currentUser=this.loginService.getUser();
   }
  ngOnInit() {
    this.posts= this.postService.getAll();
     this.currentUserUid= this.loginService.authState.uid;  

    this.loginService.getUser().subscribe(user=>{this.newPost.title=user.name});
    this.pics = [];
     this.count=0;
     
  }

changePost(post:Post,postid:string){
  if(!post.isPublic)
  this.postService.changePost(true,post,postid);
  else
  this.postService.changePost(false,post,postid);
}
handleMultipleUpload(data:any){
  this.count= data.srcElement.files.length;
  for(var i=0;i<this.count;i++){
    this.pics.push(data.srcElement.files[i]);
console.log(data.srcElement.files[i])
  }

  }
  createPost() {
    this.urls=[];
    this.loginService.getUser().subscribe(user=>{this.newPost.title=user.name});
    if(this.count>0){
   this.StorageService.uploadPostPics(this.pics,this.currentUserUid).subscribe(Url=>{
        this.newPost.photos=Url;
        this.urls.push(Url);
       
      if(this.urls.length==this.count){
         this.noPicPOst();
      }
    });
    }else
    this.noPicPOst();
  }
  noPicPOst(){
    console.log(this.newPost.title)
    if(!this.newPost.isPublic)
    this.newPost.isPublic=false;
    this.newPost.userId= this.loginService.getUserId();
    this.postService.create(this.newPost.userId,this.newPost.title, this.newPost.description,this.newPost.isPublic,this.urls);
     
    this.newPost = {};
  }
  deletePost(postId:string){
    this.postService.deletePost(postId);
  }
}