import React, { Component } from "react";
import { connect } from "react-redux";

import loaderGif from "../assets/loader.gif";
export class Loader extends Component {
    render() {
        if (!this.props.loading) return null;
        return (
            <div className="loader-container">
                <div className="loader">
                    <img src={loaderGif} alt="loader" />
                </div>
            </div>
        );
    }
}
const mapStateToProp = (state) => {
    return { loading: state.interceptors.isLoading };
};
export default connect(mapStateToProp, null)(Loader);