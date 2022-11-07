import React, { FC, createContext, useState } from "react";
import Spinner from "../spinner/Spinner";

export const LoadingContext = createContext<LoadingHelpers>({
  loading: false,
  setLoading: () => undefined,
});

export interface LoadingHelpers {
  loading: boolean;
  setLoading: ToggleLoadingFn;
}

type ToggleLoadingFn = (isLoading: boolean) => void;

interface Props {
  children: React.ReactNode;
}

export const LoadingProvider: FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const loadingHelpers: LoadingHelpers = {
    loading,
    setLoading,
  };

  return (
    <LoadingContext.Provider value={loadingHelpers}>
      {children}
      <Spinner show={loading} />
    </LoadingContext.Provider>
  );
};
