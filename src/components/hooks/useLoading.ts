import React from "react";
import { LoadingContext, LoadingHelpers } from "../context/LoadingProvider";

const useLoading = (): LoadingHelpers => React.useContext(LoadingContext);

export default useLoading;
