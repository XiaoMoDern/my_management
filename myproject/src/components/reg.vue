<template>
  <div class="box">
    <div id="login">
      <a-form
        id="components-form-demo-normal-login"
        :form="form"
        class="login-form"
        @submit="handleSubmit"
      >
        <a-form-item>
          <a-input
            v-decorator="[
          'phone',
          { rules: [{ required: true, message: '请输入正确的号码!' }] }
        ]"
            placeholder="请输入电话号码"
            @blur="validatePhoneBlur"
          >
            <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            v-decorator="[
          'password',
          { rules: [{ required: true, message: '请输入正确的密码!' }] }
        ]"
            type="password"
            placeholder="请输入六位密码"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <!-- <a class="login-form-forgot" href>Forgot password</a> -->
          <a-button type="primary" html-type="submit" class="login-form-button">注册</a-button>
          <!-- Or
          <a href>register now!</a>-->
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
export default {
  beforeCreate() {
    this.form = this.$form.createForm(this);
    this.visible = true;
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
        }
      });
    },
    validatePhoneBlur(e) {
      const validatePhoneReg = /^1\d{10}$/;
      if (e.target.value && !validatePhoneReg.test(e.target.value)) {
        const arr = [
          {
            message: "您输入的手机格式不正确!",
            field: "phone"
          }
        ];
        this.form.setFields({ phone: { value: e.target.value, errors: arr } });
      }
    }
  }
};
</script>

<style scoped>
.box {
  width: 100%;
  height: 635px;
  overflow: hidden;
  background: #e1e1e1;
}

#login {
  width: 30%;
  margin: 10% auto;
  position: relative;
}

#components-form-demo-normal-login .login-form {
  max-width: 300px;
}

#components-form-demo-normal-login .login-form-forgot {
  float: right;
}

#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>
