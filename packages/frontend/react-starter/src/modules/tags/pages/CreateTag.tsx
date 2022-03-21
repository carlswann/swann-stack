import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from 'routes';
import { TagForm } from '../components/forms/TagForm';
import SlideUpVisibleAnimation from 'components/ui/animations/SlideUpVisibleAnimation';

const CreateTag: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = useCallback(() => {
    const listTagsPageUrl = routes.catalog.children?.tags.url!;
    navigate(listTagsPageUrl, { replace: true });
  }, [navigate]);

  return (
    <SlideUpVisibleAnimation distance={100}>
      <TagForm onSubmit={handleSubmit} />
    </SlideUpVisibleAnimation>
  );
};

export default CreateTag;
