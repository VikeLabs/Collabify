import SportsRugbyIcon from '@mui/icons-material/SportsRugby';
import SportsBasketball from '@mui/icons-material/SportsBasketball';
import ComputerIcon from '@mui/icons-material/Computer';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Palette from '@mui/icons-material/Palette';
import MusicNote from '@mui/icons-material/MusicNote';
import CameraAlt from '@mui/icons-material/CameraAlt';
import LocalFireDepartment from '@mui/icons-material/LocalFireDepartment';
import MiscellaneousServices from '@mui/icons-material/MiscellaneousServices';

import PropTypes from 'prop-types';

export const MuiIcon = ({ icon }) => {
  switch (icon) {
    case 'rugby':
      return <SportsRugbyIcon />;
    case 'basketball':
      return <SportsBasketball />;
    case 'computer':
      return <ComputerIcon />;
    case 'book':
      return <MenuBookIcon />;
    case 'palette':
      return <Palette />;
    case 'music':
      return <MusicNote />;
    case 'camera':
      return <CameraAlt />;
    case 'fire':
      return <LocalFireDepartment />;
    case 'misc':
      return <MiscellaneousServices />;
    default:
      throw new Error(`no icon of ${icon} found`);
  }
};

MuiIcon.propTypes = {
  icon: PropTypes.string.isRequired,
};
