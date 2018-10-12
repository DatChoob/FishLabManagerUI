import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Tank } from '../../../shared/models/tank';
import { TankManagementService } from '../../../shared/api-services/tank-management.service'
import { DialogService } from '../../../shared/dialogs.service'
import { cloneDeep } from 'lodash';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tank-management-detail',
  templateUrl: './tank-management-detail.component.html',
  styleUrls: ['./tank-management-detail.component.css']
})
export class TankManagementDetailComponent implements OnInit {
  id: string;
  currentTank: Tank;
  tankForm: FormGroup;

  constructor(private readonly route: ActivatedRoute,
    private readonly router: Router,
    private tankManagementService: TankManagementService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder) {
  }

  tankList: Tank[] = [
    { tankId: 1, roomId: 2, trialCode: '123', status: 'Pregnant', maintainer_participantCode: 'Cool Fish' },
    { tankId: 2, roomId: 3, trialCode: '555', status: 'Crispy Fries', maintainer_participantCode: 'Bad Fish' },
    { tankId: 3, roomId: 4, trialCode: '666', status: 'Dead', maintainer_participantCode: 'Dumb Fish' },
  ];

  statusList = [
    { value: 'Pregnant' },
    { value: 'Crispy Fries' },
    { value: 'Dead' },
    { value: 'Setup' }
  ]

  ngOnInit() {
    this.tankForm = this.formBuilder.group({
      tankId: ['', Validators.required],
      projID: ['', Validators.required],
      maintainer_participantCode: ['', Validators.required],
      trialCode: ['', Validators.required],
      status: ['', Validators.required],
      speciesNames: ['']
    });

    this.route.paramMap.subscribe(params => {
      this.id = params.get("id");
      console.log(this.id);
      if (this.id) {
        this.currentTank = cloneDeep(this.tankManagementService.getTankByProperty(this.id));
        this.tankForm.patchValue(this.currentTank);
        console.log(this.currentTank);
      }
    });
  }

  confirmSave(tankForm) {
    this.openDialog()
      .subscribe(
        userConfirmed => {
          if (userConfirmed) {
            this.tankManagementService.createOrUpdateTank(this.currentTank, tankForm.value).subscribe(response => { });
            this.router.navigate(['../../'], { relativeTo: this.route });
          }
        });
  }

  confirmDelete(tankForm) {
    // TODO: Route back to initial tank management page after delete
    this.openDialog().subscribe(userConfirmed => {
      if (userConfirmed) {
        this.tankManagementService.deleteTank(this.currentTank, tankForm.value).subscribe(response => { });
        this.router.navigate(['../../'], { relativeTo: this.route });
      }
    });
  }

  openDialog(): Observable<boolean> {
    return this.dialogService
      .confirm('Confirm Dialog', 'Are you sure you want to do this?')

  }

}
