import { Tooltip } from '@mui/material';
import { BugReport as Bug } from '@mui/icons-material';

import style from 'styles/components/bugReport.module.css';

export const BugReport = () => {
  return (
    <Tooltip title='Bug, feedback, suggestions!'>
      <a
        className={style.bug}
        href={
          'https://docs.google.com/forms/d/1qFzUXBbJDWL8OlkZ0rvqI8HatLYfRromx_anyjk0YmQ/prefill'
        }
        target='_blank'
        rel='noopener noreferrer'
      >
        <Bug />
      </a>
    </Tooltip>
  );
};
