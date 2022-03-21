import { Chip } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useTranslation } from 'hooks/useTranslation';
import { CategoriesTableActionsCell } from '../components/CategoriesTableActionsCell';
import { CATEGORY_STATUS, CATEGORY_STATUS_TRANSLATION_KEYS } from '../config/constants';

export const useCategoriesTableColumns = (): GridColDef[] => {
  const { t } = useTranslation('modules.categories.components.CategoriesTable');

  return [
    {
      field: 'id',
      headerName: t('columns.id.headerName'),
    },
    {
      field: 'name',
      sortable: false,
      flex: 1,
      headerName: t('columns.name.headerName'),
      renderCell: ({ row: category }) => category.name || '-',
    },
    {
      field: 'parent.name',
      sortable: false,
      flex: 1,
      headerName: t('columns.parent.headerName'),
      renderCell: ({ row: category }) => category.parent?.name || '-',
    },
    {
      field: 'slug',
      sortable: false,
      headerName: t('columns.slug.headerName'),
      renderCell: ({ row: category }) => category.slug || '-',
    },
    {
      field: 'status',
      sortable: false,
      headerName: t('columns.status.headerName'),
      renderCell: ({ row: category }) => {
        let status = CATEGORY_STATUS_TRANSLATION_KEYS.PUBLISHED;
        let chipColor: 'success' | 'warning' | 'info' = 'success';

        if (category.categoryStatus === CATEGORY_STATUS.DRAFT) {
          status = CATEGORY_STATUS_TRANSLATION_KEYS.DRAFT;
          chipColor = 'warning';
        } else if (category.hasProducts) {
          status = CATEGORY_STATUS_TRANSLATION_KEYS.EMPTY;
          chipColor = 'info';
        }

        return <Chip size='small' color={chipColor} label={t(`columns.status.values.${status}`)} />;
      },
    },
    {
      field: 'actions',
      sortable: false,
      filterable: false,
      headerName: t('columns.actions.headerName'),
      renderCell: ({ row: category }) => <CategoriesTableActionsCell categoryId={category.id} />,
    },
  ];
};
