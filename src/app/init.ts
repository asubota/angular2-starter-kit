/// <reference path="../../typings/angular2/angular2.d.ts" />

import {Component, View, bootstrap} from 'angular2/angular2';

@Component({
  selector: 'app'
})

@View({
  templateUrl: 'app/init.html'
})

class App {
  constructor() {
    console.log('%c I\'m alive !!1', 'color: #ccc; font-size: 16px;');
  }
}

bootstrap(App);
