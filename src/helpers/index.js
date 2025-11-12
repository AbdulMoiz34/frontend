const uploadFileOnCloudinary = async (base64Image) => {
    const data = new FormData();
    data.append("file", base64Image);
    data.append("upload_preset", "141424243");
    data.append("cloud_name", "moiz34");

    try {
        const res = await fetch("https://api.cloudinary.com/v1_1/moiz34/image/upload", {
            body: data,
            method: "POST"
        });
        const data1 =  await res.json();

        return data1.secure_url;
    } catch (err) {
        console.log(err)
        throw err;
    }
}

function convertToMinutes(time) {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
}

export { uploadFileOnCloudinary, convertToMinutes };