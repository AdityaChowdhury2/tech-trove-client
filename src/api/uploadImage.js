import axios from "axios"

export const uploadImage = async (form) => {
    const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB}`, form);
    return data.data.url;
}