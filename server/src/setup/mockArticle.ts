export const mockArticle = {
  id: 1,
  title: '제목 있음',
  icon: 'src/anywhere',
  content: [
    {
      type: 'header',
      level: 2,
      content: 'Hello World',
    },
    {
      type: 'paragraph',
      content: 'This is a simple paragraph.',
    },
    {
      type: 'ordered-list',
      items: [
        {
          type: 'ol-item',
          content: 'First Item',
        },
        {
          type: 'ol-item',
          content: 'Second Item',
        },
        {
          type: 'ol-item',
          content: 'Third Item',
        },
      ],
    },
    {
      type: 'ul-item',
      content: 'First Item',
    },
    {
      type: 'ul-item',
      content: 'Second Item',
    },
    {
      type: 'ul-item',
      content: 'Third Item',
    },
    {
      type: 'ordered-list',
      items: [
        {
          type: 'ol-item',
          content: 'First Item',
        },
        {
          type: 'ol-item',
          content: 'Second Item',
        },
        {
          type: 'ol-item',
          content: 'Third Item',
        },
      ],
    },
  ],
  updatedAt: '2024-06-03T19:00:00+09:00',
};
