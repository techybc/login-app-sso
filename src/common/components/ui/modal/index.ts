import type React from 'react';
import type {
  DialogProps,
  DialogTitleProps,
  DialogContentProps,
  DialogActionsProps,
  ButtonProps,
} from '@mui/material';

import { Modal } from './Modal';

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

export interface ModalComposition
  extends React.FC<ModalProps> {
  Header: React.FC<ModalHeaderProps>;
  Body: React.FC<ModalBodyProps>;
  Footer: React.FC<ModalFooterProps>;
  Action: React.FC<ModalActionProps>;
}

export { Modal };


