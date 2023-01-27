import style from 'styles/components/container.module.css';
import { AppBar } from '../../../node_modules/@material-ui/core/index';

interface PropType {
  header?: string;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  children: React.ReactNode;
}

export const Container = ({
  rightIcon,
  leftIcon,
  header,
  children,
}: PropType) => {
  return (
    <div>
      <AppBar
        className={style.headerContainer}
        position='static'
      >
        {leftIcon ? leftIcon : null}
        {header ? <h1 className={style.header}>{header}</h1> : null}
        {rightIcon ? rightIcon : null}
      </AppBar>

      <div className={style.child}>
        {/* styling for children node is NOT handled by this component */}
        <div className={style.content}>{children}</div>
      </div>
    </div>
  );
};
