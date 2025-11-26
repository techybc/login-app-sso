import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';

import type {
  DialogProps,
  DialogTitleProps,
  DialogContentProps,
  DialogActionsProps,
  ButtonProps,
} from '@mui/material';

export interface ModalProps extends Omit<DialogProps, 'open' | 'onClose'> {
  open: boolean;
  onClose: () => void;
}

export type ModalHeaderProps = DialogTitleProps;
export type ModalBodyProps = DialogContentProps;
export type ModalFooterProps = DialogActionsProps;

export interface ModalActionProps extends ButtonProps {
  label?: React.ReactNode;
}

const ModalHeader: React.FC<ModalHeaderProps> = (props) => {
  return <DialogTitle {...props} />;
};

const ModalBody: React.FC<ModalBodyProps> = (props) => {
  return <DialogContent {...props} />;
};

const ModalFooter: React.FC<ModalFooterProps> = (props) => {
  return <DialogActions {...props} />;
};

const ModalAction: React.FC<ModalActionProps> = ({
  label,
  children,
  ...buttonProps
}) => {
  return <Button {...buttonProps}>{label ?? children}</Button>;
};

const ModalBase: React.FC<ModalProps> = ({
  open,
  onClose,
  children,
  ...dialogProps
}) => {
  return (
    <Dialog open={open} onClose={onClose} {...dialogProps}>
      {children}
    </Dialog>
  );
};

export const Modal = Object.assign(ModalBase, {
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
  Action: ModalAction,
});


