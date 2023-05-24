import {
  Alert,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  TextField,
} from '@mui/material';
import { MuiIcon, Container } from 'components/common';
import { useRouter } from 'next/router';
import { GROUP } from 'constants/index';
import { ListSkeleton } from 'components/skeletons';
import React, { useEffect, useState } from 'react';
import utilities from 'styles/utilities.module.css';
import style from 'styles/pages/tools.module.css';
import { Stack } from '@mui/system';
import { ArrowForward, Search } from '@mui/icons-material';
import Head from 'next/head';
import s from 'styles/pages/tools.module.css';

export default function RecentGroups() {
  const router = useRouter();
  const { groups, query, handleSearch, isLoading, error } =
    useSearchDebounced();

  return (
    <>
      {error && <Alert severity='error'>{error}</Alert>}
      <Container
        header='find group'
        leftIcon={'ArrowBack'}
        leftIconClick={() => router.replace('/')}
      >
        <TextField
          label='Group Search'
          variant='filled'
          InputProps={{
            endAdornment: (
              <InputAdornment position='start'>
                <Search />
              </InputAdornment>
            ),
          }}
          className={utilities.input}
          onChange={handleSearch}
          value={query}
        />
        {isLoading ? (
          <ListSkeleton />
        ) : query === '' ? (
          <div className={s.noGroupsContainer}>
            <p>Start typing to search for groups</p>
          </div>
        ) : groups.length > 0 ? (
          groups
            .filter((e) => e.name.includes(query))
            .map((e) => (
              <List
                key={e.id}
                onClick={() => router.replace(`/${e.id}`)}
              >
                <ListItem
                  className={style.listBox}
                  secondaryAction={<ArrowForward />}
                >
                  <ListItemAvatar>
                    <div className={style.iconContainer}>
                      <MuiIcon icon={e.isPrivate ? 'Lock' : e.icon} />
                    </div>
                  </ListItemAvatar>
                  <Stack>
                    <h3>{e.name}</h3>
                    <p>{e.description}</p>
                  </Stack>
                </ListItem>
              </List>
            ))
        ) : (
          <h2 className={utilities.textCenter}>No Groups Found</h2>
        )}
      </Container>
      <Head>
        <title>Collabify - Find Group</title>
        <meta
          name='description'
          content='Search for a group'
        />
      </Head>
    </>
  );
}

function useSearchDebounced() {
  const [groups, setGroups] = useState<any[]>([]); // TODO: types for this
  const [query, setQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function getGroups() {
    const q = new URLSearchParams({ q: query }).toString();
    try {
      const response = await fetch(`${GROUP}/find?${q}`);

      switch (response.status) {
        case 200:
          const data = await response.json();
          setGroups(() => data);
          break;
        case 404:
          setGroups(() => []);
          break;
        default:
          setError(() => 'Something went wrong, try again later.');
          console.log(response.status);
          break;
      }
    } catch (e) {
      setError(() => "Server isn't responding, try again later.");
    } finally {
      setIsLoading(() => false);
    }
  }

  useEffect(() => {
    const id = setTimeout(() => {
      if (query !== '') getGroups();
      else setIsLoading(() => false);
    }, 500);
    return () => clearTimeout(id);
  }, [query]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(() => true); // set to false in the finally block
    setQuery(() => e.target.value);
  };

  return { groups, query, handleSearch, isLoading, error };
}
