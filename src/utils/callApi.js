import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL;
let actions = {};

export const getToken = async () => {
    try {
        const response = await axios.get(`${BASE_URL}token`);  
        return response.data.access_token;
    } catch (error) {
        console.error("Error fetching token", error);
        return null;
    }
};

export const getArtists = async () => {
    try {
        const response = await axios.get(BASE_URL + "artists");
        return response.data;
    } catch (error) {
        console.error("Error fetching artists:", error);
        return [];
    }
};

export const getSongs = async (artistId) => {
    try {
        const response = await axios.get(`${BASE_URL}songs/${artistId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching songs:", error);
        return [];
    }
};

export const getAlbumTracks = async (albumId) => {
    try {
        const response = await axios.get(`${BASE_URL}album/${albumId}`);
        return response.data; // Aquí tienes todas las canciones del álbum
    } catch (error) {
        console.error("Error al obtener las canciones del álbum:", error);
        return [];
    }
};

export const getArtist = async (artistId) => {
    try {
        const response = await axios.get(`${BASE_URL}artist/${artistId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching artist:", error);
        return [];
    }
}


export const getSecretSong = async (artistId) => {
    try {
        const response = await axios.get(`${BASE_URL}secret_song/${artistId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching artist:", error);
        return [];
    }
}

