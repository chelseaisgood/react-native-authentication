import React from 'react';
import { TextInput, Text, View } from 'react-native';

const Input = (
    { autoCapitalize, label, placeholder, secureTextEntry, value, onChangeText }
) => {
    const { labelStyle, containerStyle, inputStyle } = styles;
    return (
        <View style={containerStyle}>
            <Text style={labelStyle}>{label}</Text>
            <TextInput
                autoCapitalize={autoCapitalize || 'none'}
                secureTextEntry={secureTextEntry || false}
                placeholder={placeholder}
                autoCorrect={false}
                value={value}
                onChangeText={onChangeText} 
                style={inputStyle}
            />
        </View>
    );
};

const styles = {
    labelStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1,
    },
    containerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputStyle: {
        color: '#000',
        paddingLeft: 5,
        paddingRight: 5,
        fontSize: 18,
        lineHeight: 23,
        flex: 2,
    }
};

export { Input };
