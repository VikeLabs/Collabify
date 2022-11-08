import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { MuiIcon } from 'components/MuiIcon';

import style from 'styles/pages/home.module.css';
import utilities from 'styles/utilities.module.css';

export const RecentlyVisited = ({ groups }) => {
  const router = useRouter();

  return (
    <>
      <h2 className={utilities.heading}>RECENTLY VISITED:</h2>
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
