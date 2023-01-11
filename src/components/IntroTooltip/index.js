import React from 'react'
import Tippy from '@tippyjs/react';
import { Button } from '@mui/material';

export const IntroTooltip = ({text, visible, close, closeAll, children}) => {
  return (
    <Tippy
    content={
    <div>
        <h4 style={{padding: '1em', textAlign: 'center', textTransform: 'uppercase'}}>{text}</h4>
        <Button onClick={closeAll} variant="text" style={{color: '#F47174', width: '50%'}}>Close all</Button>
        <Button onClick={close} style={{width: '50%'}} variant="contained">Close</Button>
    </div>
    }
    interactive={true}
    placement="bottom"
    visible={visible}
    >
        {children}
    </Tippy>
  )
}
