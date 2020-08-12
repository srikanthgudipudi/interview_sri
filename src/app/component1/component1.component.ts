import {
  Component, OnInit, ViewChild, Input, ElementRef,
  AfterContentChecked, AfterViewChecked, Output, EventEmitter, AfterViewInit
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RegionService } from '../services/region.service';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { distinctUntilChanged, map, filter, tap, debounceTime } from 'rxjs/operators';



@Component({
  selector: 'app-component1',
  templateUrl: './component1.component.html',
  styleUrls: ['./component1.component.scss']
})
export class Component1Component implements OnInit {
  dataSource: any
  displayedColumns: string[] = ['profile', 'name', 'view'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(private regionService: RegionService,
    private router: Router) { }

  ngOnInit(): void {
    this.allUsers();
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    // server-side search
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(500),
        distinctUntilChanged(),
        tap((text) => {
          if (this.input.nativeElement.value) {
            this.searchUser(this.input.nativeElement.value);
          } else {
            this.allUsers();
          }

        })
      )
      .subscribe();
  }



  // To get all users list
  allUsers() {
    this.regionService.getAllUsers().subscribe(data => {
      this.dataSource = data;
    }, error => {

    })

  }

  // search the user
  searchUser(searchfield) {
    this.regionService.searchUser(searchfield).subscribe(data => {
      this.dataSource = data['items'];
    }, error => {

    })

  }


  // get all the Repositaries for indiviual user
  getRepositary(data) {
    this.regionService.getRepos(data.repos_url).subscribe(data => {
      this.regionService.setUserRepos(data);
      this.router.navigate(['/details']);
    }, error => {

    })
  }

}
