import { School } from "./school"
import { Classification } from "./classification"
import { Address } from "./address"

export interface Mentee {
    id: number;
    first_name: string;
    last_name: string;
    gender: string;
    dob: Date;
    school: School;
    classification: Classification;
    email: string;
    address: Address;
}