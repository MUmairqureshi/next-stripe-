import {defineField} from 'sanity'
import {PAGE_REFERENCES} from '../../../constants'

export default defineField({
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({
      name: "text",
      title: "Link Text",
      type: "string",
    }),
    defineField({
      name: "external",
      title: "External Url",
      type: "url",
    }),
    defineField({
      name: 'internal',
      type: 'reference',
      weak: true,
      to: [{ type: "product" }],
    }),
    defineField({
      title: 'Email',
      name: 'email',
      type: 'email',
    }),
  ]
})
