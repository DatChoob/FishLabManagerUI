import { Project } from "./project";
import { SpeciesInTank } from "./species-in-tank";

export class Tank {
    tankId: number;
    roomId: number
    trialCode: string;
    status: string;
    maintainer_participantCode: string;
    projects?:Project[];
    speciesInTank?:SpeciesInTank[];
}