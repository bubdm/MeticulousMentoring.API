import { Address } from "./address";
import { EducationalSystem } from "./educational_system";

export class School {
    id: number;
    school_name: string;
    principal: string;
    educational_system: EducationalSystem;
    address: Address;
}