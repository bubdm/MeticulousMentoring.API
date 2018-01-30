import { School } from "./school"
import { Classification} from "./classification"
import { Address } from "./address"

export interface Mentee {
    id: string;
    first_name: string;
    last_name: string;
    gender: string;
    dob: string;
    school: School;
    classification: Classification;
    email: string ;
    address: Address;

}