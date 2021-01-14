import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import bgAuth from '../../assets/img/login-bg.jpg';
import Loader from '../Loader';

import styles from './index.module.scss';

function ContainerAuth({
  topLink, topLinkText, topLinkTo, title, children, showLoader,
}) {
  if (showLoader) {
    return <Loader />;
  }

  return (
    <div className={styles.containerAuth}>
      <div className={styles.containerBg}>
        <img src={bgAuth} alt="" className={styles.bgAuth} />
      </div>
      <div className={styles.containerForm}>
        {topLink && (
        <div className={styles.containerLink}>
          <p className={styles.linkText}>
            { topLinkText }
            {' '}
            <Link to={topLinkTo} className={styles.link}>{ topLink }</Link>
          </p>
        </div>
        )}

        <h1 className={styles.title}>{ title }</h1>
        { children }
      </div>
    </div>
  );
}

ContainerAuth.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  topLinkText: PropTypes.string,
  topLinkTo: PropTypes.string,
  topLink: PropTypes.string,
  showLoader: PropTypes.bool,
};

ContainerAuth.defaultProps = {
  topLinkText: null,
  topLinkTo: null,
  topLink: null,
  showLoader: false,
};

export default ContainerAuth;
