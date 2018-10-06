import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AdminAccountsDataSource } from './admin-accounts-datasource';
import { HighlightDelayBarrier } from 'blocking-proxy/built/lib/highlight_delay_barrier';
import { ParticipantService } from 'src/app/shared/api-services/participant.service';
import { Participant } from "src/app/shared/models/participant";



@Component({
  selector: 'app-admin-accounts',
  templateUrl: './admin-accounts.component.html',
  styleUrls: ['./admin-accounts.component.css']
})
export class AdminAccountsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Participant>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['participantCode','name','role'];

  selectedRowIndex = 1;

  constructor(private readonly router: Router,
    private readonly route: ActivatedRoute, private participantService: ParticipantService) {
  }

  ngOnInit() {
    this.participantService.loadParticipants().subscribe(participants => {
      if(participants.length > 0) {
        this.selectedRowIndex = 1;
        this.dataSource = new MatTableDataSource([])
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  highlightSelectedRow(index) {
    this.selectedRowIndex = index;
  }

  addRow() {
    this.router.navigate([`./account/details`], { relativeTo: this.route });
  }

  modifyRow() {
    if(!!this.dataSource)
    this.router.navigate([`./account/details/${this.dataSource.data[this.selectedRowIndex]}`], { relativeTo: this.route });
  }
}
