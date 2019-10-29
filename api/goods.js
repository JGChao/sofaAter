import instance from "./axios";

export default {
    queryCoodss: function(params) {
        return instance.get('api/goods',{
            params
        });
    },
    getCoodsLevel1(){
        return instance.get('api/goods'+'/create')
    },
    deleteCoods($gid) {
        return instance.delete('api/goods'+ '/'+$gid);
    }
    ,
    insertCoods(obj){
        return instance.post('api/goods',obj);
    },
    updateCoods(obj){
        obj = Object.assign({},obj);
        let cid = obj.cid;
        delete obj.cid;
        return instance.put('api/goods'+'/'+cid,obj);
    }
}