import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { saveAs } from 'file-saver';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor(private http: HttpClient) { }

  export() {
    this.http.get(environment.endpoints.EXPORT, { responseType: 'blob' })

    .pipe(
      catchError(e=>throwError(new Error("Error occurred downloading file")))
    ).subscribe(data => saveAs(data, "testexport.csv"),
        error => console.log("Error downloading the file."),
        () => console.info("OK")
      )
  }
}
