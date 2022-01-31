import React from 'react';

import classNames from 'classnames';

function RemoveItem(props) {

  const {
    icon,
    className,
    onClick,
    disabled
  } = props;

  const classes = classNames('remove-item', className);

  return (
    <button onClick={onClick} className={classes} disabled={disabled}>{icon}</button>
  );
}

export default RemoveItem;
