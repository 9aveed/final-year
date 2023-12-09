import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
} from "react-native";
import * as React from "react";
import AppBar from "../../../components/appBar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Signout } from "../../../store/actions";

const BuyersSettings = () => {
    const navigation = useNavigation()
    const userData = useSelector((state) => state?.user?.user);
    const dispatch = useDispatch()
    return (
        <View style={styles.container}>
            <AppBar showBackArrow={false} showProfile={false} title="Settings" navigation={navigation} />
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('buyerprofile')
                    }}
                    style={{
                        backgroundColor: "white",
                        height: 100,
                        width: 100,
                        borderRadius: 50,
                        marginBottom: 60
                    }}
                >
                    <Image style={{ width: 100, height: 100, borderRadius: 100 }} source={userData?.profileImage ? { uri: userData?.profileImage } : require('../../../../assets/user.jpg')} />

                </TouchableOpacity>
                <TouchableOpacity style={styles.buttons} onPress={() => { navigation.navigate('sellerterms') }}>
                    <Text style={styles.text3}>Terms & Conditions</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttons} onPress={() => { navigation.navigate('sellerprivacy') }}>
                    <Text style={styles.text3}>Privacy Policy</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttons} onPress={() => { navigation.navigate('about') }}>
                    <Text style={styles.text3}>About SmartBasket App</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttons} onPress={() => { }}>
                    <Text style={styles.text3}>Share</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttons} onPress={() => { dispatch(Signout({ navigation })) }}>
                    <Text style={styles.text3}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
export default BuyersSettings;
const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: "#fff",
        height: 20,
    },
    text3: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: "white",
    },
    buttons: {
        marginTop: 10,
        marginBottom: 10,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        paddingHorizontal: 32,
        backgroundColor: "#53B175",
        width: 350,
        height: 45,
        borderRadius: 10,
        elevation: 5,
    },
    input: {
        marginVertical: 10,
        fontSize: 14,
        color: "black",
        height: 45,
        padding: 10,
        paddingLeft: 20,
        backgroundColor: "#e2e2e2",
        width: 350,
        borderRadius: 10,
    },
    setting: {
        justifyContent: "space-between",
        padding: 25,
        borderBottomColor: "#B4AEA7",
        borderRadius: 5,
        borderWidth: 0.5,
    },
    avatar: {
        width: 50,
        borderRadius: 30,
        marginRight: 30,
        marginTop: 15,
        height: 50,
    },
    scrollContainer: {
        marginTop: 20,
    },
    card: {
        borderRadius: 15,
        width: "100%",
        backgroundColor: "#bfbfbf",
        marginTop: 30,
        alignItems: "flex-start",
        width: "90%",
        flex: 1,
    },
    container: {
        backgroundColor: "#F4F3F4",
        flex: 1,
    },
    imgContainer: {
        alignItems: "flex-start",
        flex: 1,
        width: "100%",
        justifyContent: "flex-start",
    },
});
