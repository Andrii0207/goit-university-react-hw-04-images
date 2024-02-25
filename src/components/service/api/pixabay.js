import axios from 'axios';

const API_KEY = "29711315-8270253fad608a552f88c48ec"

axios.defaults.baseURL = " https://pixabay.com/api/";
axios.defaults.params = {
    image_type: "photo",
    orientation: "horizontal",
    per_page: 12
}

export async function fetchImages(query, page) {
    const { data } = await axios.get(`?q=${query}&page=${page}&key=${API_KEY}`)
    console.log(data)
    return data;
}

