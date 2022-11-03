import { Tooltip } from '@mui/material';
import { BugReport as Bug } from '@mui/icons-material';

import style from 'styles/components/bugReport.module.css';

const GOOGLE_FORM =
  'https://docs.google.com/forms/d/1qFzUXBbJDWL8OlkZ0rvqI8HatLYfRromx_anyjk0YmQ/prefill';

export const BugReport = () => {
  return (
    <Tooltip title='Bug, feedback, suggestions!'>
      <a
        className={style.bug}
        href={GOOGLE_FORM}
        target='_blank'
      >
        <Bug />
      </a>
    </Tooltip>
  );
};
