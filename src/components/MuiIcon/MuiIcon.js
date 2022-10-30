import SportsRugbyIcon from '@mui/icons-material/SportsRugby';
import SportsBasketball from '@mui/icons-material/SportsBasketball';
import ComputerIcon from '@mui/icons-material/Computer';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Palette from '@mui/icons-material/Palette';
import MusicNote from '@mui/icons-material/MusicNote';
import CameraAlt from '@mui/icons-material/CameraAlt';
import LocalFireDepartment from '@mui/icons-material/LocalFireDepartment';
import MiscellaneousServices from '@mui/icons-material/MiscellaneousServices';
import { useTheme } from '@mui/material';

import PropTypes from 'prop-types';

export const MuiIcon = ({ icon }) => {
  const theme = useTheme();
  const style = { color: theme.palette.primary.main };
  switch (icon) {
    case 'rugby':
      return <SportsRugbyIcon style={style} />;
    case 'basketball':
      return <SportsBasketball style={style} />;
    case 'computer':
      return <ComputerIcon style={style} />;
    case 'book':
      return <MenuBookIcon style={style} />;
    case 'palette':
      return <Palette style={style} />;
    case 'music':
      return <MusicNote style={style} />;
    case 'camera':
      return <CameraAlt style={style} />;
    case 'fire':
      return <LocalFireDepartment style={style} />;
    case 'misc':
      return <MiscellaneousServices style={style} />;
    default:
      throw new Error(`no icon of ${icon} found`);
  }
};

MuiIcon.propTypes = {
  icon: PropTypes.string.isRequired,
};
