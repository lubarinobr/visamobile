import React, { PureComponent } from "react";
import { View } from "react-native";
import * as Animatable from "react-native-animatable";

type PropsType = { index?: number };

export class TransitionView extends PureComponent<PropsType> {
  render() {
    const { index, ...rest } = this.props;
    return (
      <Animatable.View
        animation="fadeIn"
        duration={1500}
        delay={index ? (index * 1500) / 5 : 0}
        useNativeDriver
        {...rest}
      />
    );
  }
}