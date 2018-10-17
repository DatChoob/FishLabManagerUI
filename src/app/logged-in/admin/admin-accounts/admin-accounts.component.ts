import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
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
  dataSource: MatTableDataSource<Participant> = new MatTableDataSource([])

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['participantCode','name','role'];

  selectedParticipant:Participant;

  constructor(private readonly router: Router,
    private readonly route: ActivatedRoute, private participantService: ParticipantService) {
  }

  ngOnInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.participantService.loadParticipants().subscribe(participants => {
      if(participants.length > 0) {
        this.selectedParticipant = participants[0];
        this.dataSource.data = participants
      }
    });
  }



  highlightSelectedRow(selectedParticipant) {
    console.log(selectedParticipant);
    this.selectedParticipant = selectedParticipant;
  }

  addRow() {
    this.router.navigate([`./account/details`], { relativeTo: this.route });
  }

  modifyRow() {
      this.router.navigate([`./account/details/${this.selectedParticipant.participantCode}`], { relativeTo: this.route });
  }
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
