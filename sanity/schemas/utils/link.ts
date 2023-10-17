import {defineField} from 'sanity'

export default defineField({
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({
      name: "text",
      title: "Text",
      description: "You must provide text and a link for it to show up on the page",
      type: "string",
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      description: "Make sure URL includes https://",
    }),
    defineField({
      title: 'Email',
      name: 'email',
      type: 'email',
      description: 'adding an email will override any url provided'
    }),
    defineField({
      title: 'Button Style',
      name: 'style',
      type: 'string',
      initialValue: 'primary',
      options: {
        list: [
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Outline', value: 'outline' },
          { title: 'Link', value: 'link' },
        ],
      },
    }),
    
  ]
})
