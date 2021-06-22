import {StyleProvider} from "native-base";
import React, { Component } from "react";

import getTheme from "../../native-base-theme/components";
import customMaterial from "./customMaterial";

export default class StyleWrapper extends Component {
    render() {
        return (
            <StyleProvider style={getTheme(customMaterial)}>
                {this.props.children}
            </StyleProvider>
        )
    }
}