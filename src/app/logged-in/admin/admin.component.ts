import { Component, OnInit } from '@angular/core';
import { ExportService } from 'src/app/shared/api-services/export.service';
import { DialogService } from 'src/app/shared/dialogs.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  selectedTabIndex: number = 0;
  constructor(private exportService: ExportService, private dialogService: DialogService) { }

  ngOnInit() {
  }

  changeTab(tabnum) {
    this.selectedTabIndex = tabnum;
  }

  exportData() {
    try {
      this.exportService.export();
    } catch (e) {
      this.dialogService.confirm("Unable to download file", "Error occured generating export file");
    }

  }

}
