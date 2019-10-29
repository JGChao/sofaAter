import instance from "./axios";

export default {
    queryCategorys: function() {
        return instance.get('api/category');
    },
    getCategoryLevel1(){
        return instance.get('api/category'+'/create')
    },
    queryCategory() {
        instance.get();
    },
    deleteCategory($id) {
        return instance.delete('api/category'+ '/'+$id);
    }
    ,
    insertCategory(obj){
        return instance.post('api/category',obj);
    },
    updateCategory(obj){
        obj = Object.assign({},obj);
        let cid = obj.cid;
        delete obj.cid;
        return instance.put('api/category'+'/'+cid,obj);
    }
};