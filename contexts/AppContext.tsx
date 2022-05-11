/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, { createContext, useContext, useEffect, useState } from 'react';

const AppContext = createContext({
  mobileService: '',
});

const AppProvider = ({ children }) => {
  const [mobileService, setMobileService] = useState('');

  useEffect(() => {
    setMobileService('hms');
  }, []);

  const context = { mobileService };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }

  return context;
};

export { AppContext, AppProvider, useAppContext };
