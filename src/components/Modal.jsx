import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { ModalContext, useModalContext } from './ModalContext';

import { Icon } from '@iconify/react';

import "./Modal.css";

export const Modal = (props) => {
    const contentRef = React.useRef(null);

    const {
        className,
        children,
        center,
        onClose,
    } = props;

    const classes = classNames('modal', className);

    React.useEffect(() => {

        const checkIfClickOutside = (e) => {
            if (contentRef.current && !contentRef.current.contains(e.target)) {
                onClose();
            }
        }

        document.addEventListener("mousedown", checkIfClickOutside);

        return () => {
            document.removeEventListener("mousedown", checkIfClickOutside);
        }
    });


    return (
        <ModalContext.Provider value={{
            onClose,
        }}>
            <div className={classes}>
                <div className={`modal-dialog ${center ? 'dialog-centered' : ''}`}>
                    <div className="modal-content" ref={contentRef}>
                        {children}
                    </div>
                </div>
            </div>
        </ModalContext.Provider>

    );
}

const propTypes = {
    backBtn: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    onBack: PropTypes.func,
    closeBtn: PropTypes.bool,
    onClose: PropTypes.func,
    children: PropTypes.node,
}

const defaultProps = {
    backBtn: 'invisible',
    onBack: () => { },
    closeBtn: false,
    onClose: () => { },
}

export const ModalHeader = (props) => {
    const context = useModalContext();

    const {
        backBtn,
        onBack,
        closeBtn,
        children,
        className,
    } = props;

    const classes = classNames('modal-header', className);

    return (
        <div className={classes}>
            {backBtn === 'invisible' ? (
                <div className="invisible">
                    <button className={`w-8 h-8 border-0 rounded-lg hover:bg-primary-light items-center justify-center`}>
                        <Icon icon="akar-icons:chevron-left" className="text-2xl text-primary" />
                    </button>
                </div>
            ) : backBtn ? (
                <button onClick={onBack} className={`back-btn flex w-8 h-8 border-0 rounded-lg hover:bg-primary-light items-center justify-center`}>
                    <Icon icon="akar-icons:chevron-left" className="text-base text-primary" />
                </button>
            ) : null}

            {children}

            {closeBtn && (
                <button onClick={context.onClose} className={`w-8 h-8 border-0 rounded-lg bg-gray-light flex items-center justify-center`}>
                    <Icon icon="eva:close-outline" className="text-base text-gray-dark" />
                </button>
            )}
        </div>
    )
}

ModalHeader.propTypes = propTypes;
ModalHeader.defaultProps = defaultProps;

export const ModalBody = (props) => {
    const {
        children,
        className,
    } = props;

    const classes = classNames('modal-body', className);

    return (
        <div className={classes}>
            {children}
        </div>
    )
}

export const ModalFooter = (props) => {
    const {
        className,
        children,
    } = props;

    const classes = classNames('modal-footer', className);

    return (
        <div className={classes}>
            {children}
        </div>
    )
}
