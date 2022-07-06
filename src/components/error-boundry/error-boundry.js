import React, { Component } from "react";

import ErrorIndicator from "../error-indicator/error-indicator";

export default class ErrorBoundry extends Component {

    state = {
        hasError: false
    }

    componentDidCatch(error, info) {
        this.setState({
            hasError: true
        });
    }

    render() {

        if (this.state.hasError) {
            <ErrorIndicator/>
        }
        
        return this.props.children;
    }
}