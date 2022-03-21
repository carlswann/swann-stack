import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import Card from 'components/ui/extended/Card';
import { TagsTableToolbar } from './TagsTableToolbar';
import { useTagsTableColumns } from '../hooks/useTagsTableColumns';
import { useDataGridPersistence } from 'hooks/useDataGridPersistence';
import { useTags } from '../hooks/useTags';

export const TagsTable: React.FC = () => {
  const { tags, isFetching } = useTags();
  const tagsTableColumns = useTagsTableColumns();
  const { dataGridProps } = useDataGridPersistence({ tableName: 'TagsTable' });

  return (
    <Card sx={{ width: '100%' }}>
      <Box display='flex' width='100%' p={2} pb={0}>
        <DataGrid
          components={{ Toolbar: TagsTableToolbar }}
          style={{ border: 'none' }}
          loading={isFetching}
          rows={tags || []}
          columns={tagsTableColumns}
          disableColumnMenu
          sx={{ height: 'calc(100vh - 230px)' }}
          {...dataGridProps}
        />
      </Box>
    </Card>
  );
};
