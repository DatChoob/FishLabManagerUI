import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { AdminAccountsDataSource } from './admin-accounts-datasource';
import { HighlightDelayBarrier } from 'blocking-proxy/built/lib/highlight_delay_barrier';

@Component({
  selector: 'app-admin-accounts',
  templateUrl: './admin-accounts.component.html',
  styleUrls: ['./admin-accounts.component.css']
})
export class AdminAccountsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: AdminAccountsDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  selectedRowIndex = 1;

  ngOnInit() {
    this.dataSource = new AdminAccountsDataSource(this.paginator, this.sort);
  }
  highlightSelectedRow(row) {
    this.selectedRowIndex = row.id;
  }

  addRow(){
    this.dataSource.data.push( {id: 21, name: 'Calcium'});
  }
}
