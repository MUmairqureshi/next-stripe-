import { defineType, defineField } from "sanity";

export const settings = defineType({
  name: "settings",
  title: "Settings",
  type: "document",
  groups: [
    {
      default: true,
      name: 'linkbar',
      title: 'Linkbar',
    },
    {
      name: 'header',
      title: 'Header',
    },
    {
      name: 'footer',
      title: 'Footer',
    },
    {
      name: 'contact',
      title: 'Contact',
    },
    {
      name: 'cart',
      title: 'Cart',
    },
    {
      name: 'error',
      title: '404',
    },
  ],
  fields: [
    defineField({
      name: "linkbarText",
      title: "Linkbar Text",
      type: "string",
      group: 'linkbar',
    }),
    defineField({
      name: "linkbarUrl",
      title: "Linkbar URL",
      type: "url",
      group: 'linkbar',
    }),
    defineField({
      name: "showLinkbar",
      title: "Show Linkbar?",
      type: "boolean",
      group: 'linkbar',
    }),
    defineField({
      name: "headerLogo",
      title: "Header Logo",
      type: "image",
      validation: (Rule) => Rule.required(),
      group: 'header',
    }),
    defineField({
      name: "menuIcon",
      title: "Menu Icon",
      type: "image",
      validation: (Rule) => Rule.required(),
      group: 'header',
    }),
    defineField({
      name: "accountIcon",
      title: "Account Icon",
      type: "image",
      validation: (Rule) => Rule.required(),
      group: 'header',
    }),
    defineField({
      name: "cartIcon",
      title: "Cart Icon",
      type: "image",
      validation: (Rule) => Rule.required(),
      group: 'header',
    }),
    defineField({
      name: "url",
      title: "Menu Links",
      group: 'header',
      validation: (Rule) => Rule.required(),
      type: 'array',
      of: [
        {
          name: "link",
          title: "Link",
          type: "link"
        }
      ],
    }),
    defineField({
      name: "footerLogo",
      title: "Footer Logo",
      type: "image",
      group: 'footer',
      fields: [
        {
          name: "caption",
          title: "Caption",
          type: "string"
        }
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "formCaption",
      title: "Email Form Caption",
      type: "text",
      group: 'footer',
    }),
    defineField({
      name: "companyName",
      title: "Company Name",
      type: "string",
      group: 'footer',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "footerFinePrint",
      title: "Fine Print",
      type: "string",
      group: 'footer',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "footerTextBlock",
      title: "Text Block",
      type: "textBlock",
      group: 'footer',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "footerLinkLists",
      title: "Footer Link Lists",
      group: 'footer',
      validation: (Rule) => Rule.required(),
      type: 'array',
      of: [
        {
          name: "linkList",
          title: "linkList",
          type: "linkList"
        }
      ],
    }),
    defineField({
      name: "contactFormTitle",
      title: "Contact Form Title",
      type: "string",
      group: 'contact',
    }),
    defineField({
      name: "contactInfo",
      title: "Contact Information",
      type: "blockContent",
      group: 'contact',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "contactLinks",
      title: "Contact Page Links",
      group: 'contact',
      validation: (Rule) => Rule.required(),
      type: 'array',
      of: [
        {
          name: "link",
          title: "Link",
          type: "link"
        }
      ],
    }),
    defineField({
      name: "emptyCartTitle",
      title: "Empty Cart Title",
      type: "string",
      group: 'cart',
    }),
    defineField({
      name: "emptyCartText",
      title: "Empty Cart Text",
      type: "string",
      group: 'cart',
    }),
    defineField({
      name: "emptyCartButton",
      title: "Empty Cart Button Text",
      type: "string",
      group: 'cart',
    }),
    defineField({
      name: "errorTitle",
      title: "404 Page Title",
      type: "string",
      group: 'error',
    }),
    defineField({
      name: "errorText",
      title: "404 Page Text",
      type: "string",
      group: 'error',
    }),
    defineField({
      name: "errorButtonText",
      title: "404 Page Button Text",
      type: "string",
      group: 'error',
    }),
  ],
  initialValue: {
    showLinkbar: true
  }
})
