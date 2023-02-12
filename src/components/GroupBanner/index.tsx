import { MuiIcon } from 'components/common/MuiIcon';
import style from 'styles/components/groupBanner.module.css';

interface PropType {
  icon: string;
}

export const GroupBanner = ({ icon }: PropType) => {
  return (
    <section className={style.container}>
      <div className={style.iconContainer}>
        <MuiIcon icon={icon} />
      </div>
    </section>
  );
};