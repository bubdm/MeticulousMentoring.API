import { School } from "./school";
import { Classification } from "./classification";
import { Address } from "./address";

export class Mentee {
    menteeId: number;
    menteeFirstName: string;
    menteeLastName: string;
    menteeGender: string;
    menteeDOB: Date;
    menteeSchool: School;
    menteeClassification: Classification;
    menteeEmail: string;
    menteeAddress: Address;
    menteeIsActive: boolean;
}