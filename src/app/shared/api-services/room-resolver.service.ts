import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from '@angular/router';
import { Room } from '../models/room';
import { MaintenanceRoomService } from 'src/app/shared/api-services/maintenance-room.service';

@Injectable({providedIn: 'root'})
export class RoomResolver implements Resolve<any> {
    constructor( private router : Router, private maintenanceRoomService : MaintenanceRoomService, private route : ActivatedRoute) {
    }
    resolve(route: ActivatedRouteSnapshot, rstate: RouterStateSnapshot) {
/**
 * Get all rooms, 
 * change url to go to the first room
 */
        this.maintenanceRoomService.getRoomList().subscribe((rooms:Room[])=>{
            if(rooms.length > 0){
                this.router.navigate([`./maintenance/room/${rooms[0].roomId}`], {relativeTo: this.route})
            }
        })

    }
}