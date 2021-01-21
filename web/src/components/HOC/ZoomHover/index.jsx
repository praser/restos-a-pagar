import React from 'react';
import { ZoomHover } from './styles';

const WithZoomHover = ComposedComponent => ({ children, ...props }) => {
  return (
    <ZoomHover>
      <ComposedComponent {...props}>{children}</ComposedComponent>
    </ZoomHover>
  );
};

export default WithZoomHover;
