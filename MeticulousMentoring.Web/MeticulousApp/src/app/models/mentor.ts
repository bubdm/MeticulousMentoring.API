import { Address } from './address';
import { Mentee } from './mentee';

export class Mentor {
  mentorId: number;
  mentorFirstName: string;
  mentorLastName: string;
  mentorGender: string;
  mentorAddress: Address;
  mentorIsActive: boolean;
  mentorEmail: string;
  mentorMentees: Array<Mentee>;
}
