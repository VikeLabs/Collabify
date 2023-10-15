/* eslint-disable react/no-unescaped-entities */
import { List, ListItem, ListItemAvatar } from '@mui/material';
import { MuiIcon, Container } from 'components/common';
import { useRouter } from 'next/router';
import { RECENT_GROUPS_STORED, GROUP } from 'constants/index';
import { ListSkeleton } from 'components/skeletons';
import React, { useEffect, useState } from 'react';

import utilities from 'styles/utilities.module.css';
import style from 'styles/pages/tools.module.css';
import { Stack } from '@mui/system';
import { ArrowForward } from '@mui/icons-material';
import Head from 'next/head';

export default function RecentGroups() {
  const router = useRouter();

  const [recentGroups, setRecentGroups] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    const groupsStored = JSON.parse(localStorage.getItem(RECENT_GROUPS_STORED));
    if (groupsStored) {
      // Build query string
      let url = `${GROUP}/multiple?`;
      for (const id of groupsStored) {
        url += `groupID=${id}&`;
      }

      console.log(url);

      // fetch
      fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
        .then((res) => {
          switch (res.status) {
            case 200:
              return res.json();

            default:
              throw new Error(`Unhandled status code: ${res.status}`);
          }
        })
        .then((result) => {
          if (result) {
            console.log(result);
            setRecentGroups(() => result);
          }
        })
        .then(() => setIsLoading(() => false))
        .catch((e) => {
          console.log(e);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) return <ListSkeleton />;

  return (
    <>
      <Container
        header='recently visited'
        leftIcon={'ArrowBack'}
        leftIconClick={() => router.back()}
      >
        {recentGroups?.length > 0 ? (
          recentGroups?.map((e) => (
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
          <h2 className={utilities.textCenter}>
            You have no recent groups, try using "Find Group"
          </h2>
        )}
      </Container>
      <Head>
        <title>Collabify - Recent Group</title>
        <meta
          name='description'
          content='Revisit your recently visited groups'
        />
      </Head>
    </>
  );
}
