import { MdPerson as icon } from 'react-icons/md';

export default {
  // Computer name
  name: 'person',
  // Visible title
  title: 'Slice Masters',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'name',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 100,
      },
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'text',
      description: 'Tell us a bit about them',
    },
  ],
};
