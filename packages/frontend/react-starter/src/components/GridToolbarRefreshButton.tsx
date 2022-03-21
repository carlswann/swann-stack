import React from 'react';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Button } from 'components/ui/extended/Button';
import { useTranslation } from 'hooks/useTranslation';

export type GridToolbarRefreshButtonProps = {
  onRefresh: () => void;
};

export const GridToolbarRefreshButton: React.FC<GridToolbarRefreshButtonProps> = ({ onRefresh }) => {
  const { t } = useTranslation('components.GridToolbarRefreshButton');

  return (
    <Button onClick={onRefresh} startIcon={<RefreshIcon />} variant='contained' size='small'>
      {t('refresh')}
    </Button>
  );
};
