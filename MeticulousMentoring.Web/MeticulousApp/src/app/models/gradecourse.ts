import { Classification } from "./classification";
import { EducationalSystem } from "./educational_system";

export class GradeCourse {
  id: number;
  course_classification: Classification;
  system: EducationalSystem;
  course_name: string;
  created_on: any;
  modified_on: any;
}
