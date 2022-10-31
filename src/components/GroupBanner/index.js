import PropTypes from 'prop-types';
import { MuiIcon } from 'components/MuiIcon';
import style from 'styles/components/groupBanner.module.css';
import { useTheme } from '@mui/material';

export const GroupBanner = ({
  icon,
}) => {
  const theme = useTheme()
  return (
    <section
      className={style.container}
      style={{ backgroundColor: theme.palette.secondary.light }}
    >
      <div
        className={style.iconContainer}
        style={{ backgroundColor: theme.palette.secondary.main }}
      >
        <MuiIcon icon={icon} />
      </div>
    </section>
  );
};

GroupBanner.propTypes = {
  icon: PropTypes.string.isRequired,
};
