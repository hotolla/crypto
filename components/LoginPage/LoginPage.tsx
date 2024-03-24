import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm, FormProvider } from 'react-hook-form';
import { Yup } from '@/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Typography, Container, Stack } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import * as authApi from '@/api/auth';
import { TextField } from '@/components/TextField';
import { useAuth } from '@/components/AuthProvider';

interface FormValues {
  email: string | null,
  password: string | null
}

const defaultValues = {
  email: '',
  password: ''
};

const validationSchema = Yup.object({
  email: Yup.string().nullable().required(),
  password: Yup.string().nullable().required()
});

export const LoginPage = () => {
  const [ isError, setIsError ] = useState(false);
  const router = useRouter();
  const form = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema)
  });
  const { login } = useAuth();

  const handleSubmit = (values: FormValues) => {
    authApi.login(values).then((data) => {
      login(data);
      router.push('/markets');
    }).catch(() => {
      setIsError(true);
    });
  };

  return (
    <Container maxWidth="xs">
      <FormProvider {...form}>
        <Stack sx={{ alignItems: 'center' }}>
          <Typography variant="h5" color="primary" mb={4}>
            Welcome to crypto exchange!
          </Typography>
          <LockOpenIcon  color="primary" fontSize="large"/>

          <Typography variant="h5" color="primary" mt={1}>
            Login to account:
          </Typography>
        </Stack>

        <Stack
          noValidate
          spacing={2}
          mt={4}
          component="form"
          onSubmit={(form.handleSubmit(handleSubmit))}
        >
          <TextField
            required
            type="email"
            name="email"
            label="E-mail address"
            placeholder="Enter e-mail ..."
          />

          <TextField
            required
            type="password"
            name="password"
            label="Password"
            placeholder="Enter password ..."
          />

          {isError &&
            <>
              <Typography align="center" color="error">
                Login details are not correct
              </Typography>
            </>
          }

          <Button
            type="submit"
            variant="contained"
            size="large"
          >
            Login
          </Button>

          <Typography>
            <Link href="/registration" style={{ textDecoration: 'none' }}>Forgot your password?</Link>
          </Typography>

          <Typography>
            <Link href="/registration" style={{ textDecoration: 'none' }}>Register a new account?</Link>
          </Typography>
        </Stack>
      </FormProvider>

      {/*<Button*/}
      {/*  variant="outlined"*/}
      {/*  startIcon={<AddLocationAltIcon />}*/}
      {/*  onClick={handleSubmit2}*/}
      {/*  sx={{mt: 2}}*/}
      {/*>*/}
      {/*  see location on the map*/}
      {/*</Button>*/}
    </Container>
  );
};
