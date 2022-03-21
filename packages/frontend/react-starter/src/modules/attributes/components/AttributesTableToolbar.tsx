import React from 'react';
import { GridToolbar } from 'components/GridToolbar';
import { useAttributes } from '../hooks/useAttributes';

export const AttributesTableToolbar: React.FC = () => {
  const { refetch } = useAttributes();

  return <GridToolbar onRefresh={refetch} />;
};
