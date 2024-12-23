import axios from "axios";
import env from '../env';  // Путь к файлу Env.ts
class CategoryService{
    getAllCategory(){
        return axios.get(`${env.API_URL}/category`)
    }

    //14.12.2024 14:13
    create(form:any){ 
        return axios.post(`${env.API_URL}/category`,form,{
            headers:{
                'Content-Type': 'application/json',
            }
        })
    }

    //14.12.2024 14:13
    edit(form:any){ 
        return axios.post(`${env.API_URL}/category/edit`,form,{
            headers:{
                'Content-Type': 'application/json',
            }
        })
    }

    
}

export default new CategoryService()