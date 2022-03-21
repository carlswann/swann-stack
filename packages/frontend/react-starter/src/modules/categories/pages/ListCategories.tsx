import React from 'react';
import { CategoriesTable } from '../components/CategoriesTable';
import SlideUpVisibleAnimation from 'components/ui/animations/SlideUpVisibleAnimation';

const ListCategories: React.FC = () => {
  return (
    <SlideUpVisibleAnimation distance={100}>
      <CategoriesTable />
    </SlideUpVisibleAnimation>
  );
};

export default ListCategories;
