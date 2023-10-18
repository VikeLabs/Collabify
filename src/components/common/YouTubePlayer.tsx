import { useDeviceDetect } from 'hooks';
import React from 'react';
import YouTube from 'react-youtube';

const YouTubePlayer = ({ videoId }) => {
    const { isMobile } = useDeviceDetect();

    const onReady = (event) => {
      const player = event.target;
      player.playVideo();
    };
  
    const onError = (error) => {
      console.error('YouTube Player Error:', error);
    };

    const opts = {
      height: '290',
      width: '540',
    };
  
    return (
      <YouTube
        videoId={videoId}
        onReady={onReady}
        onError={onError}
        opts={isMobile ? {opts}: {}}
      />
    );
  };
  
  export default YouTubePlayer;