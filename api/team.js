import instance from "./axios";

export default {
    queryTeams: function(params) {
        return instance.get('api/team',{
            params
        });
    },
    getTeamLevel1(){
        return instance.get('api/team'+'/create')
    },
    deleteTeam($id) {
        return instance.delete('api/team'+ '/'+$id);
    }
    ,
    insertTeam(obj){
        return instance.post('api/team',obj);
    },
    updateTeam(obj){
        // obj = Object.assign({},obj);
        let id = obj.id;
        delete obj.id;
        return instance.put('api/team'+'/'+id,obj);
    },
    queryOne(id){
        return instance.get('api/team'+'/'+id);
    }
}