import { Lesson } from "./lesson.entity"
import { Tag } from "./tag.entity"
import { Teacher } from "./teacher.entity"

export interface Course {
  uuid: string
  title: string
  slug: string
  description: string
  previewDescription: string
  image: {
    url: string
  }
  tags: Tag[]
  modules: Module[]
  teacher: Teacher
}

export interface Module {
  title: string
  uuid: string
  lessons: Lesson[]
}
