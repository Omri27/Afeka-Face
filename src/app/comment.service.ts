import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Post} from './post';
import { Subject } from 'rxjs/Subject';
import { FirebaseObjectObservable, FirebaseListObservable, AngularFire } from 'angularfire2';
import {comment} from './comment';
@Injectable()
export class CommentService {
  sizeSubject: Subject<any>;
  private db: FirebaseListObservable<any[]>
  constructor(private af: AngularFire) {
    this.db = this.af.database.list('timeline/posts');
  }
  create(post: string, title:string,message: string): void {
  
    this.af.database.list(`timeline/posts/${post}/comments`).push({
     title,message,
    });
  }
  getAll(postid: string): FirebaseListObservable<any> {
    return this.af.database.list(`timeline/posts/${postid}/comments`);
  }
  filterBy(size: string) {
    this.sizeSubject.next(size);
  }
}
