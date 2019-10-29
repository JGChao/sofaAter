import instance from "./axios";
const filepath = "api/upload";

export default {
    deleteFile(src){
        return instance.delete(filepath +'/1?path='+ src)
    },
    deleteFiles(srcs){
        return instance.put(filepath+'/1',{
            srcs
        })
    }
}