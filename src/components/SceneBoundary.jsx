import { Component } from 'react';

// Catches WebGL / three.js failures so the rest of the page keeps working.
export default class SceneBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    console.warn('3D scene disabled, showing static fallback:', error?.message);
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
