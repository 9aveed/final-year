


import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  getAuth,
} from 'firebase/auth';
import {
  query,
  setDoc,
  collection,
  where,
  doc,
  getFirestore,
  onSnapshot,
  getDoc,
  getDocs,
  QuerySnapshot,
  addDoc,
  updateDoc,
  Timestamp,
} from 'firebase/firestore';
import { uploadImageAndDownloadUrl } from "../../utils/uploadImage"
import { auth, db } from '../../../config';

export const SellerSignUpMethod = ({ values, navigation }) => async dispatch => {
  try {
    dispatch({
      type: "AUTH_LOADER",
      payload: true,
    });
    let profileImage = ""

    if (values.profileImage) {
      profileImage = await uploadImageAndDownloadUrl(
        values.profileImage,
        values.name,
        "profileimage.jpeg"
      )
    }
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password,
      values.name,
      values.phone
    );
    const userData = await SetSellerFireStore({ userCredential, values, isNewUser: true, profileImage, dispatch })
    dispatch({
      type: "CURRENT_USER",
      payload: userData
    });
    navigation.navigate("sellerdashboard")

  } catch (err) {
    console.log(err, 'signUp actionerror');
  } finally {
    dispatch({
      type: "AUTH_LOADER",
      payload: false,
    });
  }
};

export const SetSellerFireStore = async ({ userCredential, values, isNewUser, profileImage, dispatch }) => {
  try {
    if (isNewUser) {
      await setDoc(
        doc(db, "users", `${userCredential.user.uid}`),
        {
          uid: userCredential.user.uid,
          displayName: values.name,
          email: values.email,
          phoneNumber: values.phone,
          profileImage: profileImage || "",
          userType: 'seller',
          shopName: values?.shopName,
          metadata: {
            createdAt: userCredential.user.metadata.createdAt,
            creationTime: userCredential.user.metadata.creationTime,
            lastLoginAt: userCredential.user.metadata.lastLoginAt,
            lastSignInTime: userCredential.user.metadata.lastSignInTime,
          }
        });
    }

    const docRef = doc(db, "users", userCredential.user.uid)
    const docSnap = await getDoc(docRef);
    return docSnap?.data()

  } catch (e) {
    console.log(e, 'error in set user')
  }
};


export const SellerLoginMethod = ({ values, navigation }) => async dispatch => {
  const auth = getAuth()
  try {
    dispatch({
      type: "AUTH_LOADER",
      payload: true,
    });
    const userCredential = await signInWithEmailAndPassword(
      auth,
      values.email,
      values.password,
    );
    const userData = await SetSellerFireStore({ userCredential, values, isNewUser: false, dispatch });
    dispatch({
      type: "CURRENT_USER",
      payload: userData
    });
    navigation.navigate("sellerdashboard")

  } catch (err) {
    console.log(err, 'signIn actionerror');
  } finally {
    dispatch({
      type: "AUTH_LOADER",
      payload: false,
    });
  }
}

export const SellerUploadProduct = ({ values, selectedCategory, userData, navigation, description }) => async dispatch => {
  try {
    dispatch({
      type: "SELLER_LOADER",
      payload: true,
    });
    let productImage = ""
    console.log(values, 'values')
    if (values?.productImages) {
      productImage = await uploadImageAndDownloadUrl(
        values?.productImages,
        values?.productName,
        "productImages.jpeg"
      );
      console.log(productImage, 'imag11111111e')
    }
    let weight = "";
    weight = selectedCategory == "vegetable" || "fruits" || "meat" ? "kg" : 'liter'
    await addDoc(collection(db, 'product'), {
      category: selectedCategory || "",
      shopId: userData?.uid,
      shopName: userData?.shopName,
      productName: values?.productName,
      productWeight: weight,
      desc: description,
      productPrice: values?.price,
      productImage: productImage || "",
      stock: 0
    });
    navigation.goBack()
  } catch (err) {
    console.log(err, 'signIn actionerror');
  } finally {
    dispatch({
      type: "SELLER_LOADER",
      payload: false,
    });
  }
}

