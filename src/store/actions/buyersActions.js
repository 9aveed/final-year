


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
import moment from 'moment';
export const BuyerSignUpMethod = ({ values, navigation }) => async dispatch => {
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
        const userData = await SetBuyerFireStore({ userCredential, values, isNewUser: true, profileImage, dispatch })
        dispatch({
            type: "CURRENT_USER",
            payload: userData
        });
        navigation.navigate("buyerdashboard")

    } catch (err) {
        console.log(err, 'signUp actionerror');
    } finally {
        dispatch({
            type: "AUTH_LOADER",
            payload: false,
        });
    }
};

export const SetBuyerFireStore = async ({ userCredential, values, isNewUser, profileImage, dispatch }) => {
    try {
        if (isNewUser) {
            await setDoc(
                doc(db, "users", `${userCredential.user.uid}`),
                {
                    uid: userCredential.user.uid,
                    displayName: values.name,
                    email: values.email,
                    phoneNumber: values.phone,
                    address: values?.address,
                    profileImage: profileImage || "",
                    userType: 'buyer',
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


export const BuyerLoginMethod = ({ values, navigation }) => async dispatch => {
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
        const userData = await SetBuyerFireStore({ userCredential, values, isNewUser: false, dispatch });
        dispatch({
            type: "CURRENT_USER",
            payload: userData
        });
        navigation.navigate("buyerdashboard")

    } catch (err) {
        console.log(err, 'signIn actionerror');
    } finally {
        dispatch({
            type: "AUTH_LOADER",
            payload: false,
        });
    }
}

export const BuyerFetchProducts = () => async dispatch => {
    try {
        dispatch({
            type: "BUYER_LOADER",
            payload: false,
        });
        const q = query(collection(db, 'product'), where('stock', '>', 0));
        onSnapshot(q, (querySnapshot) => {
            const requests = [];
            querySnapshot.forEach((doc) => {
                requests.push({ ...doc.data(), id: doc.id });
            });
            dispatch({
                type: 'ALL_BUYER_PRODUCTS',
                payload: requests,
            });
        })

    } catch (err) {
        console.log(err, 'signIn actionerror');
    } finally {
        dispatch({
            type: "BUYER_LOADER",
            payload: false,
        });
    }
}

export const BuyerCategoryProducts = ({ cat }) => async dispatch => {
    try {
        dispatch({
            type: "BUYER_LOADER",
            payload: false,
        });
        const q = query(collection(db, 'product'),
            where('category', '==', cat));
        onSnapshot(q, (querySnapshot) => {
            const requests = [];
            querySnapshot.forEach((doc) => {
                requests.push({ ...doc.data(), id: doc.id });
            });
            dispatch({
                type: 'BUYER_CATEGORY_PRODUCTS',
                payload: requests,
            });
        })

    } catch (err) {
        console.log(err, 'signIn actionerror');
    } finally {
        dispatch({
            type: "BUYER_LOADER",
            payload: false,
        });
    }
}

export const BuyerCreateOrder = ({ navigation, userAddress, userData, cartData }) => async (dispatch) => {
    try {
        dispatch({
            type: "BUYER_LOADER",
            payload: true,
        });

        const ordersRef = collection(db, 'orders');
        const orderItemsRef = collection(db, 'order_items');

        const orderData = []; // An array to store order details

        for (const cartItem of cartData) {
            const shopId = cartItem?.item?.shopId;

            // Create an order item for each product
            console.log(cartItem, '123123')
            const orderItem = {
                productId: cartItem?.item?.id,
                quantity: cartItem?.quantity,
                productName: cartItem?.item?.productName,
                productImage: cartItem?.item?.productImage,
                shopName: cartItem?.item?.shopName,
                productWeight: cartItem?.item?.productWeight,
                price: cartItem?.item?.productPrice,
                // Add other order item details

                // ...
            };

            const orderItemDocRef = await addDoc(orderItemsRef, orderItem);

            // Check if there is an existing order for the shop
            const existingOrder = orderData.find(order => order.shopId === shopId);

            if (existingOrder) {
                // Add the order item reference to the existing order
                existingOrder.orderItemRefs.push(orderItemDocRef);
            } else {
                // Create a new order for the shop
                const newOrder = {
                    userId: userData?.uid,
                    address: userAddress,
                    shopId: shopId,
                    orderItemRefs: [orderItemDocRef], // Array of order item references
                    orderState: 'pending'
                    // Add other order details

                    // ...
                };

                orderData.push(newOrder);
            }
        }

        // Create orders in the 'orders' collection
        for (const order of orderData) {
            await addDoc(ordersRef, order);
        }

        dispatch({
            type: "ORDER_PLACED",
            payload: 'The orders are placed. Please wait for a response.',
        });

        navigation.navigate('buyerdashboard');
    } catch (err) {
        console.log(err, 'Create order error');
    } finally {
        dispatch({
            type: "BUYER_LOADER",
            payload: false,
        });
    }
};

export const FetchBuyerNotifications = ({ id }) => async dispatch => {
    try {
        dispatch({
            type: "BUYER_LOADER",
            payload: false,
        });
        console.log(id, 'sdfsdfsdf iddddddddddd')
        const q = query(collection(db, 'notifications'), where('userId', '==', id));
        onSnapshot(q, (querySnapshot) => {
            const requests = [];
            querySnapshot.forEach((doc) => {
                requests.push({ ...doc.data(), id: doc.id });
            });
            console.log(requests, 'manimi')
            dispatch({
                type: 'BUYER_NOTIFICATIONS',
                payload: requests,
            });
        })

    } catch (err) {
        console.log(err, 'signIn actionerror');
    } finally {
        dispatch({
            type: "BUYER_LOADER",
            payload: false,
        });
    }
}
