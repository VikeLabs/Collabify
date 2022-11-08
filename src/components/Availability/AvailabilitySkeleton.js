import { Skeleton } from '@mui/material';
import { Container } from 'components/Container';
import style from 'styles/pages/availability.module.css';

export function AvailabilitySkeleton() {
  return (
    <Container header='loading...'>
      <Skeleton
        variant='text'
        className={style.headerTextSkeleton}
      ></Skeleton>
      <div className={style.calendarUpperBarSkeleton}>
        <Skeleton
          variant='rectangle'
          className={style.currentWeekSkeleton}
        />
      </div>
      <Skeleton
        variant='rectangle'
        className={style.calendarSkeleton}
      ></Skeleton>
      <Skeleton
        variant='text'
        className={style.headerTextSkeleton}
      ></Skeleton>
      <Skeleton
        variant='rectangle'
        className={style.inputBoxSkeleton}
      ></Skeleton>
    </Container>
  );
}
