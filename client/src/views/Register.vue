<template>
    <div class="register">
        <section class="form-container">
            <div class="manage-tip">
                <span class="title">后台资金管理系统</span>
                <el-form :model="registerUser" :rules="rules" ref="registerForm" label-width="80px" class="register-form">
                    <el-form-item label="用户名" prop="name">
                        <el-input type="text" v-model="registerUser.name" placeholder="用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input type="email" v-model="registerUser.email" placeholder="邮箱"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="registerUser.password" placeholder="密码"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="password2">
                        <el-input type="password" v-model="registerUser.password2" placeholder="确认密码"></el-input>
                    </el-form-item>

                    <el-form-item label="选择身份" >
                        <el-select v-model="registerUser.identity" placeholder="选择身份" props="identity" >
                            <el-option label="管理员" value="manager"></el-option>
                            <el-option label="员工" value="employee" ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="submit-btn" @click="submitForm('registerForm')">注册</el-button>
                    </el-form-item>
                    <div class="form-footer">
                        <p>已有账号？现在<router-link to="/login" >登录</router-link></p>
                    </div>
                </el-form>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    data(){
        var validatePass2 = (rule, value, callback) => {
            if (value !== this.registerUser.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            registerUser:{
                name:'',
                email:'',
                password:'',
                password2:'',
                identity:'',
            },
            rules:{
                name:[{
                    required:true,
                    message:'用户名不能为空',
                    trigger:'blur',
                },{
                    min:2,
                    max:30,
                    message:'长度在2~30个字符',
                    trigger:'change',
                }],
                email:[{
                    required:true,
                    type:'email',
                    message:"邮箱格式不正确",
                    trigger:'blur',
                }],
                password:[{
                    required:true,
                    message:"密码不能为空",
                    trigger:'blur',
                },{
                    min:4,
                    max:30,
                    message:'长度在4~30个字符',
                    trigger:'blur',
                }],
                password2:[{
                    required:true,
                    message:"确认密码不能为空",
                    trigger:'blur',
                },{
                    min:4,
                    max:30,
                    message:'长度在4~30个字符',
                    trigger:'blur',
                },{
                    validator:validatePass2,
                    trigger:'blur',
                }],
                identity:[{
                    required:true,
                    message:"身份不能为空",
                    trigger:'blur',
                }]
            },
            
        };
    },
    methods:{
        submitForm(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // alert('submit!');
                    this.$axios.post('/api/users/register',this.registerUser)
                    .then(res=>{
                        // console.log(res)
                        this.$message({
                            message:'注册成功!',
                            type:'success',
                        });
                        this.$router.push('/login');
                    })
                } else {
                    console.log('error submit!!');
                    alert('error submit!!');
                    return false;
                }
            });
        }
    },
}
</script>

<style lang="less" scoped>
.register{
    position: relative;
    width: 100%;
    height: 100%;
    background: #fff url(../assets/bg.jpg) no-repeat center center;
    background-size: 100% 100%;
}
.form-container{
    box-sizing: boder-box;
    width: 370px;
    height: 210px;
    max-width: 90%;
    position: absolute;
    top: 20%;
    left: 50%;
    margin-left:-185px;
    padding: 10px;
    border-radius: 5px;
    text-align: center;
    .manage-tip{
        .title{
            font-family:'Mircosoft Yahei';
            font-weight: bold;
            font-size:26px;
            color:#FFF;
        }
    }
    .form-footer{
        text-align: right;
        font-size: 12px;
        color: #333;
        p{
            a{
                color:#409eff;
            }
        }
    }
}
.register-form{
    margin-top: 20px;
    background-color: #fff;
    padding: 20px 40px 20px 20px;
    border-radius: 5px;
    box-shadow:0 5px 10px #ccc;
}
.submit-btn{
    width:100%;
}
</style>
