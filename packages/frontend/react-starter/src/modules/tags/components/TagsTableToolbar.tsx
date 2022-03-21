import React, { useCallback } from 'react';
import { GridToolbar } from 'components/GridToolbar';
import { useTranslation } from 'hooks/useTranslation';
import { useNavigate } from 'react-router-dom';
import { routes } from 'routes';
import { useTags } from '../hooks/useTags';

export const TagsTableToolbar: React.FC = () => {
  const { refetch } = useTags();
  const navigate = useNavigate();
  const { t } = useTranslation('modules.tags.components.forms');

  const onNewTagClicked = useCallback(() => {
    const listTagsPageUrl = routes.catalog.children?.tags.children?.create.url!;
    navigate(listTagsPageUrl, { replace: true });
  }, [navigate]);

  return (
    <GridToolbar
      onRefresh={refetch}
      createButton={{
        onClick: onNewTagClicked,
        label: t('TagForm.title'),
      }}
    />
  );
};
