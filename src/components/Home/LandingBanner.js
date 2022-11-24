/* eslint-disable @next/next/no-img-element */
import React from 'react'

import Banner from '../../../public/assets/Banner.svg';
import Image from 'next/image';

export const LandingBanner = () => (
    <div style={{display: 'flex', justifyContent: 'center'}}>
        <Image src={Banner} alt="Banner"/>
    </div>
)
