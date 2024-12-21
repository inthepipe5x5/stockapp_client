import React from "react";
import { Alert } from "react-native";
import { ErrorBoundary } from "react-native-error-boundary";

/**
 * Global error handler function.
 *
 * @param {Error} error - The error object that was thrown.
 * @param {boolean} isFatal - Indicates if the error is fatal.
 * @param {string} [info] - Additional information about the error.
 * @param {string} [stacktrace] - The stack trace of the error.
 *
 * @example
 * import { globalErrorHandler } from './globalErrorHandler';
 *
 * try {
 *     // Some code that may throw an error
 * } catch (error) {
 *     globalErrorHandler(error, true, 'Additional info about the error', error.stack);
 * }
 *
 * @example
 * import { ErrorBoundary } from 'react-native-error-boundary';
 * import { globalErrorHandler } from './globalErrorHandler';
 *
 * const App = () => (
 *     <ErrorBoundary
 *         onError={(error, info) => globalErrorHandler(error, false, info.componentStack, error.stack)}
 *         FallbackComponent={MyFallbackComponent}
 *     >
 *         <MyApp />
 *     </ErrorBoundary>
 * );
 */
export const globalErrorHandler = (
  error,
  isFatal,
  info,
  stacktrace,
  resetErrorStates,
  errorState = false,
  errorDetails = null,
  logger = console.error
) => {
  logger("🔴 🔴 ~ Global Error Handler:", {
    error,
    isFatal,
    info,
    stacktrace,
  });
  if (isFatal) {
    // I'll handle fatal errors (e.g., log, show custom UI, or restart the app)
    Alert(
      "🔴 🔴 ~ A fatal error occurred. 👉",
      error,
      "The app needs to restart.",
      info
    );
  }
  //reset any error states
  if (errorState && errorDetails !== null) resetErrorStates(errorState, errorDetails)
};

export const globalNativeErrorHandler = (errorString) => {
  console.error("🔴 🔴 ~ Global Native Error Handler: 👉", errorString);
  // I'll log native errors or perform other handling
};

/**
 * The functions createGlobalErrorHandler and createGlobalNativeErrorHandler provide customizable
 * global error handling for JavaScript applications.
 * @param [logError] - The `logError` parameter in the `createGlobalErrorHandler` and
 * `createGlobalNativeErrorHandler` functions is a function that will be used to log errors. By
 * default, `console.error` is used as the logging function, but you can provide a custom logging
 * function if needed. This allows you
 * @param [fallbackComponent=null] - The `fallbackComponent` parameter in the
 * `createGlobalErrorHandler` function is used to specify a React component that will be rendered in
 * place of the child components when an error occurs within the error boundary. This component serves
 * as a fallback UI to display to users when an error is caught.
 * @returns For the `createGlobalErrorHandler` function, it returns a React component that acts as a
 * global error handler. This component wraps the provided `children` with an `ErrorBoundary`
 * component. When an error occurs within the `ErrorBoundary`, the `onError` function is called,
 * logging the error information and sending error logs to a monitoring service. The
 * `FallbackComponent` can be provided to render
 */
export const createGlobalErrorHandler = (
  logError = console.error,
  fallbackComponent = null
) => {
  return ({ children }) => (
    <ErrorBoundary
      onError={(error, info) => {
        logError("🔴 🔴 ~ Global Error Handler:", {
          error,
          info,
          stacktrace: error.stack,
        });
        // I'll send error logs to your monitoring service
      }}
      FallbackComponent={fallbackComponent}
    >
      {children}
    </ErrorBoundary>
  );
};

/**
 * The function `createGlobalNativeErrorHandler` returns a function that logs errors with a specified
 * message prefix.
 * @param [logError] - The `logError` parameter is a function that will be used to log errors. By
 * default, it is set to `console.error`, but you can provide a custom logging function if needed.
 * @returns A function is being returned. The returned function takes an `errorString` parameter and
 * logs an error message using the `logError` function provided as an argument to
 * `createGlobalNativeErrorHandler`.
 */
export const createGlobalNativeErrorHandler = (logError = console.error) => {
  return (errorString) => {
    logError("🔴 🔴 ~ Global Native Error Handler: 👉", errorString);
    // I'll log native errors or perform other handling
  };
};
