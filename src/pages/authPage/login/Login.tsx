import React, { useState } from 'react';
import type { FormEvent } from 'react';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '@mui/icons-material/Google';
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material';

import Button from '../../../common/components/ui/button/Button';
import AiPoweredAnalytics from './aiPoweredAnalytics/AiPoweredAnalytics';
import type { LoginProps } from '../../../types';
import styles from './login.module.scss';
import OtpModel from './otpModel/OtpModel';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Login: React.FC<LoginProps> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isOtpOpen, setIsOtpOpen] = useState(false);

  const isEmailValid = emailRegex.test(email);
  const isPasswordValid = password.trim().length > 0;
  const isFormValid = isEmailValid && isPasswordValid;

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isFormValid) return;
    // eslint-disable-next-line no-console
    console.log('Login submitted', { email, password });
    setIsOtpOpen(true);
  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
  };

  const handleCloseOtp = () => {
    setIsOtpOpen(false);
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        {/* Left: Login form */}
        <div className={styles.formColumn}>
          <div className={styles.header}>
            <Typography
              component="h1"
              className={styles.title}
              sx={{ fontWeight: 600, color: 'var(--color-text)' }}
            >
              Login
            </Typography>
            <Typography className={styles.subtitle}>
              Simplify your management and boost your productivity with{' '}
              <span className={styles.subtitleHighlight}>YBA!</span>
            </Typography>
          </div>

          <Button
            type="button"
            onClick={handleGoogleLogin}
            fullWidth
            sx={{
              bgcolor: '#ffffff',
              color: '#222222',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
              borderRadius: '12px',
              '&:hover': { bgcolor: '#ffffff' },
            }}
            className={`${styles.button} ${styles.buttonGoogle}`}
          >
            <GoogleIcon sx={{ mr: 1.5 }} />
            <Box component="span">Google</Box>
          </Button>

          <div className={styles.separator}>
            <span className={styles.separatorLine} />
            <span className={styles.separatorText}>or</span>
            <span className={styles.separatorLine} />
          </div>

          <form className={styles.form} onSubmit={handleLogin}>
            <div className={styles.field}>
              <label htmlFor="email" className={styles.label}>
                Email <span className={styles.required}>*</span>
              </label>
              <TextField
                id="email"
                type="email"
                placeholder="Enter your email ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '10px',
                    backgroundColor: '#ffffff',
                    '& fieldset': { borderColor: '#e5e5e5' },
                    '&:hover fieldset': { borderColor: '#e5e5e5' },
                    '&.Mui-focused fieldset': {
                      borderColor: 'var(--color-primary)',
                    },
                  },
                  '& .MuiOutlinedInput-input': {
                    paddingY: '12px',
                  },
                }}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="password" className={styles.label}>
                Password <span className={styles.required}>*</span>
              </label>
              <div className={styles.passwordWrapper}>
                <FormControl
                  variant="outlined"
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '10px',
                      backgroundColor: '#ffffff',
                      '& fieldset': { borderColor: '#e5e5e5' },
                      '&:hover fieldset': { borderColor: '#e5e5e5' },
                      '&.Mui-focused fieldset': {
                        borderColor: 'var(--color-primary)',
                      },
                    },
                    '& .MuiOutlinedInput-input': {
                      paddingY: '12px',
                    },
                  }}
                >
                  <OutlinedInput
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={
                            showPassword ? 'Hide password' : 'Show password'
                          }
                          onClick={handleTogglePassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </div>
            </div>

            <div className={styles.forgotRow}>
              <button type="button" className={styles.linkButton}>
                Forgot Password?
              </button>
            </div>

            <Button
              type="submit"
              fullWidth
              disabled={!isFormValid}
              sx={{ fontWeight: 700 }}
              className={`${styles.button} ${styles.buttonPrimary}`}
            >
              Log in
            </Button>
          </form>

          <p className={styles.footerText}>
            Don&apos;t have an account ?{' '}
            <button type="button" className={styles.linkButton}>
              Sign up
            </button>
          </p>
        </div>

        {/* Right: Analytics info card */}
        <AiPoweredAnalytics />
      </div>

      <OtpModel open={isOtpOpen} onClose={handleCloseOtp} email={email} />
    </div>
  );
};

export default Login;

