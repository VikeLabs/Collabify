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
        <MuiIcon icon={icon} setActiveIcon={function (value: SetStateAction<AllowedIcons>): void {
          throw new Error('Function not implemented.');
        } } />
      </div>
    </section>
  );
};