import { useState } from 'react';
import { Credentials } from 'blog/api/types';
import { useRouter } from 'next/router';

type Input = React.ChangeEvent<HTMLInputElement>;

export function useEmployee() {
  const [credential, setCredential] = useState<Credentials>({
    email: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>();

  const onEmail = (e: Input) => {
    setCredential((c) => ({ ...c, email: e.target.value }));
  };

  const onPassword = (e: Input) => {
    setCredential((c) => ({ ...c, password: e.target.value }));
  };

  const onLogin = async () => {
    try {
      setIsLoading(() => true);
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(credential),
      });

      if (res.status !== 200) {
        setError(() => `server status: ${res.status}`);
        return;
      }

      const token = await res.text();
      // save token ls
      // navigate to admin page
      console.log(token);
      setIsLoading(() => false);
    } catch (e) {
      console.log(e);
    }
  };

  const nav = useRouter();

  const [username, setUserName] = useState<string>('');
  const onUsername = (e: Input) => setUserName(() => e.target.value);
  const onRegister = async () => {
    try {
      setIsLoading(() => true);
      const res = await fetch('/api/admin/auth/register', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ ...credential, username }),
      });

      if (res.status !== 201) {
        setError(() => `server status: ${res.status}`);
        setIsLoading(() => false);
        return;
      }

      nav.back();
    } catch (e) {
      console.log(e);
    }
  };

  return {
    credential,
    onEmail,
    onPassword,
    onLogin,
    onUsername,
    username,
    onRegister,
    isLoading,
    error,
  };
}
