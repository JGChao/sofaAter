<template>
    <div>
        <el-form :inline="true" :model="form" class="demo-form-inline">
            <el-form-item label="分类名称">
                <el-input v-model="form.cname" placeholder="分类名称"></el-input>
            </el-form-item>
            <el-form-item label="分类排序">
                <el-input v-model="form.sort" placeholder="分类排序"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="appendfirst">插入一级栏目</el-button>
            </el-form-item>
        </el-form>
        <el-tree :data="categorydata"  :props="Props"
                 show-checkbox
                 node-key="cid"  :default-expanded-keys="[1]"  :expand-on-click-node="false"
        >
             <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
                <span>
                  <el-button
                          type="text"
                          size="mini"
                          icon="el-icon-plus"
                          @click="() => append(data)">
                  </el-button>
                  <el-button
                          type="text"
                          size="mini"
                          icon="el-icon-delete"
                          @click="() => remove(node, data)">
                  </el-button>
                    <el-button
                            type="text"
                            size="mini"
                            icon="el-icon-edit"
                            @click="()=>edit(data)">
                  </el-button>
                </span>
             </span>
        </el-tree>

        <el-dialog title="编辑分类" :visible.sync="dialogFormVisible" :before-close="handleClose">
            <el-form :model="formCategory">
                <el-form-item label="分类名称" :label-width="formLabelWidth">
                    <el-input v-model="formCategory.cname" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="分类排序" :label-width="formLabelWidth">
                    <el-input v-model="formCategory.sort" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="所属父级" :label-width="formLabelWidth">
                    <el-select v-model="formCategory.pid" placeholder="请选择所属父级">
                        <el-option label="一级栏目" value="0"></el-option>
                        <el-option v-for="itme in categoryLevel1" :label="itme.cname" :value="itme.cid" :key="itme.cid"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateCategory">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import category from "../../../api/category";
    import code from "../../../config/code";

    export default {
        name: "Category",
        data() {
            return {
                form:{
                    cname:'分类栏目',
                    sort:'10',
                    pid:0
                },
                categorydata: [],
                Props: {
                    children: "children",
                    label: "cname"
                },
                dialogFormVisible:false,
                formLabelWidth:'80px',
                formCategory:{
                    pid:'',
                    sort:'',
                    cname:'',
                },
            };
        },
        methods: {
            getCategory() {
                category.queryCategorys().then(res => {
                    let data=res.data;
                    if(data.code == code.CODE_SUCCESS ){
                        this.categorydata=data.data;
                    }
                });
            },
            //添加 二级
            append(data){
                let obj = Object.assign({},this.form);
                obj.pid = data.cid;
                category.insertCategory(obj).then(res => {
                    let hdata = res.data;
                    if(hdata.code == code.CODE_SUCCESS){
                        obj.cid = hdata.lastid;
                        if(!data.children){
                            this.$set(data,'children',[])
                        }
                        data.children.push(obj);
                        this.$message.success(hdata.msg)
                    }else{
                        this.$message.error(hdata.msg)
                    }
                })
            },
            //添加一级
            appendfirst(){
                let obj = Object.assign({},this.form);
                category.insertCategory(obj).then(res=>{
                    let result = res.data;
                    if(result.code == code.CODE_SUCCESS){
                        obj.cid = result.lastid;
                        this.categorydata.push(obj);
                        this.$message.success(result.msg)
                    }else{
                        this.$message.error(result.msg)
                    }
                })
            },
            //删除
            remove(node, data){
                category.deleteCategory(data.cid).then(res=>{
                    let result = res.data;
                    if(result.code == code.CODE_SUCCESS){
                        const parent = node.parent;
                        const children = parent.data.children || parent.data;
                        const index = children.findIndex(d => d.cid === data.cid);
                        children.splice(index, 1);
                        this.$message.success(result.msg)
                    }else{
                        this.$message.error(result.msg)
                    }
                })
            },
            // 编辑
            edit(data){
                this.dialogFormVisible = true;
                let obj = Object.assign({},data);
                if(obj.children){
                    delete obj.children;
                }
                this.formCategory = obj;
            },
            //关掉对话框
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            //更新
            updateCategory(){
                category.updateCategory(this.formCategory).then(res=>{
                    let result = res.data;
                    if(result.code == code.CODE_SUCCESS){
                        this.getCategory();
                        this.$message.success(result.msg);
                        this.dialogFormVisible = false;
                    }else{
                        this.$message.error(result.msg)
                    }
                })
            },

        },
        computed:{
            categoryLevel1(){
               let result = this.categorydata.map(ele=>({cname:ele.cname,sort:ele.sort,pid:ele.pid,cid:ele.cid}));
               return result;
            }
        },
        mounted() {
            this.getCategory()
        }
    };
</script>

<style scoped>
    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
    }
</style>