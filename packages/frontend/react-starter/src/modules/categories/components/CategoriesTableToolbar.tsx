import React from 'react';
import { GridToolbar } from 'components/GridToolbar';
import { useCategories } from '../hooks/useCategories';

export const CategoriesTableToolbar: React.FC = () => {
  const { refetch, onSearchQueryChange, searchQuery } = useCategories();

  const handleSearchQueryChange = (searchValue: string) => {
    onSearchQueryChange(searchValue);
  };

  const handleClearSearch = () => {
    onSearchQueryChange('');
  };

  return <GridToolbar onRefresh={refetch} onClearSearch={handleClearSearch} onSearchQueryChange={handleSearchQueryChange} searchQuery={searchQuery || ''} />;
};
