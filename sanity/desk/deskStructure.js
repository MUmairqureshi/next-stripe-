// src/deskStructure.js

export const structure = (S) =>
  S.list()
    .title('Website Content')
    .items([
      S.listItem()
        .title('Products')
        .schemaType('product')
        .child(
          S.documentTypeList('product')
          .defaultOrdering([{field: 'name', direction: 'asc'}])
        ),
      S.divider(),
      S.listItem()
        .title('About')
        .schemaType('about')
        .child(
          S.document()
            .schemaType('about')
            .documentId('about')
        ),
      S.listItem()
        .title('Events')
        .schemaType('events')
        .child(
          S.documentTypeList('events')
          .defaultOrdering([{field: 'date', direction: 'desc'}])
        ),
      S.listItem()
        .title('Blogs')
        .schemaType('blogs')
        .child(
          S.documentTypeList('blogs')
          .defaultOrdering([{field: 'date', direction: 'asc'}])
        ),
      S.listItem()
        .title('FAQs')
        .schemaType('faq')
        .child(
          S.documentTypeList('faq')
        ),
      S.listItem()
        .title('Pages')
        .schemaType('pages')
        .child(
          S.documentTypeList('pages')
        ),
      S.divider(),
      S.listItem()
      .title('Global Tags')
      .schemaType('tags')
      .child(
        S.documentTypeList('tags')
      ),
      S.listItem()
        .title('Settings')
        .schemaType('settings')
        .child(
          S.document()
            .schemaType('settings')
            .documentId('settings')
        ),
    ])