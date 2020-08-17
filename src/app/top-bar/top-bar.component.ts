import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SET_LOCATION } from '../location-reducer';
import { NgForm } from '@angular/forms';
import { Subscription, interval } from 'rxjs';
@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  loc: string;
  subscription: Subscription
constructor(private store: Store<any>,
  ) {

  const source = interval(50000* 10000);
  this.subscription = source.subscribe(val => this.search(''));

 }
ngOnInit() {
  }

 
  search(searchForm) {
    if (searchForm.invalid) {
      return;
    }
    this.store.dispatch({ type: SET_LOCATION, payload: this.loc });
  }
}