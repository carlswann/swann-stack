import React from 'react';
import { TagsTable } from '../components/TagsTable';
import SlideUpVisibleAnimation from 'components/ui/animations/SlideUpVisibleAnimation';

const ListTags: React.FC = () => {
  return (
    <SlideUpVisibleAnimation distance={100}>
      <TagsTable />
    </SlideUpVisibleAnimation>
  );
};

export default ListTags;
