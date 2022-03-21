import React from 'react';
import { Button } from 'components/ui/extended/Button';
import { useTranslation } from 'hooks/useTranslation';

export type AttributesTableActionsCellProps = {
  attributeId: number;
};

export const AttributesTableActionsCell: React.FC<AttributesTableActionsCellProps> = () => {
  const { t } = useTranslation('modules.attributes.components.AttributesTable');

  return <Button variant='text' color='info' disabled children={t('columns.actions.edit')} />;
};
