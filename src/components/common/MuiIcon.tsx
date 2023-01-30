import * as Icons from '@mui/icons-material';
import { useTheme } from '@mui/material';

enum AllowedIcons {
  'SportsRugby',
  'SportsBasketball',
  'Computer',
  'MenuBook',
  'Palette',
  'MusicNote',
  'CameraAlt',
  'LocalFireDepartment',
  'MiscellaneousServices',
  'Lock',
}

const StringIsNumber = value => isNaN(Number(value)) === false;

const getAllIcons = () => {
  return Object.keys(AllowedIcons)
  .filter(StringIsNumber)
  .map(key => AllowedIcons[key]);
};

interface PropType {
  icon: AllowedIcons;
  setActiveIcon: React.Dispatch<React.SetStateAction<AllowedIcons>>;
}

function MuiIcon({ icon }: PropType) {
  const { palette } = useTheme();

  if (!icon) return;

  const IconComponent = Icons[icon];
  return <IconComponent style={{ color: palette.primary.main }} />;
}

export { AllowedIcons, MuiIcon, getAllIcons };
