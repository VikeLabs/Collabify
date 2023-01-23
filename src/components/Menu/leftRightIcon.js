export const LeftIcon = (props) => {
  return (
    <props.LeftIconComponent
      // onClick={leftIconClick}
      // icon={leftIcon}
      style={{
        color: 'white',
        position: 'absolute',
        marginTop: '0.2em',
        cursor: 'pointer',
      }}
    />
  );
};
export const RightIcon = (props) => {
  return (
    <props.RightIconComponent
      // onClick={rightIconClick}
      // icon={rightIcon}
      style={{
        color: 'white',
        position: 'absolute',
        marginTop: '0.2em',
        right: isMobile ? '3vw' : '2.5vw',
        cursor: 'pointer',
      }}
    />
  );
};
