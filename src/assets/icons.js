/* This file contains all the icons
 * the function and `allIcons` are exported
 * to access needed icon.
 * */
import SportsRugbyIcon from '@mui/icons-material/SportsRugby';
import SportsBasketball from '@mui/icons-material/SportsBasketball';
import ComputerIcon from '@mui/icons-material/Computer';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Palette from '@mui/icons-material/Palette';
import MusicNote from '@mui/icons-material/MusicNote';
import CameraAlt from '@mui/icons-material/CameraAlt';
import LocalFireDepartment from '@mui/icons-material/LocalFireDepartment';
import MiscellaneousServices from '@mui/icons-material/MiscellaneousServices';

/* IMPORTANT: Immutable object - _icons is not exported and will not
 * be accessed directly. This ensures if one is mutating this object by
 * accident, other parts of the codebase won't be affected
 */
const _icons = [
  'rugby',
  'basketball',
  'computer',
  'book',
  'palette',
  'music',
  'camera',
  'fire',
  'misc',
];

/* This component renders the corrent icon, if not it will throw an error */
const Icon = ({ icon }) => {
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

/* allIcons()
 * @return: a deep copy of the icons
 * */
const getAllIcons = () => {
  return [..._icons];
};

export { Icon, getAllIcons };
