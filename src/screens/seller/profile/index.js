import React from "react";
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";
import AppBar from "../../../components/appBar";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { UpdateSellerProfile } from "../../../store/actions";
import Loader from "../../../components/Loader";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  shopName: Yup.string().required("Shop Name is required"),
  phoneNumber: Yup.string().required("Phone Number is required"),
});

const SellerProfile = () => {
  const navigation = useNavigation();
  const userData = useSelector((state) => state?.user?.user);
  const loader = useSelector((state) => state?.seller?.loader);

  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      name: userData?.displayName || "",
      email: userData?.email || "",
      shopName: userData?.shopName || "",
      phoneNumber: userData?.phoneNumber || "",
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(UpdateSellerProfile({ values, userData, navigation }))
    },
  });

  return loader ? <Loader /> : (
    <ScrollView style={styles.container}>
      <AppBar showBackArrow={true} showProfile={false} title="Profile" navigation={navigation} />
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity
          style={styles.avatarBtn}
        >
          <Image
            style={{ width: 100, height: 100, borderRadius: 100 }}
            source={userData?.profileImage ? { uri: userData?.profileImage } : require("../../../../assets/user.jpg")}
          />
        </TouchableOpacity>
        <View>
          <Text style={{ fontSize: 14, color: "black", fontWeight: "400" }}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            onChangeText={formik.handleChange("name")}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <Text style={{ color: "red", fontSize: 11, }}>{formik.errors.name}</Text>
          ) : null}
        </View>
        <View>
          <Text style={{ fontSize: 14, color: "black", fontWeight: "400" }}>Email Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            onChangeText={formik.handleChange("email")}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <Text style={{ color: "red", fontSize: 11, }}>{formik.errors.email}</Text>
          ) : null}
        </View>
        <View>
          <Text style={{ fontSize: 14, color: "black", fontWeight: "400" }}>Shop Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Shop Name"
            onChangeText={formik.handleChange("shopName")}
            value={formik.values.shopName}
          />
          {formik.touched.shopName && formik.errors.shopName ? (
            <Text style={{ color: "red", fontSize: 11, }}>{formik.errors.shopName}</Text>
          ) : null}
        </View>
        <View>
          <Text style={{ fontSize: 14, color: "black", fontWeight: "400" }}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            onChangeText={formik.handleChange("phoneNumber")}
            value={formik.values.phoneNumber}
          />
          {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
            <Text style={{ color: "red", fontSize: 11, }}>{formik.errors.phoneNumber}</Text>
          ) : null}
        </View>
        <TouchableOpacity style={styles.buttons} onPress={formik.handleSubmit}>
          <Text style={[styles.text3, { color: "white" }]}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SellerProfile;
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
    color: "#222430",
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
    backgroundColor: "white",
  },
  imgContainer: {
    alignItems: "flex-start",
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
  },
  avatarBtn: {
    backgroundColor: "white",
    height: 100,
    width: 100,
    borderRadius: 50,
    marginBottom: 60,
  }
});
