import React from "react";

import { useSelector, useDispatch } from "react-redux";

import { toggleLoginModal } from "../app/appSlice";
import { addFavorite, removeFavorite, selectFavoriteById } from "../favorite/favoriteSlice";
import { addItem, selectItemById, updateItem } from "../basket/basketSlice";

import { Icon } from "@iconify/react";

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "../components/Modal";

import { toggleAddDeliveryAddressModal, toggleOutServiceAreaModal } from "../app/appSlice";

import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';

import Counter from "./Counter";

import Dinero from 'dinero.js';

import styles from "./Details.module.css";

function Details(props) {
  const { onClose, className, product } = props;

  const item = useSelector((state) => selectItemById(state, product.id));
  const [count, setCount] = React.useState(item?.count || 1);
  const [width, setWidth] = React.useState(window.innerWidth);
  const [loading, setLoading] = React.useState(false);

  const { isAuth, user } = useSelector((state) => state.auth);
  const currentAddress = user?.addresses.find(address => address.active);

  const dispatch = useDispatch();

  const productInFavorites = useSelector((state) => selectFavoriteById(state, product.id));

  const addToFavorites = async () => {
    if (isAuth) {
      try {
        const response = await dispatch(
          addFavorite(product)
        ).unwrap();

        if (response.success) {
        }

      } catch (err) {
        console.log(err);
      }

    } else {
      dispatch(toggleLoginModal(true));
      onClose();
    }

  }

  const removeFromFavorites = async () => {
    try {
      const response = await dispatch(
        removeFavorite(product.id)
      ).unwrap();

      if (response.success) {
      }

    } catch (err) {
      console.log(err);
    }
  }

  const addToBasket = async () => {
    if (isAuth) {

      if (!currentAddress) {
        dispatch(toggleAddDeliveryAddressModal(true));
        onClose();
        return;

      } else if (!currentAddress.available) {
        dispatch(toggleOutServiceAreaModal(true));
        onClose();
        return;

      }

      setLoading(true);

      const itemToAdd = {
        ...product,
        count,
      }

      try {
        const response = await dispatch(
          addItem(itemToAdd)
        ).unwrap();

        if (response.success) {
          setLoading(false);
          onClose();
        }

      } catch (err) {
        console.log(err);
      }

    } else {
      dispatch(toggleLoginModal(true));
      onClose();

    }
  }

  const updateBasket = async () => {
    setLoading(true);

    const itemToUpdate = {
      ...product,
      count,
    }

    try {
      const response = await dispatch(
        updateItem(itemToUpdate)
      ).unwrap();

      if (response.success) {
        setLoading(false);
        onClose();
      }

    } catch (err) {
      console.log(err);
    }
  }

  React.useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));

  }, [width]);

  return (
    <Modal className="product-details" onClose={onClose}>
      <ModalHeader backBtn={false} className="px-5 py-4 border-b border-primary-light" closeBtn onClose={onClose} fixed>
        {productInFavorites ? (
          <button className={styles['add-to-favorites']} onClick={removeFromFavorites}>
            <Icon icon='ant-design:heart-filled' className="text-primary mr-3 text-2xl" />
            <p>Remove from favorites</p>
          </button>
        ) : (
          <button className={styles['add-to-favorites']} onClick={addToFavorites}>
            <Icon icon='ant-design:heart-outlined' className="text-primary mr-3 text-2xl" />
            <p>Add to favorites</p>
          </button>
        )}
      </ModalHeader>
      <ModalBody className="flex-1">
        <div className="py-4">
          <Splide onArrowsMounted={(splide, prev, next) => {
            if (product.images.length === 1) {
              prev.style.display = 'none';
              next.style.display = 'none';
            }
          }}
            options={{
              rewind: true,
            }}
          >
            {product.images.map((image, index) => (
              <SplideSlide key={index}>
                <img src={image} alt={product.title} className="mx-auto" />
              </SplideSlide>
            ))}
          </Splide>

          {width < 768 && (
            <Counter
              className='mt-4 mx-auto'
              count={count}
              loading={loading}
              onIncrease={() => setCount(count => count + 1)}
              onDecrease={() => setCount(count => count - 1)}
            />
          )}

          <div className="bg-white pt-8 pb-6 pl-8 mt-4 border-t border-primary-light">
            <h2 className="text-lg text-primary font-semibold">{product.title}</h2>
            <p className="text-gray-storm text-sm mt-2">{product.measure}</p>
          </div>

          <div className="px-8">
            <p className="text-sm text-gray-storm" dangerouslySetInnerHTML={{ __html: product.description }} />
          </div>
        </div>
      </ModalBody>
      <ModalFooter className="bg-gray-background md:bg-white px-4 py-5 md:rounded-b-xl">
        <div className="flex items-center justify-between">
          {width >= 768 && (
            <Counter
              count={count}
              loading={loading}
              onIncrease={() => setCount(count => count + 1)}
              onDecrease={() => setCount(count => count - 1)}
            />
          )}

          <div className="flex items-center border-2 border-primary rounded-lg w-full md:w-auto">
            {item ? (
              <button className="bg-primary text-sm text-white py-3 md:px-9 w-full md:w-auto"
                disabled={count === item.count} onClick={updateBasket}>
                Update Basket
              </button>
            ) : (
              <button className="bg-primary text-sm text-white py-3 md:px-9 w-full md:w-auto" onClick={addToBasket}>
                Add to Basket
              </button>
            )}
            <div className="bg-white px-4">
              {product.price.old && (
                <span className="text-xs text-gray-storm mr-2 line-through">
                  {`₺${Dinero({ amount: product.price.old }).toFormat('0,0.00')}`}
                </span>
              )}

              <span className="text-sm text-primary font-semibold">
                {`₺${Dinero({ amount: product.price.current }).toFormat('0,0.00')}`}
              </span>
            </div>
          </div>
        </div>


      </ModalFooter>
    </Modal>
  );
}

export default Details;
