import React from 'react';

import { Box, Typography } from '@mui/material';

import styles from './aiPoweredAnalytics.module.scss';

const AiPoweredAnalytics: React.FC = () => {
  return (
    <Box className={styles.container}>
      <Box className={styles.logoBadge}>LOGO</Box>

      <Box className={styles.body}>
        <Typography component="h2" className={styles.title}>
          AI Powered Analytics
        </Typography>
        <Typography className={styles.subtitle}>
          Get personalized data and insights from AI within seconds.
        </Typography>

        <Box className={styles.carouselDots}>
          <Box component="span" className={`${styles.dot} ${styles.dotActive}`} />
          <Box component="span" className={styles.dot} />
          <Box component="span" className={styles.dot} />
        </Box>
      </Box>
    </Box>
  );
};

export default AiPoweredAnalytics;

