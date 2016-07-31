import {comment} from './comment';  
export class Post {  
  constructor(
    public userId: string,
    public title: string,
    public description: string,
    public commentList:Array<comment>,
    public isPublic: Boolean,
    public photos,
    public likes
  ) { }
};