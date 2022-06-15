import React from "react";

type ErrorObject = {
  hasError: boolean;
};

type ErrorProps = {
  children: JSX.Element | JSX.Element[];
};

export class ErrorBoundary extends React.Component<ErrorProps, ErrorObject> {
  constructor(props: ErrorProps) {
    super(props);
    // Define a state variable to track whether is an error or not
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI

    return { hasError: true };
  }

  componentDidCatch(error: object, errorInfo: { componentStack: string }) {
    // You can use your own error logging service here
    console.log({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // Error path
      return (
        <div className="p-4 text-red-600 text-xl">
          <h2>Something went wrong.</h2>
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}
