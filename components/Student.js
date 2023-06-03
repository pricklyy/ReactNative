import { StyleSheet,View,Text,Image } from "react-native";
import React from "react";

const Student = ({ student}) => {
    return(
        <View style={styles.item} >
        <View style={styles.itemImageContainer}>
            {student.gender === 'Male' ? (
                <Image style={styles.itemImage} source={require('../assets/images/man.png')} resizeMode='contain' />
            ) : (
                <Image style={styles.itemImage} source={require('../assets/images/woman.png')} resizeMode='contain' />
            )}

        </View>
        <View style={{ paddingLeft: 15 }}>
                                <Text>{student.studentId}</Text>
                                <Text>{student.fullName}</Text>
                                <Text>{student.gender}</Text>
                                <Text>{student.email}</Text>
                                <Text>{student.dateOfBirth}</Text>
                            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        paddingVertical: 15,
        borderBottomColor: '#E2E2E2',
        borderBottomWidth: 0.5,
        flexDirection: 'row'
    },
    itemImageContainer: {
        width: 100,
        height: 100,
        borderRadius: 100
    },
    itemImage: {
        flex: 1,
        width: 100,
        height:100
    },
    right: {
        paddingLeft: 15
    }
});
export default Student;
