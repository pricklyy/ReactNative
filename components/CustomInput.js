import { Image, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

const CustomInput = (
        {    placeholder,
            secureTextEntry,
            value, 
            setValue 
        }) => {

    return (
        <View>
            <TextInput
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                style={styles.input}
                value={value}
                onChangeText={setValue}
            />
        </View>
    )
}

export default CustomInput

const styles = StyleSheet.create({
    container: {

    },


    input: {
        borderRadius: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
        backgroundColor: 'white',

    },
})


