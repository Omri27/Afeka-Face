import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {LoginService} from './login-service.service'; 
import {User} from './user';
declare var firebase;
@Injectable()
export class StorageService {
private storage;
private storageRef;
private imagesRef;
private uploadTask;
  constructor(private LoginService:LoginService) {
    this.storage=firebase.storage();
    this.storageRef=this.storage.ref();
  }
    uploadPostPics(photos,userId) {
        return new Observable(observer => {
            photos.forEach(element => {
                var uploadTask = this.storageRef.child(`users/${userId}/${element.name}`).put(element);

                // Register three observers:
                // 1. 'state_changed' observer, called any time the state changes
                // 2. Error observer, called on failure
                // 3. Completion observer, called on successful completion
                uploadTask.on('state_changed', function (snapshot) {
                    // Observe state change events such as progress, pause, and resume
                    // See below for more detail
                }, function (error) {
                    // Handle unsuccessful uploads
                    observer.error(error);
                }, function () {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    var downloadURL = uploadTask.snapshot.downloadURL;
                    observer.next(downloadURL);
                });
            });
        });
}
}
