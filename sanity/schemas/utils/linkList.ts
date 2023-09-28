import {defineField} from 'sanity'

export default defineField({
  name: 'linkList',
  title: 'Link List',
  type: 'object',
  fields: [
    defineField({
      name: "name",
      title: "Collection Name",
      type: "string",
    }),
    defineField({
      name: "url",
      title: "Link Url",
      type: 'array',
      of: [
        {
          name: "link",
          title: "Link",
          type: "link"
        }
      ],
    }),
  ],
 
})
