import React from 'react';
import get from 'lodash/get';

const HeartIcon = props => (
<svg width="19px" height="16.36px" viewBox="0 0 19 16.36" {...props}>
  <path fill-rule="evenodd" clip-rule="evenodd" fill="#CCCCCC" className={get(props, 'className', '')} d="M9.5,2.87C9.5,2.87,8.41,0,5.18,0C1.95,0,0,3.08,0,5.62
  c0,4.25,9.5,10.74,9.5,10.74S19,9.88,19,5.62C19,3.08,17.05,0,13.82,0C10.59,0,9.5,2.87,9.5,2.87z"/>
</svg>
);

export default HeartIcon;



