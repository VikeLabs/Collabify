import * as Icons from '@mui/icons-material';
import { useTheme } from '@mui/material';

enum AllowedIcons {
  Rugby = 'SportsRugby',
  Basketball = 'SportsBasketball',
  Computer = 'Computer',
  Menu = 'MenuBook',
  Palette = 'Palette',
  Music = 'MusicNote',
  Camera = 'CameraAlt',
  Fire = 'LocalFireDepartment',
  Misc = 'MiscellaneousServices',
  Lock = 'Lock',
}

interface PropType {
  icon: AllowedIcons;
  setActiveIcon: React.Dispatch<React.SetStateAction<AllowedIcons>>;
}

function MuiIcon({ icon }: PropType) {
  const { palette } = useTheme();

  const IconComponent = Icons[icon];
  return <IconComponent style={{ color: palette.primary.main }} />;
}

export { AllowedIcons, MuiIcon };
