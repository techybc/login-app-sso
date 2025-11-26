import React from 'react';

import MuiButton from '@mui/material/Button';
import type { ButtonProps as MuiButtonProps } from '@mui/material/Button';

export interface ButtonProps extends MuiButtonProps {
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  fullWidth,
  sx,
  children,
  ...rest
}) => {
  return (
    <MuiButton
      disableElevation
      fullWidth={fullWidth}
      sx={{
        textTransform: 'none',
        fontWeight: 700,
        borderRadius: '10px',
        paddingY: 1.5,
        bgcolor: 'var(--color-primary)',
        color: 'var(--color-text-light)',
        '&:hover': {
          bgcolor: 'var(--color-primary-dark)',
        },
        '&.Mui-disabled': {
          bgcolor: 'var(--color-primary)',
          opacity: 0.5,
          color: 'var(--color-text-light)',
        },
        ...sx,
      }}
      {...rest}
    >
      {children}
    </MuiButton>
  );
};

export default Button;

