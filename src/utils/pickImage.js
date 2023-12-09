import * as ImagePicker from "expo-image-picker";

export const pickImage = async () => {
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (status !== "granted") {
        const { status: newStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (newStatus !== "granted") {
            return null;
        }
    }
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    })
    console.log(result, "resulter");
    if (result.cancelled) {
        return
    }
    return result?.assets?.[0].uri

};
