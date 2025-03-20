import React, { createContext, useCallback, useContext, useState } from 'react';

interface IDrawerContextData {
  isDrawerOpen: boolean;
  toggleDrawerOpen: () => void;
  drawerOptions: IDrawerOption[];
  setDrawerOptions: (newDrawerOptions: IDrawerOption[]) => void;
}

interface IDrawerProviderProps {
  children: React.ReactNode;
}

interface IDrawerOption {
  icon: string;
  path: string;
  label: string;
}

const DrawerContex = createContext({} as IDrawerContextData);

export const UseDrawerContext = () => {
  return useContext(DrawerContex);
};

export const DrawerProvider: React.FC<IDrawerProviderProps> = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerOptions, setDrawerOptions] = useState<IDrawerOption[]>([]);

  const toggleDrawerOpen = useCallback(() => {
    setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen);
  }, []);

  const handleSetDrawerOptions = useCallback((newDrawerOptions: IDrawerOption[]) => {
    setDrawerOptions(newDrawerOptions);
  }, []);

  return (
    <DrawerContex.Provider
      value={{
        drawerOptions,
        setDrawerOptions: handleSetDrawerOptions,
        isDrawerOpen,
        toggleDrawerOpen,
      }}
    >
      {children}
    </DrawerContex.Provider>
  );
};
