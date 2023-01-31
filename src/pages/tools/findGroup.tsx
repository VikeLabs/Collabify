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

export default function RecentGroups() {
  const router = useRouter();
  const { groups, query, handleSearch, isLoading, error } =
    useSearchDebounced();

  if (isLoading) return <ListSkeleton />;

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
        {groups.length > 0 ? (
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
  // TODO: add a debounce to this so request
  const [groups, setGroups] = useState<any[] | null>([]); // TODO: types for this
  const [query, setQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setIsLoading(() => true);
      try {
        const res = await fetch(`${GROUP}/all`, {
          method: 'GET',
          headers: { 'content-type': 'application/json' },
        });

        if (res.status === 200) {
          const data = await res.json();
          console.log(data);
          setGroups(() => data);
          setIsLoading(() => false);
        }
      } catch (e) {
        setError(
          () => 'Cannot perform that action right now, try again later.'
        );
      }
    })();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(() => e.target.value);
  };

  return { groups, query, handleSearch, isLoading, error };
}
