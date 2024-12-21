import { withErrorBoundary } from "react-error-boundary";
import FallbackComponent from "./FallbackComponent";
import { useState } from "react";

// HOC error boundary component that accepts a component and props object
const ErrorWrapper = (WrappedComponent, FallBack=FallbackComponent) => {
  // Return a new component that wraps the original component with error boundary
    return function ErrorBoundary(props) {
      const [error, setError] = React.useState(null);
  
      const resetError = () => setError(null);
  
      try {
        if (error) throw error;
        return <WrappedComponent {...props} />;
      } catch (err) {
        console.error("Caught error in component:", err.message);
        return <FallBack {...props} error={err} retry={resetError} />;
      }
    };
  };
  
  

/**
 * @example
 * 
 * import React from 'react';
 * import ErrorWrapper from './ErrorWrapper';
 * import MyComponent from './MyComponent';

const MyComponentWithErrorBoundary = ErrorWrapper(MyComponent);

const App = () => {
  return (
    <MyComponentWithErrorBoundary
      FallbackComponent={CustomFallbackComponent}
      onError={(error, info) => console.error('Error caught:', error, info)}
      handleReset={() => console.log('Resetting...')}
      resetKeys={['someKey']}
    />
  );
};

export default App;

 * 
 */

export default ErrorWrapper;
