import { Address } from "./address";
import { Mentee } from "./mentee";

export class Guardian {
  guardianId: number;
  guardianFirstName: string;
  guardianLastName: string;
  guardianGender: string;
  guardianAddress: Address;
  guardianEmail: string;
  guardianChildren: Array<Mentee>;
}
