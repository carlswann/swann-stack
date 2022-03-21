import React, { useCallback, useEffect, useState } from 'react';
import { Button } from 'components/ui/extended/Button';
import { pimApi } from 'apis/pim/api';
import { useTranslation } from 'hooks/useTranslation';

export type TagsTableActionsCellProps = {
  tagId: number;
  active: boolean;
};

const { useUpdateOneTagMutation } = pimApi;

export const TagsTableActionsCell: React.FC<TagsTableActionsCellProps> = ({ tagId, active }) => {
  const [isActive, setIsActive] = useState(active);
  const [updateOneTag, { isLoading, isSuccess }] = useUpdateOneTagMutation();
  const { t } = useTranslation('modules.tags.components.TagsTable');

  const toggleTagActiveStatus = useCallback(() => {
    if (isLoading) {
      return;
    }

    updateOneTag({ id: tagId, active: !isActive });
  }, [updateOneTag, isActive, isLoading, tagId]);

  // update the state after the api request has run
  useEffect(() => {
    if (isSuccess) {
      setIsActive((isActive) => !isActive);
    }
  }, [isSuccess]);

  // Update the local state if the list is refreshed
  useEffect(() => {
    setIsActive(active);
  }, [active]);

  const translationKey = isActive ? 'deactivate' : 'activate';
  const color = isActive ? 'error' : 'info';

  return <Button variant='text' color={color} disabled={isLoading} onClick={toggleTagActiveStatus} children={t(`columns.actions.${translationKey}`)} />;
};
