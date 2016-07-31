import {Observable} from 'rxjs/Observable';  
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import {Post} from './post';  
import { FirebaseObjectObservable,FirebaseListObservable,AngularFire } from 'angularfire2';

  @Injectable()
export class PostService {  
  private db: FirebaseListObservable<any[]>
  sizeSubject: Subject<any>;
  constructor(private af: AngularFire) {
    this.db = this.af.database.list('timeline/posts');

  }

  create(userId:string,title: string, description: string,isPublic:boolean,photos:any): void {
    this.db.push({userId,
      title,
      description,isPublic,photos   
    });
    
  }

  getAll(): FirebaseListObservable<any> {
this.sizeSubject = new Subject();
   return this.af.database.list('timeline/posts',
   { query:  {
        limitToLast: 8,
        
      }
   });
  }
  changePost(isPublicChange:Boolean,post:Post,postId:string){
 this.af.database.object(`timeline/posts/${postId}`).update({isPublic:isPublicChange});
  }
  deletePost(postId:string){
  let data= this.af.database.list(`timeline/posts/${postId}`);
  data.remove();
  }
}
