import { LandingContainer } from 'components/common/LandingContainer'
import { Box, Button, Divider } from '@mui/material'
import StarIcon from '@mui/icons-material/Star';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
import styles from 'styles/pages/landing.module.css'
import util from 'styles/utilities.module.css'
import React from 'react'
import { useRouter } from 'next/router';
import YouTubePlayer from 'components/common/YouTubePlayer';
import { useEffect, useState } from 'react';
import { useBool } from 'hooks';
import { PrivateGroupTokens } from 'helper/privateGroupTokens';

export default function Landing() {
  const router = useRouter()
  return (
    <LandingContainer>
      <Box>
        <section className={styles.bannerContainer}>
          <div> 
            <h2 className={styles.bannerText}>
              Making Group Meetings Effortless
            </h2>
          </div>
        </section>
      </Box>
      <Box className={util.marginTop3}>
        <h2 className={styles.headerText}>
          Collabify makes coordinating times easier.
        </h2>
        <div className={styles.floatContainer}>
          <div className={styles.floatChild}>
            <div className={styles.imageContainer} onClick={()=> router.push('/create')}>
              <AddCircleOutlineIcon className={styles.icon}/>
              <h4 className={styles.imageText}>
                Create Group
              </h4>
            </div>
          </div>
          <div className={styles.floatChild}>
            <div className={styles.imageContainer} onClick={()=> router.push('/tools/findGroup')}>
              <SearchIcon className={styles.icon}/>
              <h4 className={styles.imageText}>
                Find Group
              </h4>
            </div>
          </div>
        </div>
      </Box>
      <Box className={styles.videoContainer}>
        <h2 className={styles.videoText}>
          How to use Collabify
        </h2>
        <YouTubePlayer videoId={'jcuntRqabCg'}/>
      </Box>
      <Box className={styles.blogContainer}>
        <h2 className={styles.blogText}>
          Join our community...
        </h2>
        <Button onClick={()=> router.push('https://discord.gg/SDSvrzxjGH')} className={styles.blogButton} variant="contained" size='large'>Discord</Button>
      </Box>
    </LandingContainer>
  )
}