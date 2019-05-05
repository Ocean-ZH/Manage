<template>
  <div class="login">
    <section class="form-container">
      <div class="manage-tip">
        <span class="title">后台资金管理系统</span>
        <el-form
          :model="loginUser"
          :rules="rules"
          ref="loginForm"
          label-width="80px"
          class="login-form"
        >
          <el-form-item label="邮箱" prop="email">
            <el-input type="email" v-model="loginUser.email" placeholder="邮箱"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginUser.password" placeholder="密码"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" class="submit-btn" @click="submitForm('loginForm')">登录</el-button>
          </el-form-item>
          <div class="form-footer">
            <p>
              没有账号？现在
              <router-link to="/register">注册</router-link>
            </p>
          </div>
        </el-form>
      </div>
    </section>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";
export default {
  data() {
    return {
      loginUser: {
        name: "",
        email: "",
        password: "",
        password2: "",
        identity: ""
      },
      rules: {
        email: [
          {
            required: true,
            type: "email",
            message: "邮箱格式不正确",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          },
          {
            min: 4,
            max: 30,
            message: "长度在4~30个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert('submit!');
          this.$axios.post("/api/users/login", this.loginUser).then(res => {
            // console.log(res)
            const { token } = res.data;

            window.localStorage.setItem("token", token);
            // this.myLib.setCookie('token',token,1);
            // console.log(this.myLib)

            const decoded = jwt_decode(token);
            // console.log(decoded)
            this.$store.dispatch("setAuthenticated", !this.isEmpty(decoded));
            this.$store.dispatch("setUser", decoded);

            this.$message({
              message: "登录成功!",
              type: "success"
            });
            this.$router.push("/index");
          });
        } else {
          console.log("error submit!!");
          alert("error submit!!");
          return false;
        }
      });
    },
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  },
  created() {
    // this.myLib.getAllCookies();
  }
};
</script>

<style lang="less" scoped>
.login {
  position: relative;
  width: 100%;
  height: 100%;
  background: #fff url(../assets/bg.jpg) no-repeat center center;
  background-size: 100% 100%;
}
.form-container {
  box-sizing: boder-box;
  width: 370px;
  height: 210px;
  max-width: 90%;
  position: absolute;
  top: 20%;
  left: 50%;
  margin-left: -185px;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  .manage-tip {
    .title {
      font-family: "Mircosoft Yahei";
      font-weight: bold;
      font-size: 26px;
      color: #fff;
    }
  }
  .form-footer {
    text-align: right;
    font-size: 12px;
    color: #333;
    p {
      a {
        color: #409eff;
      }
    }
  }
}
.login-form {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0 5px 10px #ccc;
}
.submit-btn {
  width: 100%;
}
</style>
