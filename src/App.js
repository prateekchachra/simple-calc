import "./App.css";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import * as Sentry from "@sentry/browser";

import Header from "./components/Header";
import CalculatorGrid from "./components/CalculatorGrid";
import ErrorFallback from "./components/ErrorFallback";

function App() {
  const resetOnError = () =>
    setTimeout(() => {
      window.reload();
    }, 1000);

  return (
    <div className="App">
      <Header title="La Calculadora" />
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onError={(error) => {
          //Report to sentry
          Sentry.withScope((scope) => {
            scope.setExtras(error);
            const eventId = Sentry.captureException(error);
            console.log(
              `Error reported to sentry with ID: ${eventId} and message ${error}`
            );
          });
        }}
        onReset={resetOnError}
      >
        <CalculatorGrid />
      </ErrorBoundary>
    </div>
  );
}

export default App;
