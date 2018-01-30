import { Address } from "./address";

export interface Mentor {
    id: string;
    first_name: string;
    last_name: string;
    gender: string;
    address: Address;
}