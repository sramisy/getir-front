import React from 'react';

import { SelectContext } from './SelectContext';

import { Icon } from '@iconify/react';

import "./Select.css";

const Select = React.forwardRef((props, ref) => {
    const { children } = props;
    const [selectedOption, setSelectedOption] = React.useState(null);
    const [showDropdown, setShowDropdown] = React.useState(false);
    const selectContainerRef = React.useRef(null);

    const showDropdownHandler = (e) => {
        e.currentTarget.classList.toggle('clicked');
        setShowDropdown(!showDropdown);
    }

    const updateSelectedOption = (option, value) => {
        ref.current = value;
        setSelectedOption(option);
        setShowDropdown(false);

    }

    React.useEffect(() => {
        const handleClickOutside = (e) => {
            if (selectContainerRef.current && !selectContainerRef.current.contains(e.target)) {
                selectContainerRef.current.classList.remove('clicked');
                setShowDropdown(false);
            }
        }

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        }

    }, [])

    React.useEffect(() => {
        if (children.length > 0) {
            children.forEach(child => {
                if (child.props.default) {
                    setSelectedOption(child);
                    ref.current = child.props.value;
                }
            })
        }
    }, [])

    return (
        <SelectContext.Provider value={{ selectedOption, changeSelectedOption: updateSelectedOption }}>
            <div className="select-container" ref={selectContainerRef} onClick={showDropdownHandler}>
                <div className="select">
                    {selectedOption}
                    <Icon icon="akar-icons:chevron-down" className={`dropdown-arrow ${showDropdown ? 'up' : ''}`} />
                </div>

                <div className={`select-options z-10 ${showDropdown ? '' : 'hidden'}`}>
                    {children}
                </div>
            </div>
        </SelectContext.Provider>
    );
});

export default Select;
