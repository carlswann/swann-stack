import { GridColDef } from '@mui/x-data-grid';
import { useTranslation } from 'hooks/useTranslation';
import { AttributesTableActionsCell } from '../components/AttributesTableActionsCell';

export const useAttributesTableColumns = (): GridColDef[] => {
  const { t } = useTranslation('modules.attributes.components.AttributesTable');

  const idColumn: GridColDef = {
    field: 'id',
    headerName: t('columns.id.headerName'),
  };

  const nameColumn: GridColDef = {
    field: 'name',
    flex: 1,
    headerName: t('columns.name.headerName'),
  };

  const typeColumn: GridColDef = {
    field: 'type',
    headerName: t('columns.type.headerName'),
  };

  const groupColumn: GridColDef = {
    field: 'group',
    flex: 1,
    headerName: t('columns.group.headerName'),
  };

  const sequenceColumn: GridColDef = {
    field: 'sequence',
    headerName: t('columns.sequence.headerName'),
  };

  const requiredColumn: GridColDef = {
    field: 'required',
    headerName: t('columns.required.headerName'),
    renderCell: ({ value: isRequired }) => {
      const translationKey = isRequired.toString() as 'true' | 'false';

      return t(`columns.required.values.${translationKey}`);
    },
  };

  const defaultGlobalColumn: GridColDef = {
    field: 'defaultGlobal',
    minWidth: 150,
    headerName: t('columns.defaultGlobal.headerName'),
    renderCell: ({ value: isDefaultGlobal }) => {
      const translationKey = isDefaultGlobal.toString() as 'true' | 'false';

      return t(`columns.defaultGlobal.values.${translationKey}`);
    },
  };

  const optionsColumn: GridColDef = {
    field: 'options',
    flex: 1,
    headerName: t('columns.options.headerName'),
    renderCell: ({ value: options }) => options?.join(', '),
  };

  const actionsColumn: GridColDef = {
    field: 'actions',
    sortable: false,
    filterable: false,
    headerName: t('columns.actions.headerName'),
    renderCell: ({ row: attribute }) => <AttributesTableActionsCell attributeId={attribute.id} />,
  };

  return [idColumn, nameColumn, typeColumn, groupColumn, sequenceColumn, requiredColumn, defaultGlobalColumn, optionsColumn, actionsColumn];
};
