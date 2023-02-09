import axios from "../axios"

const handleLoginApi = (UserEmail, UserPassword) => {
    return axios.post('api/login', { email: UserEmail, password: UserPassword });
}
const getAllUser = (inputId) => {
    return axios.get(`api/get-all-users?id=${inputId}`);
}
const createNewUser = (data) => {
    return axios.post('/api/create-new-user', data);
}
const DeleteUser = (userId) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: userId
        }
    });
}
const EditServiceUser = (inputData) => {
    return axios.put('/api/edit-user', inputData);
}
export { handleLoginApi, getAllUser, createNewUser, DeleteUser, EditServiceUser }