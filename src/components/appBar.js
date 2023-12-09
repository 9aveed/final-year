import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
const AppBar = ({ title, showBackArrow, showProfile, navigation }) => {
    return (
        <View style={{ height: 100, justifyContent: 'center', }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15 }}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack()
                    }}
                    style={{ height: 50, width: 50, alignItems: 'center', justifyContent: 'center' }}>
                    {showBackArrow && <Icon
                        size={24}
                        name="arrow-back"
                        color='#53B175'
                    >
                    </Icon>}
                </TouchableOpacity>
                <Text style={styles.title}>{title}</Text>
                {showProfile ?
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("profile");
                        }}
                        style={{
                            backgroundColor: "white",
                            height: 50,
                            width: 50,
                            borderRadius: 50,
                        }}
                    >
                        <Image
                            style={{ height: 50, width: 50, borderRadius: 50 }}
                            source={require("../../assets/user.jpg")}
                        />
                    </TouchableOpacity> :
                    <Text style={{ color: 'transparent' }} >sdfsdfsd</Text>

                }
            </View>


        </View>
    );
}

export default AppBar

const styles = StyleSheet.create({
    title: {
        fontStyle: "normal",
        fontWeight: "800",
        fontSize: 22,
        letterSpacing: 2,
        color: "#53B175",
        textTransform: 'uppercase'
    },

})