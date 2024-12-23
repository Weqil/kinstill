import axios from "axios";

class testService {
    getHttp(){
        return axios.get("http://jsonplaceholder.typicode.com/comments")
    }
    getHttps(){
        return axios.get("http://jsonplaceholder.typicode.com/comments")
    }
}
export default new testService