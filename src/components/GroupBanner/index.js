import PropTypes from 'prop-types';
import * as MuiIcons from '@mui/icons-material'
import { useTheme } from '@mui/material';
import style from 'styles/components/groupBanner.module.css';

export const GroupBanner = ({ backgroundColor='#FFB703', icon='Today', iconBackgroundColor='#FB8500' }) => {
    const theme = useTheme()

    const IconComponent = MuiIcons[icon]

    return (
        <section className={style.container} style={{backgroundColor}}>
            <div className={style.iconContainer} style={{backgroundColor: iconBackgroundColor}}>
                <IconComponent style={{color: theme.palette.primary.main}}/>
            </div>
        </section>
    );
};

GroupBanner.propTypes = {
    icon: PropTypes.string.isRequired,
};
