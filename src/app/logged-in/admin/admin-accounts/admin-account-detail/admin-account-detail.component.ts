import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { TableDataSource, TableElement } from 'angular4-material-table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { ParticipantService } from '../../../../shared/api-services/participant.service';
import { Participant } from '../../../../shared/models/participant';
import { NgForm, FormControl, FormGroup } from '@angular/forms';
import { DialogService } from 'src/app/shared/dialogs.service';


@Component({
  selector: 'app-admin-account-detail',
  templateUrl: './admin-account-detail.component.html',
  styleUrls: ['./admin-account-detail.component.css']
})
export class AdminAccountDetailComponent implements OnInit {
  @ViewChild('f')
  subscription: Subscription;
  participantInfo: Participant;
  participantForm: FormGroup;
  editedItem: Participant;

  participantCode: string;
  name: string;
  constructor(private readonly route: ActivatedRoute, private accountDetails: ParticipantService, private router: Router,
    private dialogService: DialogService) {

  }

  ngOnInit() {
    this.participantForm = new FormGroup({
      name: new FormControl(''),
      participantCode: new FormControl(''),
      password: new FormControl(''),
      role: new FormControl(''),
      status: new FormControl(''),
    });
    this.participantCode = this.route.snapshot.paramMap.get('participantCode');
    if (this.participantCode != null) {
      this.participantInfo = this.accountDetails.getParticipant(this.participantCode);
      if (this.participantInfo == null) {
        this.router.navigate(["/"])
        return;
      }
      this.participantForm.patchValue(this.participantInfo);
    }

  }

  confirmSave() {
    if(this.participantForm.valid){
      let updatedParticipant:Participant = this.participantForm.value; 
      this.openDialog().subscribe(
        (confirmed:boolean) => {
          if(confirmed){
            this.accountDetails.saveParticipant(this.participantInfo.participantCode,updatedParticipant)
            .subscribe( (apiParticipant) => 
              this.router.navigate(["/admin"],{ relativeTo: this.route })
            );
          }
        }
      )
    
    }
  }

  confirmDelete() {
    if(this.participantForm.valid){
      let deletedParticipant:Participant = this.participantForm.value;
      this.openDialog().subscribe(
        (confirmed:boolean) => {
          if(confirmed){
            this.accountDetails.deleteParticipant(deletedParticipant)
            .subscribe( (apiDeleteParticipant) =>
            this.router.navigate(["/admin"], {relativeTo: this.route})
            )
          }
        }
      )
    }
      //means row was in not edit mode and we are deleting entry
      //delete row from database
   
  }

  confirmAdd(){
    if(this.participantForm.valid){
      let newParticipant:Participant = this.participantForm.value;
      this.openDialog().subscribe(
        (confirmed:boolean) => {
          if(confirmed){
            this.accountDetails.addParticipant(newParticipant)
            .subscribe((apiNewParticipant) =>
            this.router.navigate(["/admin"]))
          }
        }
      )
    }
  }

  openDialog(): Observable<boolean>{
    return this.dialogService.confirm('Confirm Dialog', 'Are you sure you want to do this?')
  }

}


