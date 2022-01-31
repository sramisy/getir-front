import React from 'react';

const ModalContext = React.createContext({
    onClose: () => { },
});

const useModalContext = () => {
    const context = React.useContext(ModalContext);

    if (!context) {
        throw new Error('useModalContext must be used within a ModalContextProvider');
    }

    return context;
}

export { ModalContext, useModalContext };
