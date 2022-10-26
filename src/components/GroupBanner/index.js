import PropTypes from 'prop-types';
import * as MuiIcons from '@mui/icons-material'
import style from 'styles/components/groupBanner.module.css';

export const GroupBanner = ({ backgroundColor, icon='Today', iconBackgroundColor }) => {
    const IconComponent = MuiIcons[icon]
    return (
        <section className={style.container} style={{backgroundColor}}>
            <div className={style.iconContainer} style={{backgroundColor: iconBackgroundColor}}>
                <IconComponent />
            </div>
        </section>
    );
};

GroupBanner.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  iconBackgroundColor: PropTypes.node.isRequired,
};
