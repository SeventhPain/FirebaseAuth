import React from 'react';
import { Modal, View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import IconManager from '../assets/IconManager';
import { useSelector, useDispatch } from 'react-redux';
import COLOR from '../constant/color';
import color from '../constant/color';

const AlertDialog = ({ visible, onClose, message, isSuccess }) => {
    const darkMode = useSelector(state => state.ThemeSlice.appDarkMode);
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={[styles.modalView, darkMode && {backgroundColor: COLOR.Grey500}]}>
                    <Image source={isSuccess ? IconManager.success_icon : IconManager.warning_icon} style={{ width: 45, height: 45 }} resizeMode='contain' />
                    <Text style={[styles.modalText,darkMode&&{color: COLOR.White}]}>{message}</Text>
                    <TouchableOpacity activeOpacity={0.9} style={[styles.closeButton,isSuccess ? {backgroundColor: COLOR.Primary} : {backgroundColor: '#E93025'}]} onPress={onClose}>
                        <Text style={styles.closeButtonText}>CLOSE</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
    },
    modalView: {
        margin: 20,
        width: '80%',
        backgroundColor: color.Blue50,
        borderRadius: 16,
        paddingTop: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        marginTop: 15,
        fontSize: 16,
        color: '#000000',
        textAlign: 'center',
    },
    closeButton: {
        backgroundColor: '#E93025',
        width: '100%',
        paddingVertical: 14,
        alignItems: 'center',
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
    },
    closeButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
});

export default AlertDialog;
