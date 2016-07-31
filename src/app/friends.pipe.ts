import { Pipe, PipeTransform } from '@angular/core';
import {User} from './user';
@Pipe({
  name: 'friends'
})
export class FriendsPipe implements PipeTransform {

  transform(value,query,currentUser) {
    if (value == null || value==undefined) {
      return null;
    }
    return value.filter((user) => {
      if(query=='*')
      return user.name.toLowerCase()!=currentUser.name.toLowerCase();
      else
       return user.name.toLowerCase().startsWith(query.toLowerCase()) && user.name.toLowerCase()!=currentUser.name.toLowerCase() ;
    });
  }

}
