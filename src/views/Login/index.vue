<template>
  <!--  -->
  <div class="login">
    <div class="login-bg"></div>
    <div class="login-form-box">
      <div class="login-form-box-content">
        <div class="login-form-box-content-greetings">Hi~ 欢迎回来！</div>
        <a-form
          class="login-form-box-content-input"
          :form="form"
          @submit="handleSubmit"
        >
          <a-form-item
            :validate-status="userNameError() ? 'error' : ''"
            :help="userNameError() || ''"
          >
            <a-input
              v-decorator="[
                'userName',
                {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your username!',
                      min: 5,
                      max: 11,
                      whitespace: true,
                    },
                  ],
                },
              ]"
              placeholder="用户名/手机号"
            >
              <a-icon
                slot="prefix"
                type="user"
                style="color: rgba(0, 0, 0, 0.25)"
              />
            </a-input>
          </a-form-item>
          <a-form-item
            :validate-status="passwordError() ? 'error' : ''"
            :help="passwordError() || ''"
          >
            <a-input
              v-decorator="[
                'password',
                {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your Password!',
                      min: 5,
                      max: 12,
                      whitespace: true,
                    },
                  ],
                },
              ]"
              type="password"
              placeholder="密码"
            >
              <a-icon
                slot="prefix"
                type="lock"
                style="color: rgba(0, 0, 0, 0.25)"
              />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-button
              style="width: 100%"
              type="primary"
              html-type="submit"
              :disabled="hasErrors(form.getFieldsError())"
            >
              登录
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>
<script>
import { createUUID } from "@/utils";
import tokenInfo from "@/utils/tokenInfo";
import md5 from "js-md5";
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
export default {
  data() {
    return {
      hasErrors,
      form: this.$form.createForm(this, { name: "login" })
    };
  },
  mounted() {
    this.$nextTick(() => {
      // To disabled submit button at the beginning.
      this.form.validateFields();
    });
  },
  methods: {
    // Only show error after a field is touched.
    userNameError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched("userName") && getFieldError("userName");
    },
    // Only show error after a field is touched.
    passwordError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched("password") && getFieldError("password");
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          const info = {
            userName: values.userName,
            password: md5(md5(values.password)),
            token: createUUID()
          };

          tokenInfo.set(info);
          this.$router.push("/");
          this.$message.success(`欢迎回来，${values.userName}`);
        }
      });
    }
  }
};
</script>
<style scoped lang="scss">
.login {
  width: 100%;
  height: 100%;
  position: relative;

  .login-bg {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: -1;
    background: url("../../assets/images/bg.jpg");
    background-size: cover;
    filter: blur(10px);
  }

  .login-form-box {
    width: 500px;
    height: 400px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 5px 5px 30px 10px #eee;
    position: absolute;
    right: 100px;
    top: 50%;
    margin-top: -200px;
    padding: 0 20px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;

    .login-form-box-content {
      width: 80%;

      .login-form-box-content-greetings {
        font-size: 18px;
        font-weight: 600;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      .login-form-box-content-input {
        margin-top: 20px;
      }
    }
  }
}
</style>
