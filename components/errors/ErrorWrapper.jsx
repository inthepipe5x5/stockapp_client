import { ErrorBoundary } from "react-native-error-boundary";
import FallbackComponent from "./FallbackComponent";
import React from "react";
import { globalErrorHandler } from "@/lib/globalErrorHandler";

/**
 * Higher Order Component (HOC) that wraps a component with an error boundary.
 *
 * @param {React.ComponentType} WrappedComponent - The component to wrap with the error boundary.
 * @param {React.ComponentType} [FallBack=FallbackComponent] - The fallback component to display on error.
 * @param {Function} [onError=globalErrorHandler] - Optional custom error handler.
 * @returns {React.ComponentType} - A new component wrapped with an error boundary.
 */
const ErrorWrapper = (
  WrappedComponent,
  FallBack = FallbackComponent,
  onError = globalErrorHandler
) => {
  return function ErrorBoundaryWrapper(props) {
    return (
      <ErrorBoundary
        FallbackComponent={(errorProps) => (
          <FallBack {...props} {...errorProps} />
        )}
        onError={(error, stackTrace) => {
          // Call the provided onError handler or fallback to the default handler
          onError(error, false, stackTrace);
        }}
      >
        <WrappedComponent {...props} />
      </ErrorBoundary>
    );
  };
};

export default ErrorWrapper;
