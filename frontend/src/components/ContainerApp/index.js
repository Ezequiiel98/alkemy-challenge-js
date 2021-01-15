import React from 'react';
import PropTypes from 'prop-types';

import Loader from '../Loader';
import Menu from '../Menu';

function ContainerApp({
  children, showLoader,
}) {
  if (showLoader) {
    return <Loader />;
  }

  return (
    <div>
      <Menu />
      {children}
    </div>
  );
}

ContainerApp.propTypes = {
  children: PropTypes.node.isRequired,
  showLoader: PropTypes.bool,
};

ContainerApp.defaultProps = {
  showLoader: false,
};

export default ContainerApp;
