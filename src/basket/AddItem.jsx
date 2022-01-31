import React from 'react';
import classNames from 'classnames';

import { Icon } from "@iconify/react";

function AddItem(props) {

  const {
    className,
    onClick,
    loading,
    disabled
  } = props;

  const classes = classNames('add-item', className);

  return (
    <button onClick={onClick} className={classes} disabled={disabled}>
      {loading ? (
        <Icon icon="ph:spinner-bold" className="text-xl text-primary animate-spin-slow" />

      ) : (
        <Icon icon="fluent:add-16-filled" className={`${disabled ? 'text-gray' : 'text-primary'} text-base`} />
      )}
    </button>
  );
}

export default AddItem;
