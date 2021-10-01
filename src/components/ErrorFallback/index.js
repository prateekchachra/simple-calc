import React from 'react';
import PropTypes from 'prop-types'

import './style.css';

const ErrorFallback = ({error, resetErrorBoundary})  => {

    return (
  
      <div className="error-container" role="alert">
        <p>Invalid Calculation Detected. Error has been reported. Please try using the calculator again:</p>
        <pre className="">{error.message}</pre>
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
    )
  }

  ErrorFallback.propTypes = {
      error: PropTypes.oneOf([PropTypes.object, PropTypes.string]),
      resetErrorBoundary: PropTypes.func
  };

  export default ErrorFallback;
  
  