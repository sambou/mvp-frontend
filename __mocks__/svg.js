import React from 'react';

const SvgrMock = React.forwardRef((props, ref) => (
  <span ref={ref} {...props} />
));

SvgrMock.displayName = 'svgmock';

export const ReactComponent = SvgrMock;
export default SvgrMock;
