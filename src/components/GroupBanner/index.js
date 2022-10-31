import PropTypes from 'prop-types';
import { MuiIcon } from 'components/MuiIcon';
import style from 'styles/components/groupBanner.module.css';

export const GroupBanner = ({
  backgroundColor = '#FFB703',
  icon,
  iconBackgroundColor = '#FB8500',
}) => {
  return (
    <section
      className={style.container}
      style={{ backgroundColor }}
    >
      <div
        className={style.iconContainer}
        style={{ backgroundColor: iconBackgroundColor }}
      >
        <MuiIcon icon={icon} />
      </div>
    </section>
  );
};

GroupBanner.propTypes = {
  icon: PropTypes.string.isRequired,
};
