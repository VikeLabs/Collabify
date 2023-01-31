import { AllowedIcons, MuiIcon } from 'components/common/MuiIcon';
import { SetStateAction } from 'react';
import style from 'styles/components/groupBanner.module.css';

interface PropType {
  icon: AllowedIcons;
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