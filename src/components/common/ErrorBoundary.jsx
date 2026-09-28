import { Component } from "react";
import Icon from "./Icon.jsx";
import Button from "./Button.jsx";
import "./ErrorBoundary.css";

export default class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error("[ErrorBoundary]", error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="error-boundary">
          <div className="error-boundary__icon">
            <Icon name="close" size={22} />
          </div>
          <h2>Something went wrong</h2>
          <p>
            This section hit an unexpected error. Your trip data is safe in
            local storage.
          </p>
          <Button
            variant="secondary"
            onClick={() => this.setState({ error: null })}
          >
            Try again
          </Button>
        </div>
      );
    }
    return this.props.children;
  }
}
