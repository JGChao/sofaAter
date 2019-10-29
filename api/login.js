import http from './axios';

let obj = {
    checkLogin(obj){
        return http.post('api/login',obj);
    }
}
export default obj;