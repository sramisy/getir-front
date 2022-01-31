import React from 'react';

const SelectContext = React.createContext({
  selectedOption: null,
  changeSelectedOption: (option, value) => {},
});

const useSelectContext = () => {
  const context = React.useContext(SelectContext);

  if (!context) {
    throw new Error('useSelectContext must be used within a SelectContextProvider');
  }

  return context;
}

export {
  SelectContext,
  useSelectContext
};