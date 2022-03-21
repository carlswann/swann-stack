import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import Card from 'components/ui/extended/Card';
import { CategoriesTableToolbar } from './CategoriesTableToolbar';
import { useCategoriesTableColumns } from '../hooks/useCategoriesTableColumns';
import { useDataGridPersistence } from 'hooks/useDataGridPersistence';
import { useCategories } from '../hooks/useCategories';

export const CategoriesTable: React.FC = () => {
  const categoriesTableColumns = useCategoriesTableColumns();
  const { dataGridProps } = useDataGridPersistence({ tableName: 'CategoriesTable' });
  const { categories, page, size, onPageChange, onSizeChange, onSortModelChange, isFetching } = useCategories();

  return (
    <Card sx={{ width: '100%' }}>
      <Box display='flex' width='100%' p={2} pb={0}>
        <DataGrid
          components={{ Toolbar: CategoriesTableToolbar }}
          style={{ border: 'none' }}
          loading={isFetching}
          rows={categories?.content || []}
          columns={categoriesTableColumns}
          disableColumnMenu
          sx={{ height: 'calc(100vh - 230px)' }}
          paginationMode='server'
          sortingMode='server'
          {...dataGridProps}
          rowsPerPageOptions={[30, 50, 100]}
          page={page}
          pageSize={size}
          rowCount={categories?.totalElements || 0}
          onPageChange={onPageChange}
          onPageSizeChange={onSizeChange}
          onSortModelChange={onSortModelChange}
        />
      </Box>
    </Card>
  );
};
