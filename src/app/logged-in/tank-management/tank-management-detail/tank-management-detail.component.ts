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
    { tankId: 1, projID: 2, UID: 123, trialCode: 'Alpha', status: 'Pregnant', speciesNames: 'Cool Fish' },
    { tankId: 2, projID: 3, UID: 555, trialCode: 'Bravo', status: 'Crispy Fries', speciesNames: 'Bad Fish' },
    { tankId: 3, projID: 4, UID: 666, trialCode: 'Charlie', status: 'Dead', speciesNames: 'Dumb Fish' },
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
      UID: ['', Validators.required],
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
        console.log("Current Tank: " + this.currentTank);
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