export const UpdateSellerProduct = ({ values, selectedCategory, userData, navigation, productId, description }) => async dispatch => {
  try {
    dispatch({
      type: "AUTH_LOADER",
      payload: true,
    });
    let productImage = "";

    if (values?.productImages) {
      productImage = await uploadImageAndDownloadUrl(
        values?.productImages,
        values?.productName,
        "productImages.jpeg"
      );
    }

    let weight = selectedCategory === "vegetable" || "fruits" || "meat" ? "kg" : "liter";
    const productDocRef = doc(db, 'product', productId);
    await updateDoc(productDocRef, {
      category: selectedCategory || "",
      shopId: userData?.uid,
      shopName: userData?.shopName,
      productName: values?.productName,
      productWeight: weight,
      desc: description,
      productPrice: values?.price,
      productImage: productImage || "",
      stock: values?.stock,
    });

    navigation.goBack();
  } catch (err) {
    console.log(err, 'update product action error');
  } finally {
    dispatch({
      type: "AUTH_LOADER",
      payload: false,
    });
  }
}

export const FetchCurrentUserProducts = (userData) => async dispatch => {
  try {
    dispatch({
      type: "SELLER_LOADER",
      payload: true,
    });
    const q = query(collection(db, 'product'),
      where('shopId', '==', userData?.uid));
    onSnapshot(q, (querySnapshot) => {
      const requests = [];
      querySnapshot.forEach((doc) => {
        requests.push({ ...doc.data(), id: doc.id });
      });
      dispatch({
        type: 'ALL_SELLER_PRODUCTS',
        payload: requests,
      });
    })
  } catch (err) {
    console.log(err, 'tech actionerror');
  } finally {
    dispatch({
      type: "SELLER_LOADER",
      payload: false,
    });
  }
};

export const updateSellerProductStockInDatabase = (productId, stock) => async dispatch => {
  try {
    dispatch({
      type: "SELLER_LOADER",
      payload: true,
    });

    const productRef = doc(db, 'product', productId);
    await updateDoc(productRef, { stock });
  } catch (err) {
    console.log(err, 'tech actionerror');
  } finally {
    dispatch({
      type: "SELLER_LOADER",
      payload: false,
    });
  }
};
export const Signout = ({ navigation }) => async dispatch => {
  const auth = getAuth()
  try {
    await signOut(auth);
    dispatch({
      type: 'CURRENT_USER',
      payload: null
    })
    navigation.replace("introscreen");
  } catch (err) {
    console.log(err, ' actionerror');
  } finally {
    console.log('finally');
  }
};

