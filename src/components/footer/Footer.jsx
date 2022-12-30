import React from 'react';
import { BsGithub, BsLinkedin } from 'react-icons/bs';

import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <b>Gabriel Spada&nbsp;</b> &copy; All Rights Reserved.
      <a href='https://github.com/gbrlspd/gs-shop' target='_blank' rel='noreferrer'>
        <BsGithub className='--ml' color='#fff' size={22} />
      </a>
      <a href='https://www.linkedin.com/in/gbrlspd' target='_blank' rel='noreferrer'>
        <BsLinkedin className='--ml' color='#fff' size={22} />
      </a>
    </div>
  );
};

export default Footer;
