import * as MuiIcon from '@mui/icons-material';

/*
interface PropType {
  handleClick: () => void
}
*/
export const LeftContainerIcon = ({ handleClick }) => {
  const Icon = MuiIcon['ArrowBack'];

  return (
    <>
      <Icon
        onClick={handleClick}
        style={{
          color: 'white',
          position: 'absolute',
          marginTop: '0.2em',
          cursor: 'pointer',
        }}
      />
    </>
  );
};
