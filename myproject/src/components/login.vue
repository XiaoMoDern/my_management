<template>
  <div class="box">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="loginForm" label-width="100px">
      <el-form-item label="用户名" prop="username">
        <el-input type="text" v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="gotoReg">登录</el-button>
        <el-button type="text" icon="el-icon-question">忘记密码</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.loginForm.validateField("checkPass");
        }
        callback();
      }
    };

    return {
      ruleForm: {
        username: "",
        pass: ""
      },
      rules: {
        pass: [
          { required: true, message: "必须添加密码", trigger: "blur" },
          { validator: validatePass, trigger: "blur" }
        ],
        username: [
          { required: true, message: "必须填写用户名", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    gotoReg() {
      this.$refs["loginForm"].validate(async valid => {
        if (valid) {
          // console.log(this.ruleForm.username, this.ruleForm.pass);
          let { data } = await this.$axios.post("/user/login", {
            username: this.ruleForm.username,
            password: this.ruleForm.pass
          });
          // console.log(data, data.data.loginStatus); //注意查看
          console.log("1111", this.$store);
          if (data.data.loginStatus == 1) {
            // 保存token到本地
            this.$store.commit("login", data.data.authorization);

            alert("登录成功！");
            if (this.$route.query.targetUrl) {
              this.$router.push(this.$route.query.targetUrl); //返回上一个页面
            } else {
              this.$router.push("/Home");
            }
          } else {
            alert("用户名或密码错误");
          }
        } else {
          console.log("error submit!!");
          return false;
          splice;
        }
      });
    }
  }
};
</script>

<style scoped>
.box {
  width: 100%;
  height: 100%;
  background: #e1e1e1;
  overflow: hidden;
  margin: auto;
}
.box >>> .el-form {
  margin: 100px auto 309px;
}

.el-input {
  width: 40%;
}

.box >>> .el-form-item {
  margin-left: 200px;
}
</style>
