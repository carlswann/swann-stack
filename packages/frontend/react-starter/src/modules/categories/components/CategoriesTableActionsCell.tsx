import React from 'react';
import { Button } from 'components/ui/extended/Button';
import { useTranslation } from 'hooks/useTranslation';

export type CategoriesTableActionsCellProps = {
  categoryId: number;
};

export const CategoriesTableActionsCell: React.FC<CategoriesTableActionsCellProps> = () => {
  const { t } = useTranslation('modules.categories.components.CategoriesTable');

  return <Button variant='text' color='info' disabled children={t('columns.actions.edit')} />;
};
