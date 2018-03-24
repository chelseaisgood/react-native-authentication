import React from 'react';
import { Text, View, Modal } from 'react-native';
import { Button, CardSection } from './';

const ConfirmModal = (
    { children, confirmText, cancelText, transparent, visible, onAccept, onReject }
) => {
    const { cardSectionStyle, textStyle, containerStyle } = styles;
    return (
        <Modal
            animationType="slide"
            transparent={transparent || false}
            visible={visible || false}
            onRequestClose={() => {
                console.log('Modal has been closed.');
            }}
        >
            <View style={containerStyle}>
                <CardSection style={cardSectionStyle}>
                    <Text style={textStyle}>{children}</Text>
                </CardSection>
                <CardSection>
                    <Button onPress={onAccept}>{confirmText}</Button>
                    <Button onPress={onReject}>{cancelText}</Button>
                </CardSection>
            </View>
        </Modal>
    );
};

const styles = {
    cardSectionStyle: {
        justifyContent: 'center'
    },
    textStyle: {
        flex: 1,
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 40,
    },
    containerStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        position: 'relative',
        flex: 1,
        justifyContent: 'center',
    }
};

export { ConfirmModal };
