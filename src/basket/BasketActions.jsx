import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';

import { selectItemById, addItem, removeItem } from './basketSlice';

import { Icon } from "@iconify/react";

import AddItem from './AddItem';
import RemoveItem from './RemoveItem';

import "./BasketActions.css";
import { toggleLoginModal, toggleAddDeliveryAddressModal, toggleOutServiceAreaModal } from '../app/appSlice';

const propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.shape({
      old: PropTypes.number,
      current: PropTypes.number.isRequired,
    }),
    image: PropTypes.string,
    description: PropTypes.string,
  }),
}

function BasketActions(props) {
  const [width, setWidth] = React.useState(window.innerWidth);
  const { product, className } = props;

  const [loading, setLoading] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);
  const itemInBasket = useSelector(state => selectItemById(state, product.id));

  const { isAuth, user } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const currentAddress = user?.addresses.find(address => address.active);

  const classes = classNames('basket-actions', className);

  React.useEffect(() => {
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth);
    });

    return () => {
      window.removeEventListener('resize', () => {});
    };
    
  }, [width]);

  const handleAddClick = async () => {

    if (isAuth) {

      if (!currentAddress) {
        dispatch(toggleAddDeliveryAddressModal(true));
        return;

      } else if (!currentAddress.available) {
        dispatch(toggleOutServiceAreaModal(true));
        return;

      }

      setLoading(true);
      setDisabled(true);

      try {

        console.log(product);
        const response = await dispatch(
          addItem({
            ...product,
            count: 1,
          })
        ).unwrap();

        if (response.success) {
          setLoading(false);
          setDisabled(false);
        }

      } catch (err) {
        console.log(err);
      }

    } else {
      dispatch(toggleLoginModal(true));

    }
  }

  const handleRemoveClick = async () => {

    setLoading(true);
    setDisabled(true);

    try {
      const response = await dispatch(
        removeItem({
          id: product.id,
        })
      ).unwrap();

      if (response.success) {
        setLoading(false);
        setDisabled(false);
      }
      
    } catch (err) {
      console.log(err);
    }
  }

  const renderContent = () => {
    return (
      <div className={classes}>
        <AddItem loading={!itemInBasket && loading} disabled={disabled} onClick={handleAddClick} />
        {itemInBasket && itemInBasket.count < 2 && (
          <>
            <div className="flex items-center justify-center bg-primary text-sm text-white w-8 h-8">
              {loading ? (
                <Icon icon="ph:spinner-bold" className="text-xl text-primary-light animate-spin-slow" />
              ) : (
                itemInBasket.count
              )}
            </div>
            <RemoveItem
              disabled={disabled}
              icon={<Icon icon="lucide:trash-2" className={`${disabled ? 'text-gray' : 'text-primary'} text-lg`} />}
              onClick={handleRemoveClick}
            />
          </>
        )}

        {itemInBasket && itemInBasket.count > 1 && (
          <>
            <div className="flex items-center justify-center bg-primary text-sm text-white w-8 h-8">
              {loading ? (
                <Icon icon="ph:spinner-bold" className="text-xl text-primary-light animate-spin-slow" />
              ) : (
                itemInBasket.count
              )}
            </div>
            <RemoveItem
              disabled={disabled}
              icon={<Icon icon="akar-icons:minus" className={`${disabled ? 'text-gray' : 'text-primary'} text-base`} />}
              onClick={handleRemoveClick}
            />
          </>
        )}
      </div>
    )
  }

  return (
    renderContent()
  );
}

BasketActions.propTypes = propTypes;

export default BasketActions;
