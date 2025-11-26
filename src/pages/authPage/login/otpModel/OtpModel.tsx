import React, { useEffect, useMemo, useRef, useState } from 'react';

import { Box, IconButton, TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import Button from '../../../../common/components/ui/button/Button';
import { Modal } from '../../../../common/components/ui/modal';

import styles from './otpModel.module.scss';

interface OtpModelProps {
  open: boolean;
  onClose: () => void;
  email: string;
}

const OTP_LENGTH = 6;
const RESEND_INTERVAL_SECONDS = 30;

const OtpModel: React.FC<OtpModelProps> = ({ open, onClose, email }) => {
  const [otpValues, setOtpValues] = useState<string[]>(
    () => Array(OTP_LENGTH).fill(''),
  );
  const [secondsLeft, setSecondsLeft] = useState<number>(RESEND_INTERVAL_SECONDS);

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (!open) {
      setOtpValues(Array(OTP_LENGTH).fill(''));
      setSecondsLeft(RESEND_INTERVAL_SECONDS);
      return;
    }

    setSecondsLeft(RESEND_INTERVAL_SECONDS);
    const intervalId = window.setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [open]);

  const isOtpComplete = useMemo(
    () => otpValues.every((value) => value.length === 1),
    [otpValues],
  );

  const timerLabel = useMemo(() => {
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;

    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  }, [secondsLeft]);

  const handleChange = (index: number, rawValue: string) => {
    const digit = rawValue.replace(/\D/g, '').slice(-1);

    setOtpValues((prev) => {
      const next = [...prev];
      next[index] = digit;
      return next;
    });

    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, event: React.KeyboardEvent) => {
    if (event.key === 'Backspace' && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (event.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (event.key === 'ArrowRight' && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();

    const text = event.clipboardData.getData('text').replace(/\D/g, '');
    if (!text) return;

    const digits = text.slice(0, OTP_LENGTH).split('');

    setOtpValues((prev) => {
      const next = [...prev];
      for (let i = 0; i < OTP_LENGTH; i += 1) {
        next[i] = digits[i] ?? '';
      }
      return next;
    });

    const nextIndex = Math.min(digits.length, OTP_LENGTH - 1);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleResend = () => {
    if (secondsLeft > 0) return;

    // Placeholder for real resend logic
    // eslint-disable-next-line no-console
    console.log('Resend OTP clicked');
    setSecondsLeft(RESEND_INTERVAL_SECONDS);
  };

  const handleSubmit = () => {
    if (!isOtpComplete) return;

    const otp = otpValues.join('');
    // Placeholder for real submit logic
    // eslint-disable-next-line no-console
    console.log('OTP submitted', otp);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 3,
          paddingX: 4,
          paddingY: 3,
        },
      }}
    >
      <Modal.Header
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingX: 0,
          paddingY: 0.5,
        }}
      >
        <Typography
          className={styles.title}
          component="h2"
          sx={{ fontWeight: 600, color: 'var(--color-text)' }}
        >
          Enter 6-digit OTP code
        </Typography>

        <IconButton
          edge="end"
          aria-label="Close"
          onClick={onClose}
          size="small"
        >
          <CloseIcon />
        </IconButton>
      </Modal.Header>

      <Modal.Body>
        <Box className={styles.root}>
          <Typography className={styles.description}>
            Enter the OTP code we sent to your registered email id
          </Typography>

          {email && (
            <Typography className={styles.email}>{email}</Typography>
          )}

          <Box className={styles.otpInputs}>
            {otpValues.map((value, index) => {
              return (
                <TextField
                  key={index}
                  value={value}
                  onChange={(event) => handleChange(index, event.target.value)}
                  onKeyDown={(event) => handleKeyDown(index, event)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  inputRef={(element) => {
                    inputRefs.current[index] = element;
                  }}
                  inputProps={{
                    maxLength: 1,
                    style: {
                      textAlign: 'center',
                      fontSize: '20px',
                      fontWeight: 600,
                    },
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      width: 56,
                      height: 56,
                      borderRadius: '12px',
                      backgroundColor: '#ffffff',
                      '& fieldset': { borderColor: '#e5e5e5' },
                      '&:hover fieldset': { borderColor: '#e5e5e5' },
                      '&.Mui-focused fieldset': {
                        borderColor: 'var(--color-primary)',
                      },
                    },
                    '& .MuiOutlinedInput-input': {
                      padding: 0,
                    },
                  }}
                />
              );
            })}
          </Box>

          <Box className={styles.helperRow}>
            <button
              type="button"
              onClick={handleResend}
              className={`${styles.resend} ${
                secondsLeft === 0 ? styles.active : ''
              }`}
            >
              Resend OTP
            </button>

            <span className={styles.timer}>{timerLabel}</span>
          </Box>
        </Box>
      </Modal.Body>

      <Modal.Footer>
        <Button
          type="button"
          onClick={handleSubmit}
          disabled={!isOtpComplete}
          className={styles.footerButton}
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OtpModel;


