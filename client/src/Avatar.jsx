import React from 'react';
import PropTypes from 'prop-types';

import './Avatar.scss';

const Avatar = ({ src, children }) => (
  <span className="avatar">{children || <img src={src} alt="" />}</span>
);

Avatar.propTypes = {
  src: PropTypes.string,
  children: PropTypes.node,
};

export default Avatar;
