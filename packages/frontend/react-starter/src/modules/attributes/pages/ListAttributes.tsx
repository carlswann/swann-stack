import React from 'react';
import { AttributesTable } from '../components/AttributesTable';
import SlideUpVisibleAnimation from 'components/ui/animations/SlideUpVisibleAnimation';

const ListAttributes: React.FC = () => {
  return (
    <SlideUpVisibleAnimation distance={100}>
      <AttributesTable />
    </SlideUpVisibleAnimation>
  );
};

export default ListAttributes;
