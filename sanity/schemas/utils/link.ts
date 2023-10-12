import {defineField} from 'sanity'

export default defineField({
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({
      name: "text",
      title: "Text",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
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
