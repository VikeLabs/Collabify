import { Skeleton } from '@mui/material';
import { Container } from 'components/Container';
import utilities from 'styles/utilities.module.css'
import style from 'styles/pages/groupHome.module.css'

export function GroupPageSkeleton () {
    return (
        <Container header='loading...'>
            <Skeleton variant="rectangular" height={100}/>
            <div className={style.calendarUpperBarSkeleton}>
                <Skeleton variant="rectangle" className={style.weekBtnSkeleton}></Skeleton>
                <Skeleton variant="rectangle" className={style.currentWeekSkeleton}/>
                <Skeleton variant="rectangle" className={style.weekBtnSkeleton}></Skeleton>
            </div>
            <Skeleton variant='rectangle' className={style.calendarSkeleton}></Skeleton>
            <Skeleton variant='text' className={style.linkTextSkeleton}></Skeleton>
            <div className={style.linkDisplaySkeleton}>
                <Skeleton variant='rectangle' className={style.linkIconSkeleton}></Skeleton>
                <Skeleton variant='rectangle' className={style.linkSkeleton}></Skeleton>
            </div>
        </Container>
    )
}