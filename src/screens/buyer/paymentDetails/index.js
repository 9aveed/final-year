// import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
// import React from 'react'
// import { Formik } from "formik";
// import AppBar from '../../../components/appBar';

// const PaymentDetails = ({ navigation }) => {
//     return (
//         <View style={{ flex: 1, backgroundColor: '#F4F3F4', }}>
//             <AppBar showBackArrow={true} showProfile={false} title="Payment Details" navigation={navigation} />
//             <Formik
//                 initialValues={{ name: "", phone: "", address: "" }}
//                 onSubmit={(values) => {
//                     console.log(values, "paymentValues innnn values");
//                     navigation.navigate('payment')
//                 }}
//             >
//                 {({ handleChange, handleBlur, handleSubmit, values }) => (
//                     <View style={{ backgroundColor: 'transparent', flex: 1, alignItems: 'center' }}>
//                         <TextInput
//                             placeholderTextColor="#222430"
//                             style={styles.input}
//                             placeholder="Name"
//                             onChangeText={handleChange("name")}
//                             onBlur={handleBlur("name")}
//                             value={values.name}
//                         />
//                         <TextInput
//                             placeholderTextColor="#222430"
//                             style={styles.input}
//                             placeholder="Phone Number"
//                             keyboardType='number-pad'
//                             onChangeText={handleChange("phone")}
//                             onBlur={handleBlur("phone")}
//                             value={values.phone}
//                         />
//                         <TextInput style={styles.input}
//                             placeholderTextColor="#222430"
//                             placeholder='Address'
//                             multiline={true}
//                             editable={true}
//                             numberOfLines={5}
//                             onChangeText={handleChange("address")}
//                             onBlur={handleBlur("address")}
//                             value={values.address}
//                             keyboardType='default' />
//                         <TouchableOpacity
//                             onPress={handleSubmit}
//                             style={styles.buttons}
//                         >
//                             <Text style={styles.text3}>Continue To Payment</Text>
//                         </TouchableOpacity>
//                     </View>
//                 )}
//             </Formik>
//         </View>
//     );
// }

// export default PaymentDetails

// const styles = StyleSheet.create({
//     input: {
//         margin: 10,
//         fontSize: 18,
//         color: "black",
//         height: 45,
//         paddingLeft: 20,
//         backgroundColor: "#e2e2e2",
//         width: 350,
//         borderRadius: 10,
//     },
//     title: {
//         fontStyle: "normal",
//         fontWeight: "600",
//         fontSize: 24,
//         lineHeight: 23,
//         letterSpacing: 0.49,
//         color: "#000000",
//     },
//     text3: {
//         fontSize: 20,
//         fontWeight: "700",
//         color: "#FFFFFF",
//     },
//     buttons: {
//         marginTop: 50,
//         alignItems: "center",
//         justifyContent: "center",
//         paddingVertical: 12,
//         paddingHorizontal: 32,
//         width: 350,
//         height: 45,
//         borderRadius: 5,
//         elevation: 5,
//         backgroundColor: "#ff7465",
//     },
// })