// TextInputComponent.js

import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { View, TextInput, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import COLOR from '../../constant/color';
import SPACING from '../../constant/pixel';
import { FontFamily, fontSizes, fontWeight } from '../../constant/font';

const ActionButton = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress} activeOpacity={0.85} style={[styles.buttonStyle,props.myStyle]}>
            <Text style={[styles.text,props.myText]}>{props.text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonStyle: { 
        backgroundColor: COLOR.Primary, 
        padding: SPACING.spacing8, 
        borderRadius: SPACING.spacing8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontFamily: FontFamily.PoppinSemiBold,
        color: COLOR.White50,
        fontSize: fontSizes.size19
    }
});

export default ActionButton;
