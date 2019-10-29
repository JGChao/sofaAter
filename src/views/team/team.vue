<template>
    <div>
        <el-button type="primary" round @click="dialogVisible = isShow=true" style="margin: 10px 0;">成员添加</el-button>
        <!--搜索-->
        <el-form :inline="true" :model="paramsForm" class="demo-form-inline">
            <el-form-item>
                <el-input v-model="paramsForm.names" placeholder="请输入成员名字"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getTeam">查询</el-button>
            </el-form-item>
        </el-form>
        <!--搜索-->
        <!--展示-->
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="names" label="名字"></el-table-column>
            <el-table-column prop="avatar" label="成员头像">
                <template slot-scope="scope"><img :src="host+scope.row.avatar" alt="" width="80" height="80"></template>
            </el-table-column>
<!--            <el-table-column prop="cname" label="设计方向"></el-table-column>-->
            <el-table-column prop="exp" label="工作经验"></el-table-column>
            <el-table-column prop="des" label="成员描述"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="editteam(scope.row)"
                    >编辑</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="deleteteam(scope.row.id)"
                    >删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--分页-->
        <el-pagination
                background
                layout="total, prev,pager, next ,jumper"
                :total="total"
                :page-size="limit"
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange">
        </el-pagination>
        <!--添加弹出层-->
        <el-dialog  title="添加成员" :visible.sync="isShow"  center>
            <el-form :model="teamForm" >
                <el-form-item label="设计方向">
                    <el-select v-model="teamForm.cid" placeholder="请选择所属分类">
                        <el-option
                                v-for="item in categoryLevel1"
                                :key="item.cid"
                                :label="item.cname"
                                :value="item.cid"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="名字" >
                    <el-input v-model="teamForm.names" clearable></el-input>
                </el-form-item>
                <el-form-item label="成员头像">
                    <el-upload
                            class="avatar-uploader"
                            :action="host+api"
                            :on-success="handleAvatarSuccess">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="成员描述">
                    <el-input type="textarea" v-model="teamForm.des"></el-input>
                </el-form-item>
                <el-form-item label="工作经验">
                    <el-input type="textarea" v-model="teamForm.exp"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="isShow = false">取 消</el-button>
                <el-button type="primary" @click="insertTeam" >确 定</el-button>
            </div>
        </el-dialog>
        <!--编辑弹出层-->
        <el-dialog  title="添加成员" :visible.sync="isShoww"  center>
            <el-form :model="teamsForm" v-if="teamsForm">
                <el-form-item label="设计方向">
                    <el-select v-model="teamsForm.cid" placeholder="请选择所属分类">
                        <el-option
                                v-for="item in categoryLevel1"
                                :key="item.cid"
                                :label="item.cname"
                                :value="item.cid"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="名字" >
                    <el-input v-model="teamsForm.names" clearable></el-input>
                </el-form-item>
                <el-form-item label="成员头像">
                    <el-upload
                            class="avatar-uploader"
                            :action="host+api"
                            :on-success="handleAvatarSuccesss"
                    >
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="成员描述">
                    <el-input type="textarea" v-model="teamsForm.des"></el-input>
                </el-form-item>
                <el-form-item label="工作经验">
                    <el-input type="textarea" v-model="teamsForm.exp"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelteam(imgcancel)">取 消</el-button>
                <el-button type="primary" @click="updateteam">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import team from "../../../api/team";
    import code from "../../../config/code";
    import category from "../../../api/category";
    import file from "../../../api/file";

    export default {
        name: "team",
        data(){
            return {
                isShow:false,
                isShoww:false,
                page:1,
                limit:3,
                total: 0,
                teamForm:{
                    names:'',
                    des:'',
                    exp:'',
                    cid:'',
                    avatar:'',
                },
                teamsForm:null,
                imageUrl:'',
                categoryLevel1:[],
                tableData: [],
                paramsForm:{
                    names:'',
                },
                //取消
                imgcancel:[],
                //确定
                imgconfirm:[],

            }
        },
        methods:{
            //请求cid栏目
            getCategoryLevel1(){
                category.getCategoryLevel1().then(res=>{
                    let data = res.data;
                    if(data.code == code.CODE_SUCCESS){
                        this.categoryLevel1 = data.data;
                    }else{
                        this.$message.error(data.msg);
                    }
                })
            },
            //成员头像添加
            handleAvatarSuccess(res){
                this.imageUrl = this.host+res.src;
                this.teamForm.avatar = res.src;
            },
            //成员头像编辑
            handleAvatarSuccesss(res){
                this.imageUrl = this.host+res.src;
                this.imgcancel.push(res.src);
                this.imgconfirm.push(res.src);
                this.teamsForm.avatar = res.src;
            },
            //添加
            insertTeam(){
                team.insertTeam(this.teamForm).then(res=>{
                    let result = res.data;
                    // let shuju = res.config.data;
                    if(result.code == code.CODE_SUCCESS){
                        // this.tableData.unshift(shuju);
                        this.$message.success(result.msg);
                        this.isShow = false;
                    }else{
                        this.$message.error(result.msg);
                    }
                })
            },
            //请求成员信息渲染表格
            getTeam(){
                let  params={
                    page:this.page,
                    limit:this.limit,
                };
                params=Object.assign({}, params,this.paramsForm)
                team.queryTeams( params).then(res=>{
                    let result = res.data;
                    if(result.code == code.CODE_SUCCESS){
                        if(result.data.length){
                            this.tableData = result.data;
                            this.total=result.total;
                        }else{
                            this.$message.warning(result.msg)
                        }
                    }else{
                        this.$message.error(result.msg)
                    }
                })
            },
            //分页
            handleCurrentChange(val) {
                this.page = val
            },
            handleSizeChange(val) {
                this.limit = val
            },
            //删除
            deleteteam(id){
                team.deleteTeam(id).then(res=>{
                    let data = res.data;
                    if (data.code==code.CODE_SUCCESS){
                        this.tableData = this.tableData.filter(ele => ele.id != id);
                        this.$message.success(data.msg);
                        this.getTeam();
                    } else {
                        this.$message.error(data.msg);
                    }

                })
            },
            //编辑
            editteam(row){
                this.isShoww = true;
                team.queryOne(row.id).then(res=>{
                    let result = res.data;
                    if(result.code == code.CODE_SUCCESS){
                        this.teamsForm = result.data;
                        this.imageUrl = this.host + result.data.avatar;
                        this.imgconfirm.push(result.data.avatar);
                    }else{
                        this.$message.error(result.msg);
                    }
                });
            },
            //更新
            updateteam(){
                team.updateTeam(this.teamsForm).then(res=>{
                    let result = res.data;
                    if(result.code == code.CODE_SUCCESS){
                        this.isShoww = false;
                        this.cancelteam(this.imgconfirm.slice(0,-1));
                        this.teamsForm = null;
                        this.getTeam();
                        this.$message.success(result.msg);
                    }else{
                        this.isShoww = true;
                        this.cancelteam(this.imgcancel);
                        this.$message.error(result.msg);
                    }
                })
            },
            //取消
            // cancelteam(arr){
            //     this.isShoww = false;
            //     arr.length && file.deleteFiles(arr).then(res=>{
            //
            //     })
            // },

        },
        watch:{
          //分页
          page(){
              this.getTeam();
          }
        },
        computed:{
            //发送图片路径
            ...mapState(['host','api'])
        },
        mounted() {
            this.getCategoryLevel1();
            this.getTeam();
        }
    }
</script>

<style scoped>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

    .el-main[data-v-fae5bece] {
        text-align: left !important;
    }

    .formbox {
        text-align: left !important;
    }
    .bcolor{
        width: 20px;
        height: 20px;
        background: #42b983;
        border-radius: 50%;
        float: left;
        margin: 5px;
    }

</style>