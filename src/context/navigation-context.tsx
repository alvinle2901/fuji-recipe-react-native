// Context to navigate data from screen to screens

import React, { createContext, useState } from "react";

type NavigationContextType = {
  setScreenProps: <T>(screenName: string, props: T) => void;
  getScreenProps: <T>(screenName: string) => T;
  clearScreenProps: (screenName: string) => void;
};

export const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined
);

export function NavigationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [screenProps, setScreenProps] = useState<Record<string, any>>({});

  const contextValue = {
    setScreenProps: (screenName: string, props: any) => {
      setScreenProps((prev) => ({
        ...prev,
        [screenName]: props,
      }));
    },
    getScreenProps: (screenName: string) => screenProps[screenName],
    clearScreenProps: (screenName: string) => {
      setScreenProps((prev) => {
        const newProps = { ...prev };
        delete newProps[screenName];
        return newProps;
      });
    },
  };

  return (
    <NavigationContext.Provider value={contextValue}>
      {children}
    </NavigationContext.Provider>
  );
}
