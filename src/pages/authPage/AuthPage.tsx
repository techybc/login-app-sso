import React from 'react';

import Login from './login/Login';
import styles from './authPage.module.scss';

const Auth: React.FC = () => (
  <div className={styles.authPage}>
    <Login />
  </div>
);

export default Auth;


