import React from 'react';
import { Icon } from '@iconify/react';

import styles from "./Suggestions.module.css";
import { useDeliveryAddressContext } from './DeliveryAddressContext';

const Suggestions = React.forwardRef((props, inputRef) => {
    const { data } = props;

    const {
        setCoordinates,
        setSuggestions,
        setAddress,
        setMapState,
    } = useDeliveryAddressContext();

    return (
        <div className={styles.suggestions}>
            {data.map((item, index) => (
                <div key={index} className={styles['suggestion-item']}>
                    <button
                        onClick={() => {
                            setCoordinates(item.coordinates);
                            setAddress(item.address);
                            setSuggestions([]);
                            setMapState({ center: item.coordinates, zoom: 12 });
                            inputRef.current.value = '';
                        }}
                        data-coors={item.coordinates}
                    >
                        {item.address}
                        <Icon icon="akar-icons:chevron-right" className="text-primary text-base hidden" />
                    </button>
                </div>
            ))}
        </div>
    )
});

export default Suggestions;
