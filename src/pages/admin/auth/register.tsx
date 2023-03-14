import { Box, Button, TextField } from '@mui/material';
import { PasswordInput } from 'blog/components/commons';
import { CardLayout } from 'blog/components/commons/CardLayout';
import { useEmployee } from 'blog/hooks/useEmployee';
import { useRouter } from 'next/router';

export default function RegisterPage() {
  const {
    onEmail,
    onPassword,
    credential,
    isLoading,
    error,
    username,
    onUsername,
    onRegister,
  } = useEmployee();

  const { email, password } = credential;
  const formInvalid: boolean =
    email === '' || password === '' || username === '';

  const nav = useRouter();

  return (
    <CardLayout heading='Register'>
      <Box
        display='flex'
        flexDirection='column'
        gap='1rem'
        mt='1rem'
      >
        <TextField
          label='username'
          value={username}
          onChange={onUsername}
        />

        <TextField
          label='email'
          value={email}
          onChange={onEmail}
        />

        <PasswordInput
          password={password}
          onInput={onPassword}
        />
      </Box>

      <Box
        mt='1rem'
        display='flex'
        justifyContent='center'
        gap='1rem'
      >
        <Button onClick={() => nav.replace('/admin/auth')}>Cancel</Button>
        <Button
          variant='contained'
          disabled={formInvalid}
          onClick={onRegister}
        >
          Register
        </Button>
      </Box>
    </CardLayout>
  );
}
