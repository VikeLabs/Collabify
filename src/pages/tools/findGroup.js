import { Alert, InputAdornment, List, ListItem, ListItemAvatar, TextField } from '@mui/material';
import { MuiIcon } from 'components/MuiIcon';
import { useRouter } from 'next/router';
import { GROUP } from '../../constants'
import { ListSkeleton } from 'components/Tools';
import React, { useEffect, useState } from 'react'
import { Container } from 'components/Container';

import utilities from 'styles/utilities.module.css';
import style from 'styles/pages/tools.module.css';
import { Stack } from '@mui/system';
import { ArrowForward, Search } from '@mui/icons-material';
import { useAsyncFetch } from 'hooks';
import Head from 'next/head';

export default function RecentGroups() {
  const router = useRouter();

  const [data, isLoading, apiError] = useAsyncFetch(
    `${GROUP}/all`
  );

  const [groups, setGroups] = useState([]);
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (data) {
        setGroups(data.groups)
    }
  }, [data])

  const searchInput = (e) => {
    setSearch(() => e.target.value)
  }

  if (isLoading) return <ListSkeleton />;

  return (
    <>
      {apiError && <Alert severity='error'>{apiError}</Alert>}
      <Container 
      header='find group'
      leftIcon={'ArrowBack'}
      leftIconClick={() => router.back()}
      >
      <TextField
        label='Group Search'
        variant='filled'
        InputProps={{
          endAdornment: <InputAdornment position="start"><Search/></InputAdornment>,
        }}
        className={utilities.input}
        onChange={searchInput}
        value={search}
      />
      {groups?.length > 0 ?
      groups?.filter(e => e.name.includes(search)).map(e => (
          <List 
          key={e._id} 
          onClick={()=> router.replace(`/${e._id}`)}
          >
          <ListItem
          className={style.listBox}
          secondaryAction={
              <ArrowForward />
          }
          >
              <ListItemAvatar>
              <div
                  className={style.iconContainer}
              >
                  <MuiIcon icon={e.icon} />
              </div>
              </ListItemAvatar>
              <Stack>
              <h3>{e.name}</h3>
              <p>{e.description}</p>
              </Stack>
          </ListItem>
          </List>
      )) :
      <h2 className={utilities.textCenter}>No Groups Found</h2>
      }
      </Container>
      <Head>
        <title>Collabify - Find Group</title>
        <meta name="description" content="Search for a group"/>
      </Head>
    </>
  )
}