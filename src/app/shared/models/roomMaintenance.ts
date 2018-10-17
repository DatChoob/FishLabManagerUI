import { MaintenanceTaskDefinition } from "./mantenance-task-definition";

export class RoomMaintenance {
    roomTaskCompletedId: number;
    roomId: number;
    roomMaintenanceTaskId: number;
    status: boolean | string;
    date: string;
    lastUpdateId: string;
    lastUpdateTimestamp: Date ;
    maintenanceTaskDefinition: MaintenanceTaskDefinition;
  }