import { GradingPeriod } from "./gradingperiod";
import { GradeCourse } from "./gradecourse";

export class Grade {
  gradeId: number;
  menteeId: number;
  gradeCourse: GradeCourse;
  gradePeriod: GradingPeriod;
  gradeValue: number;
  schoolYear: string;
}
