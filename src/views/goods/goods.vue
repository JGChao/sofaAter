<template>
    <div>
        <el-tabs v-model="activeName" >
            <el-tab-pane label="商品查看" name="first">
            <!--搜索-->
                <el-form :inline="true" :model="paramsForm" class="demo-form-inline">
                    <el-form-item>
                        <el-input v-model="paramsForm.gname" placeholder="请输入商品名称"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="paramsForm.gename" placeholder="请输入商品英文名称"></el-input>
                    </el-form-item>
                    <el-form-item >
                        <el-col :span="11">
                            <el-input  placeholder="请输入商品价格" v-model="paramsForm.lowgprice" ></el-input>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="11">
                            <el-input placeholder="请输入商品价格" v-model="paramsForm.highgprice" ></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="getGoods">查询</el-button>
                    </el-form-item>
                </el-form>
            <!--搜索-->

                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="gname" label="商品名称"></el-table-column>
                    <el-table-column prop="gename" label="商品英文名称"></el-table-column>
                    <el-table-column prop="gprice" label="价格" width="100"></el-table-column>
                    <el-table-column prop="gthumb" label="缩略图">
                        <template slot-scope="scope"><img :src="host+scope.row.gthumb" alt="" width="130"></template>
                    </el-table-column>
                    <el-table-column prop="gcolor" label="颜色">
                        <template slot-scope="scope">
                            <div class="bcolor"  v-for="color in scope.row.gcolor.split(',')" :style="{background:color}"></div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                   >编辑</el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="deletegoods(scope.row.gid)"
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
            </el-tab-pane>

            <el-tab-pane label="商品添加" name="second">

                <el-form ref="form" :model="form" label-width="150px">
                    <el-form-item label="所属分类">
                        <el-select v-model="form.cid" placeholder="请选择所属分类">
                            <el-option
                                    v-for="item in categoryLevel1"
                                    :key="item.cid"
                                    :label="item.cname"
                                    :value="item.cid"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="商品中文名称">
                        <el-input v-model="form.gname"></el-input>
                    </el-form-item>
                    <el-form-item label="商品英文名称">
                        <el-input v-model="form.gename"></el-input>
                    </el-form-item>
                    <el-form-item label="商品价格">
                        <el-input v-model="form.gprice"></el-input>
                    </el-form-item>
                    <el-form-item label="商品描述">
                        <el-input type="textarea" v-model="form.gdes"></el-input>
                    </el-form-item>
                    <el-form-item label="商品颜色">
                        <el-input  v-model="form.gcolor"></el-input>
                    </el-form-item>
                    <el-form-item label="商品规格">
                        <el-input  v-model="form.gsize"></el-input>
                    </el-form-item>
                    <el-form-item label="商品种类">
                        <el-input  v-model="form.gtype"></el-input>
                    </el-form-item>
                    <el-form-item label="商品库存">
                        <el-input  v-model="form.gstock"></el-input>
                    </el-form-item>
                    <el-form-item label="配送信息">
                        <el-input  v-model="form.gdel"></el-input>
                    </el-form-item>
                    <el-form-item label="商品缩略图">
                        <el-upload
                                class="avatar-uploader"
                                :action="host+api"
                                :on-success="handleAvatarSuccess">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="商品轮播图">
                        <el-upload
                                :action="host+api"
                                list-type="picture-card"
                                multiple
                                :limit="5"
                                :on-preview="handlePictureCardPreview"
                                :on-success="handleBannerSuccess"
                                :on-remove="handleRemove">
                            <i class="el-icon-plus avatar-uploader-icon banner"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="商品详情">
                        <el-upload
                                :action="host+api"
                                list-type="picture-card"
                                multiple
                                :limit="5"
                                :on-preview="handlePictureCardPreview"
                                :on-success="handleDetailSuccess"
                                :on-remove="handleDetailRemove">
                            <i class="el-icon-plus avatar-uploader-icon banner"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="insertGoods">添加</el-button>
                        <el-button @click="resetGoods">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>
        <!--预览-->
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>

<script>
    import category from "../../../api/category";
    import goods from "../../../api/goods";
    import code from "../../../config/code";
    import {mapState} from "vuex";
    import file from "../../../api/file";
    export default {
        name: "goods",
        data(){
            return {
                activeName:'first',
                tableData: [],
                page:1,
                limit:3,
                total: 0,
                form:{
                    cid:'',
                    gname:'',
                    gename:'',
                    gdes:'',
                    gprice:'',
                    gsize:'',
                    gtype:'',
                    gstock:'',
                    gdel:'',
                    gthumb:'',
                    gbanner:'',
                    gcolor: '',
                    gdetail:''
                },
                categoryLevel1:[],
                imageUrl:'',
                bannerImg:[],
                detailImg:[],
                dialogImageUrl: '',
                dialogVisible: false,
                paramsForm:{
                    gname:'',
                    gename:'',
                    lowgprice:'',
                    highgprice:'',
                },
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
            // 添加
            insertGoods(){
                goods.insertCoods(this.form).then(res=>{
                    let result = res.data;
                    if(result.code == code.CODE_SUCCESS){
                        this.$message.success(result.msg);
                    }else{
                        this.$message.error(result.msg);
                    }
                })
            },
            // 重置
            resetGoods(){
                this.$refs.form.resetFields();
            },
            //缩略图
            handleAvatarSuccess(res){
                this.imageUrl = this.host+res.src;
                this.form.gthumb = res.src;
            },
            //轮播图，多图
            handleBannerSuccess(res){
                this.bannerImg.push(res.src);
            },
            //图片预览
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            // 删除轮播图片
            handleRemove(file) {
                this.bannerImg = this.bannerImg.filter(ele=>ele != file.response.src);
                this.removeImg(file.response.src);
            },
            //详情图
            handleDetailSuccess(res){
                this.detailImg.push(res.src);
            },
            //删除详情图片
            handleDetailRemove(file){
                this.detailImg = this.detailImg.filter(ele=>ele != file.response.src);
                this.removeImg(file.response.src);
            },
            removeImg(src){
                file.deleteFile(src).then(res=>{
                    let result = res.data;
                    if(result.code == code.CODE_SUCCESS){
                        this.$message.success(result.msg);
                    }else{
                        this.$message.error(result.msg);
                    }
                })
            },
            //请求分类信息渲染表格
            getGoods(){
                let  params={
                    page:this.page,
                    limit:this.limit,
                };
                params=Object.assign({}, params,this.paramsForm)
                goods.queryCoodss( params).then(res=>{
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
            deletegoods(gid){
                goods.deleteCoods(gid).then(res=>{
                    let data = res.data;
                    if (data.code==code.CODE_SUCCESS){
                        this.tableData = this.tableData.filter(ele => ele.gid != gid);
                        this.$message.success(data.msg);
                        this.getGoods();
                    } else {
                        this.$message.error(data.msg);
                    }
                })
            }
        },
        watch:{
            //监听轮播图改变
            bannerImg(newv){
                this.form.gbanner = newv.join(',');
            },
            //监听轮播图改变
            detailImg(newv){
                this.form.gdetail = newv.join(',');
            },
            page(){
                this.getGoods()
            }
        },
        computed:{
            ...mapState(['host','api'])
        },
        mounted() {
            this.getCategoryLevel1();
            this.getGoods();
        }
    }
</script>

<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        background-color: #FBFDFF;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .banner{
        width: 148px !important;
        height: 148px!important;
        line-height: 148px!important;
    }

</style>

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