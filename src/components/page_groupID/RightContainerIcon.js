import * as MuiIcon from '@mui/icons-material';

export const RightContainerIcon = ({ isMobile, handleClick }) => {
  const Icon = MuiIcon['EventAvailable'];

  return (
    <>
      <Icon
        onClick={handleClick}
        style={{
          color: 'white',
          position: 'absolute',
          marginTop: '0.2em',
          right: isMobile ? '3vw' : '2.5vw',
          cursor: 'pointer',
        }}
      />
    </>
  );
};
