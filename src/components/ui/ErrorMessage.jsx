import React from "react";
import { ErrorState } from './States';

/**
 * ErrorMessage Component
 * A wrapper around ErrorState for consistent error display.
 * 
 * @param {Object} props
 * @param {string} [props.title] - Title of the error
 * @param {string} [props.message] - Description of the error
 * @param {Function} [props.onRetry] - Function to call on retry
 */
const ErrorMessage = (props) => {
  return <ErrorState {...props} />;
};

export default ErrorMessage;
