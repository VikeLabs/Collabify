import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Typography } from '@mui/material';
import { MuiIcon } from 'components/MuiIcon';

import style from 'styles/pages/home.module.css';
import utilities from 'styles/utilities.module.css';

export const RecentlyVisited = ({ groups }) => {
    const router = useRouter();

    return (
    <>
        <Typography
            variant='h5'
            className={[
            utilities.heading,
            utilities.marginTop1,
            utilities.marginBottom1,
            ]}
        >
            RECENTLY VISITED:
        </Typography>
        <ul className={style.recentlyVisitedContainer}>
            {groups?.map((group) => (
                <li 
                key={group._id}
                className={style.recentlyVisitedElement}
                >
                    <div
                    key={group.icon}
                    className={style.icon}
                    onClick={() => router.push(`/${group._id}`)}
                    >
                        <MuiIcon icon={group.icon} />
                    </div>
                    <span className={style.recentlyVisitedText}>{group.name}</span>
                </li>
            ))}
        </ul>
    </>
  );
};

RecentlyVisited.propTypes = {
  groups: PropTypes.array.isRequired,
};
