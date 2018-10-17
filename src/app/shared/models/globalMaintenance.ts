import { MaintenanceTaskDefinition } from "./mantenance-task-definition";

export class GlobalMaintenance {
    globalTaskCompletedId: number;
    globalMaintenanceTaskId: number;
    date: string;
    lastUpdateId: string;
    lastUpdateTimestamp: Date;
    status: string;
    maintenanceTaskDefinition: MaintenanceTaskDefinition;
  }