import { ContentBlock } from "./contentblock.entity";
import { Tag } from "./tag.entity";
import { Teacher } from "./teacher.entity";

export interface MasterClass {
  id: string;
  title: string;
  slug: string;
  description: ContentBlock[];
  teacherId: string;
  teacher: Teacher;
  thumbnail: {
    url: string
  };
  tags: Tag[]
  content: ContentBlock[];
}
