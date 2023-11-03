import { Tag } from "./tag.entity"

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
  modules: {
    title: string
  }[]
}
