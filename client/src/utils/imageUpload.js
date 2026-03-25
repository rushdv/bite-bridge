import axios from "axios";

const imageUpload = async (image) => {
    const formData = new FormData();
    formData.append("image", image);
    
    // The user needs to provide the VITE_IMGBB_API_KEY in their .env
    const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
    
    if (!apiKey) {
        throw new Error("imgbb API key is missing. Please add VITE_IMGBB_API_KEY to your .env file.");
    }

    const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        formData
    );
    
    return data.data.display_url;
};

export default imageUpload;