export const fetchUserDetails = async (userId) => {
  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);
  if (userDoc.exists()) {
    return { ...userDoc.data(), id: userId };
  } else {
    return null;
  }
};
export const FetchCurrentUserNotifications = (userData) => async (dispatch) => {
  try {
    dispatch({
      type: "SELLER_LOADER",
      payload: true,
    });

    const q = query(collection(db, 'orders'),
      where('shopId', '==', userData?.uid),
      where('orderState', '==', 'pending')
    );
    onSnapshot(q, async (querySnapshot) => {
      const requests = [];

      for (const doc of querySnapshot.docs) {
        const orderData = doc.data();
        const orderItemDetails = [];
        const userId = orderData.userId;
        for (const orderItemRef of orderData.orderItemRefs) {
          const orderItemDoc = await getDoc(orderItemRef);
          if (orderItemDoc.exists()) {
            orderItemDetails.push({ ...orderItemDoc.data(), id: orderItemDoc.id });
          }
        }
        const userDetails = await fetchUserDetails(userId);

        // Create a new object excluding the 'orderItemRefs' field
        const orderDataWithoutRefs = { ...orderData };
        delete orderDataWithoutRefs.orderItemRefs;

        requests.push({ ...orderDataWithoutRefs, id: doc.id, orderItemDetails, userDetails });
      }
      dispatch({
        type: 'SELLER_ORDERS',
        payload: requests,
      });
    });
  } catch (err) {
    console.log(err, 'tech action error');
  } finally {
    dispatch({
      type: "SELLER_LOADER",
      payload: false,
    });
  }
};
export const AcceptUserOrder = ({ data, navigation, userData }) => async (dispatch) => {
  try {
    dispatch({
      type: "SELLER_LOADER",
      payload: true,
    });
    const orderId = data?.id;
    const orderRef = doc(db, 'orders', orderId);

    // Fetch the order document
    const orderDoc = await getDoc(orderRef);

    if (orderDoc.exists()) {
      const orderData = orderDoc.data();

      // Fetch the data for each orderItem based on its references
      const orderItemDetails = [];
      const stockUpdates = []; // Collect stock updates here

      for (const orderItemRef of orderData.orderItemRefs) {
        const orderItemDoc = await getDoc(orderItemRef);

        if (orderItemDoc.exists()) {
          const orderItem = { ...orderItemDoc.data(), id: orderItemDoc.id };
          orderItemDetails.push(orderItem);
          stockUpdates.push({
            productId: orderItem.productId,
            quantity: orderItem.quantity,
          });
        }
      }
      for (const stockUpdate of stockUpdates) {
        const productId = stockUpdate.productId;
        const productRef = doc(db, 'product', productId);
        const productDoc = await getDoc(productRef);
        if (productDoc.exists()) {
          const productData = productDoc.data();
          const currentStock = productData.stock;
          const orderQuantity = stockUpdate.quantity;

          const newStock = currentStock - orderQuantity;
          await updateDoc(productRef, { stock: newStock });
        }
      }

      await updateDoc(orderRef, { orderState: 'accepted' });
      const userId = data?.userDetails?.id;
      const status = "accepted"
      const notificationsCollectionRef = collection(db, 'notifications');
      const notificationDocRef = doc(notificationsCollectionRef);
      await setDoc(notificationDocRef, {
        type: 'order',
        userId: userId,
        status,
        orderDetails: data?.orderItemDetails
      });
      navigation.navigate('sellerdashboard');
    }
  } catch (err) {
    console.log(err, 'tech action error');
  } finally {
    dispatch({
      type: "SELLER_LOADER",
      payload: false,
    });
  }
};
export const RejectUserOrder = ({ data, navigation, userData }) => async (dispatch) => {
  try {
    dispatch({
      type: "SELLER_LOADER",
      payload: true,
    });

    const orderId = data?.id;
    const orderRef = doc(db, 'orders', orderId);
    await updateDoc(orderRef, {
      orderState: 'rejected'
    });
    FetchCurrentUserNotifications(userData)
    const userId = data?.userDetails?.id;
    const status = "accepted";
    const notificationsCollectionRef = collection(db, 'notifications');
    const notificationDocRef = doc(notificationsCollectionRef);
    await setDoc(notificationDocRef, {
      type: 'order',
      userId: userId,
      status
    });
    navigation.navigate('sellerdashboard')

  } catch (err) {
    console.log(err, 'tech action error');
  } finally {
    dispatch({
      type: "SELLER_LOADER",
      payload: false,
    });
  }
};
export const UpdateSellerProfile = ({ values, userData, navigation }) => async (dispatch) => {
  try {
    dispatch({
      type: "SELLER_LOADER",
      payload: true,
    });

    // Create a reference to the seller's document in the 'users' collection
    const sellerDocRef = doc(db, 'users', userData.uid);

    // Update the document with the new profile data
    await updateDoc(sellerDocRef, {
      displayName: values?.name,
      email: values?.email,
      shopName: values?.shopName,
      phoneNumber: values?.phoneNumber,
      // Add other fields you want to update
    });

    // Dispatch an action or perform any other necessary actions upon success
    navigation.navigate('sellerdashboard')
  } catch (err) {
    console.log(err, 'tech action error');
  } finally {
    dispatch({
      type: "SELLER_LOADER",
      payload: false,
    });
  }
};


