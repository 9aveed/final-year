import {
    StyleSheet,
    Text,
    View,
    ScrollView,
} from "react-native";
import * as React from "react";
import { useNavigation } from "@react-navigation/native";

const About = () => {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <Text style={styles.title}>About SmartBasket App</Text>
            <ScrollView contentContainerStyle={{ gap: 20, }}>
                <View >
                    <Text style={{ fontSize: 14, fontWeight: '800', color: "white", }}>
                        Welcome to our Grocery Store App! We are dedicated to providing a convenient and seamless platform for users to buy and sell a wide variety of groceries, including vegetables, fruits, meat, and dairy products. Here, we aim to create a marketplace that connects customers with local sellers, allowing them to access fresh and quality products from the comfort of their homes.
                        {'\n'}
                        {'\n'}
                        Our platform is designed to bring together both buyers and sellers, fostering a sense of community and supporting local businesses. We are committed to ensuring that your experience on our App is enjoyable and safe.
                        {'\n'}
                        {'\n'}
                        This Privacy Policy may be updated, and you will be notified of significant changes. Your continued use of our services implies acceptance of the updated policy.
                        {'\n'}
                        {'\n'}
                        Please review our Privacy Policy and Seller Terms and Conditions to understand how your data is handled and the rules for using our App.
                        {'\n'}
                        {'\n'}
                        We are here to serve you and provide a platform that simplifies your grocery shopping experience. If you have any questions or need assistance, don't hesitate to reach out to our customer support. Thank you for choosing our Grocery Store App for your grocery needs.     </Text>
                </View>
            </ScrollView>
        </View>
    );
};
export default About;
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#53B175",
        flex: 1,
        padding: 29,
        gap: 20
    },
    title: {
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: 22,
        letterSpacing: 0.49,
        color: "white",
        textAlign: 'center',
        paddingTop: 20
    },

});


