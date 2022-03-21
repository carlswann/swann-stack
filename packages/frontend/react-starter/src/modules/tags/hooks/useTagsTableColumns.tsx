import { GridColDef } from '@mui/x-data-grid';
import { Chip } from '@mui/material';
import { useTranslation } from 'hooks/useTranslation';
import { TagsTableActionsCell } from '../components/TagsTableActionsCell';

export const useTagsTableColumns = (): GridColDef[] => {
  const { t } = useTranslation('modules.tags.components.TagsTable');

  const idColumn: GridColDef = {
    field: 'id',
    headerName: t('columns.id.headerName'),
  };

  const nameColumn: GridColDef = {
    field: 'name',
    flex: 1,
    headerName: t('columns.name.headerName'),
  };

  const activeColumn: GridColDef = {
    field: 'active',
    headerName: t('columns.active.headerName'),
    align: 'center',
    renderCell: ({ value: isActive }) => {
      const translationKey = isActive.toString() as 'true' | 'false';
      const chipColor = isActive ? 'success' : 'error';

      return <Chip size='small' color={chipColor} label={t(`columns.active.values.${translationKey}`)} />;
    },
  };

  const actionsColumn: GridColDef = {
    field: 'actions',
    sortable: false,
    filterable: false,
    headerName: t('columns.actions.headerName'),
    renderCell: ({ row: tag }) => <TagsTableActionsCell tagId={tag.id} active={tag.active} />,
  };

  return [idColumn, nameColumn, activeColumn, actionsColumn];
};
