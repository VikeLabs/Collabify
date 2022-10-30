import * as Icons from '@mui/icons-material';
import { useTheme } from '@mui/material';

import { getAllIcons } from './icons';

import PropTypes from 'prop-types';

export const MuiIcon = ({ icon }) => {
  const theme = useTheme();
  const style = { color: theme.palette.primary.main };

  // Error: Not one of the icon selected during team meeting
  if (!getAllIcons().includes(icon)) {
    throw new Error(`${icon} is allowed`);
  }

  const IconComponent = Icons[icon];
  return <IconComponent style={style} />;
};

MuiIcon.propTypes = {
  icon: PropTypes.string.isRequired,
};
