import PropTypes from 'prop-types';
import { MuiIcon } from 'components/MuiIcon';
import style from 'styles/components/groupBanner.module.css';

export const GroupBanner = ({ icon }) => {
  return (
    <section className={style.container}>
      <div className={style.iconContainer}>
        <MuiIcon icon={icon} />
      </div>
    </section>
  );
};

GroupBanner.propTypes = {
  icon: PropTypes.string.isRequired,
};
