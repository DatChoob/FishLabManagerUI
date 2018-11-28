import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Tank } from '../../../shared/models/tank';
import { TankManagementService } from '../../../shared/api-services/tank-management.service'
import { DialogService } from '../../../shared/dialogs.service'
import { cloneDeep } from 'lodash';
import { Observable, Subscription, of } from 'rxjs';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../../shared/auth.service'
import { RoomService } from 'src/app/shared/api-services/room.service';
import { ParticipantService } from 'src/app/shared/api-services/participant.service';
import { ProjectService } from 'src/app/shared/api-services/project.service';
import { SpeciesService } from '../../../shared/api-services/species.service';
import { SpeciesInTank } from '../../../shared/models/species-in-tank';
import { TableDataSource } from 'angular4-material-table';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material';

import { MatSnackBar } from '@angular/material';
import { map, catchError, debounceTime } from 'rxjs/operators';
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
  displayedColumns = ['currentName', 'speciesCount', 'actionsColumn'];
  constructor(private readonly route: ActivatedRoute,
    private readonly router: Router,
    private tankManagementService: TankManagementService,
    public roomService: RoomService,
    public participantService: ParticipantService,
    public speciesService: SpeciesService,
    public projectService: ProjectService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
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
    { value: 'One Fish' },
    { value: 'Pair' },
    { value: 'Breeder' },
    { value: 'Growing' },
    { value: 'Other' }
  ];

  routerSubscription: Subscription;
  speciesSubscription: Subscription;

  ngOnInit() {
    //projedctId cannot be updated here. it will be update on the admin page
    //need dropdown of all people for participantCode/ for now just be a textfield
    this.currentTank = new Tank();

    this.tankForm = this.formBuilder.group({
      roomId: [{ value: '', disabled: !this.authService.userIsAdmin() }, Validators.required],
      tankId: [{ value: '', disabled: !this.authService.userIsAdmin() }, Validators.required, this.validateTankIdExists.bind(this)],
      projNames: [{ value: '', disabled: true }],
      maintainer_participantCode: [{ value: 'RMC', disabled: !this.authService.userIsAdmin() }],
      trialCode: [''],
      status: ['', Validators.required],
      species: ['']
    });

    this.routerSubscription = this.route.paramMap.subscribe(params => {
      this.tankId = params.get("tankId");
      this.tankForm.patchValue({ "roomId": +(params.get("roomId")) });
      if (this.tankId) {
        this.currentTank = cloneDeep(this.tankManagementService.getTankById(this.tankId));
        this.currentTank.roomId = +(params.get("roomId"));
        this.tankForm.patchValue(this.currentTank);
        let projectNames = []
        this.currentTank.projects.forEach(project => {
          if (project.name != null)
            projectNames.push(project.name)
        })



        this.tankForm.patchValue({ "projNames": projectNames.join(", ") });

        this.speciesSubscription = this.speciesService.loadSpecies().subscribe(data => {
          if (data.length > 0) {
            this.speciesList = data;
            this.currentTank.species.forEach(speciesInTank => {
              speciesInTank.currentName = this.speciesService.getSpeciesById(speciesInTank.speciesId).currentName;
            })
            this.dataSource = new TableDataSource(this.currentTank.species, SpeciesInTank);
            this.dataSource.datasourceSubject.subscribe((speciesInTank: SpeciesInTank[]) => {
              this.currentTank.species = speciesInTank;
            });
          }
        });
      }

    });

  }



  confirmAdd(tankForm) {
    if (tankForm.valid)
      this.openDialog().subscribe(userConfirmed => {
        if (userConfirmed) {
          tankForm.value.species = this.currentTank.species;
          this.tankManagementService.createTank(tankForm.value).subscribe(Response => {
            this.router.navigate([`../../${tankForm.value.roomId}`], { relativeTo: this.route });
            this.snackBar.open("Tank Added", "", { duration: 1000 });
          });
        }
      }
      )
  }

  confirmSave(tankForm) {
    if (tankForm.valid)
      this.openDialog().subscribe(userConfirmed => {
        if (userConfirmed) {
          tankForm.value.species = this.currentTank.species;
          this.tankManagementService.modifyTank(this.currentTank, tankForm.value).subscribe(response => {
            this.router.navigate([`../../../${tankForm.value.roomId}`], { relativeTo: this.route });
            this.snackBar.open("Tank Saved", "", { duration: 1000 });
          });
        }
      });
  }

  confirmDelete(tankForm) {
    if (tankForm.valid)
      this.openDialog().subscribe(userConfirmed => {
        if (userConfirmed) {
          this.tankManagementService.deleteTank(this.currentTank, tankForm.value).subscribe(response => {
            this.router.navigate([`../../../${tankForm.value.roomId}`], { relativeTo: this.route });
            this.snackBar.open("Tank Deleted", "", { duration: 1000 });
          });
        }
      });
  }

  openDialog(): Observable<boolean> {
    return this.dialogService.confirm('Confirm Dialog', 'Are you sure you want to do this?')
  }

  addSpecies(matSelect: MatSelect) {
    let matOption: MatOption = <MatOption>matSelect.selected;
    let newSpecies: SpeciesInTank = new SpeciesInTank();
    if (matOption != null) {
      newSpecies.speciesId = matOption.value;
      newSpecies.currentName = matOption.viewValue;
      newSpecies.amountOfSpecies = 0;
      if (this.currentTank.species == null) {
        this.currentTank.species = [];
      }
      this.currentTank.species.push(newSpecies);
      if (this.dataSource == null) {
        this.dataSource = new TableDataSource(this.currentTank.species, SpeciesInTank);
        this.dataSource.datasourceSubject.subscribe((speciesInTank: SpeciesInTank[]) => {
          this.currentTank.species = speciesInTank;
        });
      }
      else {
        this.dataSource.updateDatasource(cloneDeep(this.currentTank.species), { emitEvent: false });
      }
    }
  }
  ngOnDestroy() {
    if (this.routerSubscription != null)
      this.routerSubscription.unsubscribe();
    if (this.speciesSubscription != null)
      this.speciesSubscription.unsubscribe();

  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  //returns null if tankId does not already exist
  // if object if it not a unique tank Id
  validateTankIdExists(control: AbstractControl): ValidationErrors | null {
    return this.tankManagementService.getTankByIdFromService(control.value).pipe(
      catchError((err, caught) => {
        return of(false);
      }),
      map(tank => {
        return tank ? null : { 'uniqueTankId': true };
      }),
      debounceTime(500),
    )
  }
}
