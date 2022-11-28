/* eslint-disable react/no-unescaped-entities */
import { List, ListItem, ListItemAvatar } from '@mui/material';
import { MuiIcon } from 'components/MuiIcon';
import { useRouter } from 'next/router';
import { GROUP, RECENT_GROUPS_STORED } from '../../constants'
import { ListSkeleton } from 'components/Tools';
import React, { useEffect, useState } from 'react'
import { Container } from 'components/Container';

import utilities from 'styles/utilities.module.css';
import style from 'styles/pages/tools.module.css';
import { Stack } from '@mui/system';
import { ArrowForward } from '@mui/icons-material';

export default function RecentGroups() {
  const router = useRouter();

  const [recentGroups, setRecentGroups] = useState([]);
  const [isLoading, setIsLoading] = useState()

  useEffect(() => {
    setIsLoading(true)
    const groupsStored = JSON.parse(localStorage.getItem(RECENT_GROUPS_STORED))
    if (groupsStored) {
      fetch(`${GROUP}/${groupsStored.map(e => e._id).join(',')}/multiple`)
        .then((res) => res.json())
        .then((result) => {
          if (result.ok) {
            setRecentGroups(result.groups)
          }
        })
        .finally(() => setIsLoading(false))
    } else {
      setIsLoading(false)
    }
  }, [])

  if (isLoading) return <ListSkeleton />;

  return (
    <Container 
      header='recently visited'
      leftIcon={'ArrowBack'}
      leftIconClick={() => router.back()}
      >
      {recentGroups?.length > 0 ?
      recentGroups?.map(e => (
        <List 
        key={e._id} 
        className={style.listBox}
        onClick={()=> router.replace(`/${e._id}`)}
        >
          <ListItem
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
      <h2 className={utilities.textCenter}>You have no recent groups, try using "Find Group"</h2>
      }

    </Container>
  )
}