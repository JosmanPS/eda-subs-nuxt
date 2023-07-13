import { ContentBlock } from "./contentblock.entity";
import { Teacher } from "./teacher.entity";

export interface MasterClass {
  id: string;
  title: string;
  slug: string;
  description: ContentBlock[];
  teacherId: string;
  teachers?: Teacher;
  image: string;
  content: ContentBlock[];
}
