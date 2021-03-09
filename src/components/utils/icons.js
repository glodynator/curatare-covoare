import React from 'react';
import { Link } from 'react-router-dom';

import plannetlogo from '../../resources/images/logos/logo_plannet.png';

export const PlannetLogo = (props) => {

  const template = <div
    className="img_cover"
    style={{
      width: props.width,
      height: props.height,
      background: `url(${plannetlogo}) no-repeat`
    }}
  >
  </div>;

  if(props.link){
    return (
      <Link to={props.linkTo} className="link_logo">
        {template}
      </Link>
    )
  } else {
    return template
  }
};