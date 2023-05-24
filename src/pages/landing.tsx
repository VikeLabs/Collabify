import { LandingContainer } from 'components/common/LandingContainer'
import { Box, Button } from '@material-ui/core'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
import styles from 'styles/pages/landing.module.css'
import util from 'styles/utilities.module.css'
import React from 'react'

export default function Landing() {
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
            <div className={styles.imageContainer}>
              <AddCircleOutlineIcon className={styles.icon}/>
              <h4 className={styles.imageText}>
                Create Group
              </h4>
            </div>
          </div>
          <div className={styles.floatChild}>
            <div className={styles.imageContainer}>
              <SearchIcon className={styles.icon}/>
              <h4 className={styles.imageText}>
                Find Group
              </h4>
            </div>
          </div>
        </div>
      </Box>
      <Box className={styles.testimonialContainer}>
        <h2 className={styles.testimonialText}>
          Testimonials from satisfied customers
        </h2>

      </Box>
      <Box className={styles.blogContainer}>
        <h2 className={styles.blogText}>
          More Collabify topics...
        </h2>
        <Button variant="contained">Visit Blog</Button>
      </Box>
    </LandingContainer>
  )
}