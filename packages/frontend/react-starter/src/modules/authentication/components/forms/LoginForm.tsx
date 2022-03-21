import { useState } from 'react';
import { useTranslation } from 'hooks/useTranslation';

import * as Yup from 'yup';

import { TextField } from 'components/forms/TextField';
import { Form } from 'components/forms/Form';
import { LoginFormHeader } from './LoginFormHeader';
import { authenticationSlice } from '../../state/authenticationSlice';
import { appApi } from 'apis/app/api';

import { IconButton, InputAdornment } from '@mui/material';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { useAppDispatch } from 'hooks/useAppDispatch';

const { useReadDemoQuery } = appApi;

export function LoginForm() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('modules.authentication.components.LoginForm');

  const [showPassword, setShowPassword] = useState(false);

  // const [authenticateUser] = useAuthenticateUserMutation();
  // const [readCurrentUser] = useLazyReadCurrentUserQuery();

  const validationSchema = Yup.object({
    email: Yup.string().email().max(255).required(),
    password: Yup.string().max(255).required(),
  });

  const onSubmit = async (values: Yup.InferType<typeof validationSchema>) => {
    const authParams = {
      username: values.email,
      password: values.password,
      type: 'account' as const,
    };

    // const { token: authToken } = await authenticateUser(authParams).unwrap();
    // const currentUser = await readCurrentUser({ authToken }).unwrap();

    // dispatch(authenticationSlice.actions.login({ authToken, currentUser }));
  };

  return (
    <>
      <LoginFormHeader />

      <Form
        initialValues={{
          email: '',
          password: '',
        }}
        submitButtonLabel={t('emailSignInAction')}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <TextField name='email' type='email' label={t('form.emailLabel')} errorTranslationKey='modules.authentication.components.LoginForm.form.emailLabel' />

        <TextField
          name='password'
          type={showPassword ? 'text' : 'password'}
          label={t('form.passwordLabel')}
          errorTranslationKey='modules.authentication.components.LoginForm.form.passwordLabel'
          endAdornment={
            <InputAdornment position='end'>
              <IconButton
                aria-label='toggle password visibility'
                onClick={() => setShowPassword(!showPassword)}
                onMouseDown={(event) => event.preventDefault()}
                edge='end'
                size='large'
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </Form>
    </>
  );
}
