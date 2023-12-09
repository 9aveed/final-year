import {
    StyleSheet,
    Text,
    View,
    ScrollView,
} from "react-native";
import * as React from "react";
import { useNavigation } from "@react-navigation/native";

const SellerTermsCondition = () => {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Terms & Conditions</Text>

            <Text style={{ fontSize: 14, fontWeight: '300', color: "white", }}>By registering as a Seller on the App, you acknowledge that
                you have read, understood, and agreed to abide by these Terms and any
                other policies or guidelines provided by the App. Failure to comply with
                these Terms may result in the suspension or termination of your account on the App.</Text>
            <ScrollView contentContainerStyle={{ gap: 20, }}>
                {PrivacyPolicy.map((e, index) => {
                    return (
                        <View key={index}>
                            <Text style={{ fontSize: 14, fontWeight: '800', color: "white", }}>{e.title}</Text>
                            <Text style={{ fontSize: 13, fontWeight: '500', color: "white", }}>{e.desc}</Text>
                        </View>
                    )
                })}
            </ScrollView>
        </View>
    );
};
export default SellerTermsCondition;
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


const PrivacyPolicy = [
    {
        title: 'Seller Registration and Verification:',
        desc: "To become a Seller on the App, complete the registration process with accurate and up-to-date information. We may verify your identity and product authenticity."
    },
    {
        title: 'Product Listings:',
        desc: "Create accurate and detailed product listings, including product name, category, price, quantity, and high-quality images. Ensure compliance with legal and regulatory requirements."
    },
    {
        title: 'Product Availability:',
        desc: "Maintain accurate stock levels, updating the status promptly if a product is out of stock."
    },
    {
        title: 'Order Fulfillment:',
        desc: "Process and fulfill orders in a timely manner, ensuring products are fresh, high quality, and properly packaged."
    },
    {
        title: 'Pricing and Payment:',
        desc: "Set product prices at your discretion. Payment for products is processed through the App's system, with proceeds transferred to you after deducting applicable fees."
    },
    {
        title: 'Delivery and Communication:',
        desc: "Deliver products to the customer's specified address. Provide accurate contact information for customer communication."
    },
    {
        title: 'Customer Support:',
        desc: "Offer responsive and helpful customer support, working to resolve complaints or issues promptly and fairly."
    },
    {
        title: 'Returns and Refunds:',
        desc: "Maintain a clear return and refund policy, adhering to the App's policies regarding returns and refunds."
    },
    {
        title: 'Quality and Safety:',
        desc: "Ensure product quality and safety. Communicate any recalls or safety issues to the App and customers promptly."
    },
    {
        title: 'Termination:',
        desc: "The App may suspend or terminate your account for violation of these Terms or applicable laws and regulations."
    },
    {
        title: 'Liability:',
        desc: "You are solely responsible for products and any associated liabilities. The App is not liable for product quality, safety, or legality."
    },
    {
        title: 'Amendments:',
        desc: "These Terms may be updated from time to time, and you will be notified of such changes."
    },
    {
        title: '',
        desc: ""
    },
    {
        title: '',
        desc: ""
    },
]