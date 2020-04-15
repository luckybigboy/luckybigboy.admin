<template>
  <div class="loginBox">
    <div class="middle-wrapper">
      <div class="adminTitle">后台管理系统</div>
      <div class="content">
        <el-form :model="ruleForm"
                 :rules="rules"
                 ref="ruleForm"
                 label-width="100px"
                 class="demo-ruleForm">
          <el-form-item label-width="0"
                        prop="account">
            <el-input v-model="ruleForm.account"
                      prefix-icon="iconfont icon-user"
                      placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item prop="pwd"
                        label-width="0">
            <el-input v-model="ruleForm.pwd"
                      prefix-icon="iconfont icon-pwd"
                      placeholder="请输入密码"
                      show-password></el-input>
          </el-form-item>
          <el-form-item prop="yanzhengma"
                        label-width="0">
            <div class="validCodeBox">
              <el-input v-model="ruleForm.yanzhengma"
                        class="code"
                        prefix-icon="iconfont icon-common_vertification_code"
                        placeholder="请输入验证码"></el-input>
              <div class="validCode">
                <validCode ref="validate-code"
                           @change="checkCodes"></validCode>
              </div>
            </div>
          </el-form-item>
          <div class="btnBox">
            <el-button type="primary"
                       class="btn"
                       @click="loginHandle('ruleForm')">登录系统</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'login',
  data () {
    const checkYanzhengma = (rule, value, callback) => {
      value = value.toUpperCase();
      if (value === '') {
        callback(new Error('请输入验证码'));
      } else if (value !== this.checkCode) {
        callback(new Error('验证码有误'));
        this.$refs['validate-code'].draw();
      } else {
        callback();
      }
    }
    return {
      checkCode: '',
      ruleForm: {
        account: '',
        pwd: '',
        yanzhengma: ''
      },
      rules: {
        account: [
          { required: true, message: '请输入账号名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        yanzhengma: [
          { validator: checkYanzhengma, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    checkCodes (value) {
      this.checkCode = value;
    },
    login () {
      let token = 'a94756da-2962-40ae-bdea-787fd02c9d92';
      this.$store.commit("SAVE_TOKEN", token);
      console.log(this.$store)
      this.$router.replace('/home')
    },
    loginHandle (ruleForm) {
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          this.login();
        }
      })
    }
  },
  mounted () {
  },
  components: {
    "validCode": () => import('@/components/ValidateCode/index')
  }
}
</script>
<style lang="scss" scoped>
@import "../../assets/style/variable.scss";
.loginBox {
  background: $loginBgColor;
  width: 100%;
  height: 100%;
  .middle-wrapper {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);
    .adminTitle {
      text-align: center;
      font-size: 60px;
      font-weight: bold;
      color: #fff;
      margin-bottom: 30px;
      letter-spacing: 3px;
      text-shadow: 2px 4px rgba(197, 223, 248, 0.8),
        3px 5px rgba(179, 233, 248, 0.8), 4px 6px rgba(179, 233, 248, 0.8),
        5px 7px rgba(179, 233, 248, 0.8), 6px 8px rgba(179, 233, 248, 0.8);
    }
    .content {
      min-width: 520px;
      padding: 30px 50px;
      background: #fff;
      border-radius: 5px;
      box-sizing: border-box;
      .validCodeBox {
        display: flex;
        line-height: 0;
        .code {
          flex: 1;
        }
        .validCode {
          flex: 1;
          text-align: right;
        }
      }
    }
    .btnBox {
      text-align: right;
      margin-top: 10px;
      .btn {
        width: 40%;
      }
    }
  }
}
</style>