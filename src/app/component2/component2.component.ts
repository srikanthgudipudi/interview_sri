import {
  Component, OnInit, ViewChild, Input,
  AfterContentChecked, AfterViewChecked, Output, EventEmitter, AfterViewInit
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RegionService } from '../services/region.service';


@Component({
  selector: 'app-component2',
  templateUrl: './component2.component.html',
  styleUrls: ['./component2.component.scss']
})
export class Component2Component implements OnInit {
  dataSource: any
  displayedColumns: string[] = ['name', 'branch', 'Watchers'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private regionService: RegionService) { }

  ngOnInit(): void {
   this.dataSource = this.regionService.getUserRepos()

  }

}
