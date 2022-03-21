import { useTranslation } from 'hooks/useTranslation';

import * as Yup from 'yup';

import { TextField } from 'components/forms/TextField';
import { Form } from 'components/forms/Form';

export type TagFormProps = {
  onSubmit?: () => void;
};

export const TagForm: React.FC<TagFormProps> = ({ onSubmit }) => {
  const { t } = useTranslation('modules.tags.components.forms.TagForm');
  // const [createTag] = useCreateTagMutation();

  const validationSchema = Yup.object({
    name: Yup.string().min(1).max(512).required(),
  });

  const handleSubmit = async (values: Yup.InferType<typeof validationSchema>) => {
    // await createTag(values).unwrap();
    onSubmit?.();
  };

  return (
    <Form
      initialValues={{
        name: '',
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <TextField name='name' type='name' label={t('fields.name.label')} errorTranslationKey='modules.tags.components.forms.TagForm.fields.name.label' />
    </Form>
  );
};
