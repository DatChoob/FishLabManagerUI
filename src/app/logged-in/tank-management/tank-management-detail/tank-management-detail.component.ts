import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Tank } from '../../../shared/models/tank';
import { TankManagementService } from '../../../shared/api-services/tank-management.service'
import { DialogService } from '../../../shared/dialogs.service'
import { cloneDeep } from 'lodash';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/auth.service'
import { RoomService } from 'src/app/shared/api-services/room.service';
import { ParticipantService } from 'src/app/shared/api-services/participant.service';
import { ProjectService } from 'src/app/shared/api-services/project.service';
import { SpeciesService } from '../../../shared/api-services/species.service';
import { SpeciesInTank } from '../../../shared/models/species-in-tank';
import { TableDataSource } from 'angular4-material-table';
import { Species } from 'src/app/shared/models/species';

@Component({
  selector: 'app-tank-management-detail',
  templateUrl: './tank-management-detail.component.html',
  styleUrls: ['./tank-management-detail.component.css']
})
export class TankManagementDetailComponent implements OnInit {
  tankId: string;
  currentTank: Tank;
  tankForm: FormGroup;
  dataSource: TableDataSource<SpeciesInTank>;
  constructor(private readonly route: ActivatedRoute,
    private readonly router: Router,
    private tankManagementService: TankManagementService,
    public roomService: RoomService,
    public participantService: ParticipantService,
    public speciesService: SpeciesService,
    public projectService: ProjectService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder,
    public authService: AuthService) {
  }
  speciesList = []
  statusList = [
    { value: 'No Fish' },
    { value: 'Eggs' },
    { value: 'Wrigglers' },
    { value: 'Fry' },
    { value: 'Dead' },
    { value: 'Watch' },
    { value: 'Other' }
  ];

  ngOnInit() {
    //projedctId cannot be updated here. it will be update on the admin page
    //need dropdown of all people for participantCode/ for now just be a textfield


    this.tankForm = this.formBuilder.group({
      roomId: [{ value: '', disabled: !this.authService.userIsAdmin() }, Validators.required],
      tankId: [{ value: '', disabled: !this.authService.userIsAdmin() }, Validators.required],
      projNames: [{ value: '', disabled: true }],
      maintainer_participantCode: [{ value: '', disabled: !this.authService.userIsAdmin() }],
      trialCode: [''],
      status: ['', Validators.required],
      speciesNames: ['']
    });

    this.route.paramMap.subscribe(params => {
      this.tankId = params.get("tankId");
      if (this.tankId) {
        this.currentTank = cloneDeep(this.tankManagementService.getTankById(this.tankId));
        this.tankForm.patchValue(this.currentTank);
        let projectNames = []
        this.currentTank.projects.forEach(project => {
          if (project.name != null)
            projectNames.push(project.name)
        })
        
        
        
        console.log(projectNames);
        this.tankForm.patchValue({ "projNames": projectNames.join(", ") });
        console.log(this.currentTank);
      }
    });

    this.speciesService.loadSpecies().subscribe(data => {
      this.speciesList = data;
    //   this.currentTank.speciesInTank.forEach(speciesInTank => {
    //     // if speciesInTank.speciesId = species.speciesId{
    //     //   speciesInTank.currentName = species.currentName;
    //     // }
    //     // })
     });
     let clone: SpeciesInTank[ = cloneDeep(data);]
     this.dataSource = new TableDataSource(clone, SpeciesInTank);
  }



  confirmAdd(tankForm) {
    if (tankForm.valid)
      this.openDialog()
        .subscribe(
          userConfirmed => {
            if (userConfirmed) {
              this.tankManagementService.createTank(tankForm.value).subscribe(Response => {
                this.router.navigate([`../../${tankForm.value.roomId}`], { relativeTo: this.route });

              });
            }
          }
        )
  }

  confirmSave(tankForm) {
    if (tankForm.valid)
      this.openDialog().subscribe(userConfirmed => {
        if (userConfirmed) {
          this.tankManagementService.modifyTank(this.currentTank, tankForm.value).subscribe(response => {
            this.router.navigate([`../../${tankForm.value.roomId}`], { relativeTo: this.route });

          });
        }
      });
  }

  confirmDelete(tankForm) {
    if (tankForm.valid)
      this.openDialog().subscribe(userConfirmed => {
        if (userConfirmed) {
          this.tankManagementService.deleteTank(this.currentTank, tankForm.value).subscribe(response => {
            this.router.navigate([`../../${tankForm.value.roomId}`], { relativeTo: this.route });

          });
        }
      });
  }

  openDialog(): Observable<boolean> {
    return this.dialogService
      .confirm('Confirm Dialog', 'Are you sure you want to do this?')

  }

}
