import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import Card from 'components/ui/extended/Card';
import { AttributesTableToolbar } from './AttributesTableToolbar';
import { useAttributesTableColumns } from '../hooks/useAttributesTableColumns';
import { useDataGridPersistence } from 'hooks/useDataGridPersistence';
import { useAttributes } from '../hooks/useAttributes';

export const AttributesTable: React.FC = () => {
  const attributesTableColumns = useAttributesTableColumns();
  const { dataGridProps } = useDataGridPersistence({ tableName: 'AttributesTable' });
  const { attributes, isFetching } = useAttributes();

  return (
    <Card sx={{ width: '100%' }}>
      <Box display='flex' width='100%' p={2} pb={0}>
        <DataGrid
          components={{ Toolbar: AttributesTableToolbar }}
          style={{ border: 'none' }}
          loading={isFetching}
          rows={attributes || []}
          columns={attributesTableColumns}
          disableColumnMenu
          sx={{ height: 'calc(100vh - 230px)' }}
          {...dataGridProps}
        />
      </Box>
    </Card>
  );
};
