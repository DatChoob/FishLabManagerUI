// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

//const host = "https://www.fishlabmanager.com/api";
 const host = "http://localhost:5000/api";

export const environment = {
  production: false,
  endpoints: {
    LOGIN: host + "/login",
    ROOM: host + "/room",
    PROJECT: host + "/project",
    GLOBAL_MAINTENANCE_DEFINITION: host + "/global-task-definition",
    ROOM_MAINTENANCE_DEFINITION: host + "/room-task-definition",
    SPECIES: host + "/species",
    FISH_FEED: host+"/fish-feed" 
  }

};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
