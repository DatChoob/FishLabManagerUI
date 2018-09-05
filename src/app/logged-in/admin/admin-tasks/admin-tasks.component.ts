import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-admin-tasks',
  templateUrl: './admin-tasks.component.html',
  styleUrls: ['./admin-tasks.component.css']
})
export class AdminTasksComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

  roomTasks = [
    { name: "Clean the tanks" },
    { name: "Add water" }
  ];

  globalTasks = [
    { name: "Clean the floors" }
  ];

}

export class Task {
  name: string;
}
