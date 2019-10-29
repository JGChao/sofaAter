import instance from "./axios";

export default {
    getOrders(params){
        return instance.get('api/adminorders',{
            params,
        });
    },
    // changeOrderState(boj){
    //
    // }
}