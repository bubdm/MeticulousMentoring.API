import { Address } from './address';
import { Mentee } from './mentee';

export class Mentor {
  mentorId: number;
  mentorFirstName: string;
  mentorLastName: string;
  mentorGender: string;
  mentorAddress: Address;
  mentorIsActive: boolean;
  mentorMentees: Array<Mentee>;
}
