import * as Icons from '@mui/icons-material';
import { useTheme } from '@mui/material';

interface PropType {
  icon: string;
}

function MuiIcon({ icon }: PropType) {
  const { palette } = useTheme();

  if (!icon) return;

  const IconComponent = Icons[icon];
  return <IconComponent style={{ color: palette.primary.main }} />;
}

const GroupIcons: string[] = [
  'SportsRugby',
  'SportsBasketball',
  'Computer',
  'MenuBook',
  'Palette',
  'MusicNote',
  'CameraAlt',
  'LocalFireDepartment',
  'MiscellaneousServices',
]

export { MuiIcon, GroupIcons}
