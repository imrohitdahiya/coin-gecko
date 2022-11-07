import { FC } from "react";
import "./Spinner.scss";
import classNames from "classnames";
import Spinner from "react-bootstrap/Spinner";

interface SpinnerProps {
  /**
   * Whether the spinner should be displayed or not
   */
  show: boolean;
}

const Loader: FC<SpinnerProps> = ({ show }): JSX.Element => {
  const spinnerClass = classNames("coin-spinner-overlay", { show });
  return (
    <div className={spinnerClass} data-testid="spinner" aria-hidden="true">
      <div className="coin-spinner-container">
        <Spinner animation="border" />
      </div>
    </div>
  );
};

export default Loader;
