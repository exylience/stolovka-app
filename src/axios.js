import axios from 'axios'

const baseURL = 'http://stolovka.pocket-diary.ru/api/';

const params = {
    baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
};

export default axios.create(params)
