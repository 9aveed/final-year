import {
    StyleSheet,
    Text,
    View,
    ScrollView,
} from "react-native";
import * as React from "react";
import { useNavigation } from "@react-navigation/native";

const SellerPrivacy = () => {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Terms & Conditions</Text>
            <ScrollView contentContainerStyle={{ gap: 20, }}>
                <View >
                    <Text style={{ fontSize: 14, fontWeight: '800', color: "white", }}>
                        We collect personal information, such as name, contact details, and address, when you register on our App. Location data may also be collected. This information is used for service provision and improvement.
                        {'\n'}
                        {'\n'}
                        Your personal information is used for processing orders, enabling communication between users and sellers, and enhancing App functionality. Location data may be used for deliveries.
                        {'\n'}
                        {'\n'}
                        We may share your information with sellers and delivery partners to fulfill orders. We do not sell or rent your personal information. Data may be shared with law enforcement or regulatory authorities as required.
                        {'\n'}
                        {'\n'}
                        Security measures are in place to protect your data, though online platforms are never entirely secure.
                        {'\n'}
                        {'\n'}
                        Cookies and tracking technologies are used for service improvement and personalization. You can manage cookie preferences.
                        {'\n'}
                        {'\n'}
                        Our App may contain links to third-party websites or services; their privacy policies apply.
                        {'\n'}
                        {'\n'}
                        Our services are not intended for children under 13. Contact us if you believe a child has provided their information.
                        {'\n'}
                        {'\n'}
                        This Privacy Policy may be updated, and you will be notified of significant changes. Your continued use of our services implies acceptance of the updated policy.
                        {'\n'}
                        {'\n'}
                        For questions or concerns about this Privacy Policy or your personal data, please contact us using the provided information. Your use of our App implies consent to this Privacy Policy. Please read and understand it before using our services.
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
};
export default SellerPrivacy;
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


