import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidatorService } from 'angular4-material-table';

@Injectable({
    providedIn: 'root'
  })
export class AdminRoomValidatorService implements ValidatorService {
  getRowValidator(): FormGroup {
    return new FormGroup({
      'building': new FormControl(null,Validators.required),
      'roomNumber': new FormControl(null,Validators.required),
      });
    }
}