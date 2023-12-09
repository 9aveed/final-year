import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
export const createBlob = async (image) => {
    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.onload = function () {
            resolve(xhr.response)
        }
        xhr.onerror = function (e) {
            console.log("eeeee", e)
            reject(new TypeError("Network request failed"))
        }
        xhr.responseType = "blob"
        xhr.open("GET", image, true)
        xhr.send(null)
    })

    return blob
};

export const getUrl = (url) => {
    const xhr = new XMLHttpRequest()
    xhr.responseType = "blob"
    xhr.onload = (event) => {
        const blob = xhr.response
    }
    xhr.open("GET", url)
    xhr.send()

    return url
};

export const uploadImageAndDownloadUrl = async (
    image,
    folderName,
    imageName
) => {
    let url
    try {
        const storage = await getStorage()
        const blob = await createBlob(image)
        const storageRef = ref(storage, `images/${folderName}/${imageName}`)
        const snapshot = await uploadBytes(storageRef, blob)
        const downloadUrl = await getDownloadURL(snapshot.ref)
        url = await getUrl(downloadUrl)
        console.log('sdsd', url)
    } catch (error) {
        console.log("upload images error!", error)
    }
    return url
};
