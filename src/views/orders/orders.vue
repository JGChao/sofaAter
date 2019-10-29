<template>
    <div>
        <el-table
                :data="orders"
                style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-table :data="props.row.goods">
                        <el-table-column label="ID" prop="gid"></el-table-column>
                        <el-table-column label="名称" prop="gname"></el-table-column>
                        <el-table-column label="价格" prop="gprice"></el-table-column>
                        <el-table-column label="类型" prop="gtype"></el-table-column>
                        <el-table-column label="缩略图" >
                            <template slot-scope="props">
                                <img :src="host + props.row.gthumb" alt="" width="80" height="80">
                            </template>
                        </el-table-column>
                        <el-table-column label="数量" prop="num"></el-table-column>
                    </el-table>
                </template>
            </el-table-column>
            <el-table-column
                    label="用户id"
                    prop="uid">
            </el-table-column>
            <el-table-column
                    label="用户名"
                    prop="uname">
            </el-table-column>
            <el-table-column
                    label="订单状态"
                    prop="statetext">
            </el-table-column>
            <el-table-column label="下单时间">
                <template slot-scope="scope">
                    <span>{{scope.row.create_time | firstUpperCase}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="订单号"
                    prop="ordernum">
            </el-table-column>
            <el-table-column
                    label="商品总价"
                    prop="price">
            </el-table-column>
            <el-table-column label="修改状态">
                <template slot-scope="scope">
                    <el-button
                            type="primary"
                            @click="handleState(scope.row.ordernum)"
                    >编辑</el-button>
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
    </div>
</template>

<script>
    import orders from "../../../api/orders";
    import code from "../../../config/code";
    export default {
        name: "orders",
        data(){
            return {
                orders:[],
                page:1,
                limit:5,
                total: 0,
            }
        },
        filters:{
            firstUpperCase:function(val,format='yyyy-MM-dd'){
                var date = new Date(val*1000);
                if (/(y+)/.test(format)) {
                    format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
                }
                let o = {
                    'M+': date.getMonth() + 1,
                    'd+': date.getDate(),
                    'h+': date.getHours(),
                    'm+': date.getMinutes(),
                    's+': date.getSeconds()
                };
                for(let k in o){
                    if (new RegExp(`(${k})`).test(format)) {
                        let str = o[k] + '';
                        format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length));
                    }
                }
                return format;
            }
        },
        methods:{
            getorders(){
                let  params={
                    page:this.page,
                    limit:this.limit,
                };
                orders.getOrders(params).then(res=>{
                    let result = res.data;
                    if(result.code == code.CODE_SUCCESS){
                        if(result.data.length){
                            this.orders = result.data;
                            this.total=result.total;
                        }else{
                            this.$message.warning(result.msg)
                        }
                    }else{
                        this.$message.error(result.msg)
                    }
                });
            },
            //分页
            handleCurrentChange(val) {
                this.page = val
            },
            handleSizeChange(val) {
                this.limit = val
            },
            //编辑
            handleState(){

            },
        },
        computed:{
            host(){
                return this.$store.state.host;
            }
        },
        watch:{
            page(){
                this.getorders()
            }
        },
        mounted() {
            this.getorders();
        }
    }
</script>

<style>
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
</style>

<style scoped>

</style>