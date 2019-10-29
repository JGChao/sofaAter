<template>
    <div class="box">
        <div class="formBox">
            <h3>furniture销售管理系统</h3>
            <el-form :model="form" :rules="rules" ref="ruleForm" >
                <el-form-item prop="username">
                    <el-input v-model="form.username" placeholder="请输入用户名" clearable
                               prefix-icon="el-icon-user"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="form.password"  placeholder="请输入密码" clearable
                               show-password prefix-icon="el-icon-lock"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="loginCheck">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import Login from '../../../api/login';
    import Code from '../../../config/code';

    export default {
        name: "login",
        data(){
            return {
                form:{
                    username:'',
                    password:'',
                },
                rules:{
                    username:[
                        { required: true, message: '用户名必填', trigger: 'blur' },
                        { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                    ],
                    password:[
                        { required: true, message: '密码必填', trigger: 'blur' },
                        { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                    ],
                }
            }
        },
        methods:{
            loginCheck(){
                this.$refs.ruleForm.validate(valid=>{
                    if(valid){
                        Login.checkLogin(this.form).then(res=>{
                            let data = res.data;
                            if(data.code == Code.CODE_SUCCESS){
                                let redirect = this.$route.query.redirect || 'home';
                                sessionStorage.setItem('token',data.token);
                                this.$router.push({name:redirect});
                                this.$message.success(data.msg);

                            }else if(data.code == Code.CODE_FAIL){
                                this.$message.error(data.msg);
                            }
                        })
                    }else{
                        this.$message.error('验证失败')
                    }
                })
            }
        }

    }
</script>

<style scoped>
    .box{
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: url(../../assets/slide_1.jpg) no-repeat center / cover;
    }
    .box .formBox h3{
        text-align: center;
        line-height: 3;
    }
    .box .formBox{
        width: 400px;
        height: auto;
        border-radius: 5px;
        padding: 20px 10px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        background: #ffffff;
    }
    button{
        display: block;
        margin: auto;
    }
</style>