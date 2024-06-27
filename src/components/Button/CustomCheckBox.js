import React from 'react';
import COLOR from '../../constant/color';
import CheckBox from '@react-native-community/checkbox';
import SPACING from '../../constant/pixel';

const CustomCheckBox = props => (
  <CheckBox
    value={props.value}
    onValueChange={props.onValueChange}
    boxType="square"
    tintColor={props.tintColorFalse}
    onFillColor={props.tintColorFalse}
    onCheckColor={COLOR.White50}
    onTintColor={props.tintColorFalse}
    tintColors={{
      true: props.tintColorTrue,
      false: props.tintColorFalse,
    }}
    style={{
      width: SPACING.spacing20,
      height: SPACING.spacing20,
      borderWidth: 1,
      borderRadius: SPACING.spacing4,
      marginEnd: SPACING.spacing6,
    }}
  />
);

export default CustomCheckBox;
