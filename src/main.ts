import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppComponent, environment } from './app/';
import { FIREBASE_PROVIDERS, defaultFirebase } from 'angularfire2';
import { disableDeprecatedForms,provideForms } from '@angular/forms';

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [
  FIREBASE_PROVIDERS,
  // Initialize Firebase app  
  defaultFirebase({
    apiKey: "AIzaSyC_csu2TN8RMEKIGuz8J4f2RrYIf2QVDa0",
    authDomain: "afeka-face-omri.firebaseapp.com",
    databaseURL: "https://afeka-face-omri.firebaseio.com",
    storageBucket: "afeka-face-omri.appspot.com",
  }),
  disableDeprecatedForms(),
  provideForms()
]);