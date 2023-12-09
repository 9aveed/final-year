import { Feather } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Snackbar, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

const Toast = ({ duration = 4000 }) => {
    const dispatch = useDispatch()
    const message = useSelector((state) => state?.buyer?.message);
    const styles = getStyles();
    const [visible, setVisible] = React.useState(false);

    useEffect(() => {
        if (message) {
            setVisible(true);
        }
    }, [message]);

    const onDismissSnackBar = () => {
        setVisible(false);
        dispatch({
            type: "ORDER_PLACED",
            payload: null,
        });

    };
    return (
        <Snackbar
            duration={duration}
            visible={visible}
            onDismiss={onDismissSnackBar}
            wrapperStyle={styles.wrapper}
            style={styles.snackbar}
            action={{
                label: '',
                icon: () => <Feather name="x" size={20} color="white" />,
            }}
        >
            <Text variant="body3" color="white">
                {message && message}
            </Text>
        </Snackbar>
    );
};

export const getStyles = () => {
    const theme = useTheme();
    return StyleSheet.create({
        snackbar: {
            borderRadius: 10,
            backgroundColor: '#53B175',
        },
        wrapper: {},
        toastContainer: {
            backgroundColor: theme.colors.surface,
            borderRadius: 10,
            elevation: 5,
            padding: 10,
        },
        closeIcon: {
            height: 12,
            width: 12,
        }
    });
};

export default Toast;