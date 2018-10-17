import { Project } from "./project";

export class Tank {
    tankId: number;
    roomId: number
    trialCode: string;
    status: string;
    maintainer_participantCode: string;
    projects?:Project[];
    
}