import { Component, OnInit, ViewChild } from '@angular/core';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
// import {MatFormField} from '@angular/material';

export interface UserData {
  title: string;
  name: string;
  progress: string;
  due: string;
}

/** Constants used to fill up our data base. */
const PROGRESS: string[] = [
  'COMPLETED', 'IN PROGRESS', 'DONE'
]

const TITLE: string[] = [
  'Take Quiz 03', 'Update documentation', 'Read Chapters 1-3', 'Implement Command Interface', 'Lab Activity 08',
  'Complete Assignment 2', 'Observer Pattern', 'Final Project Proposal', 'Eat Dinner', 'Work on Stylized CSS sheet'
]

const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];
const DUE: string[] = [
  '11/25/19', '11/30/19', '12/2/19', '12/20/19', '1/23/20', '1/31/20', '8/23/20', '5/7/20', '3/14/20',
  '9/6/20', '8/5/20', '9/4/20', '8/18/20', '8/5/20', '9/12/20', '6/23/20', '2/28/20', '10/20/20'
]

const PROJECT: string[] = [
  'X', '1', '2', '3', '4','5','6','7','8','9','10'
]

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-table',
  styleUrls: ['table.component.css'],
  templateUrl: 'table.component.html'
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['title', 'name', 'progress', 'due'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor() {
    // Create 10 users
    const users = Array.from({length: 10}, (_, k) => createNewUser());

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
   }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

/** Builds and returns a new User. */
function createNewUser(): UserData {
  const name = PROGRESS[Math.round(Math.random() * (PROGRESS.length - 1))]
  const due = DUE[Math.round(Math.random() * (DUE.length - 1))] 
  const title = TITLE[Math.round(Math.random() * (TITLE.length - 1))]
  const progress = PROJECT[Math.round(Math.random() * (PROJECT.length - 1))]

  return {
    title: title,
    name: name,
    progress: progress,
    due: due
  };
}
