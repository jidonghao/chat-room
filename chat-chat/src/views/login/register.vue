<template>
  <div class="registerView">
    <h2 class="title" id="registerTitle">号<span class="cockedHead">🐎</span>注册</h2>
    <div class="loginView">
      <input type="text" :class="{'toTop':isRegister}" v-model="nickName" placeholder="昵称🐶">
      <input type="text" :class="{'toTop':isRegister}" v-model="user" placeholder="聊天号🐎">
      <div style="display: flex;flex-direction: column">
        <input type="password" :class="{'toBottom':isRegister}" v-model="passwd" placeholder="聊天密🔑">
        <span style="color: white;font-size: 0.2rem">*聊天密码至少包含字母和数字，并且大于8位</span>
      </div>
      <input type="password" :class="{'toBottom':isRegister}" v-model="rePasswd" placeholder="再次输入聊天密🔑">
      <div style="margin-top: 1.2rem;display: flex;flex-direction: column;align-items: center">
        <div style="color: #ef2c2c;height: 1.4rem">{{ showInfo }}</div>
        <button :disabled="loading" @click="register" :class="{'enlarge':isRegister}">注册</button>
      </div>
    </div>
  </div>
</template>

<script>
import login from "../../api/login";
import router from "../../router";

export default {
  name: "register",
  data() {
    return {
      flag: '',
      isRegister: false,
      user: '',
      passwd: '',
      rePasswd: '',
      showInfo: '',
      nickName: '',
      loading: false
    }
  },
  destroyed() {
    this.user = this.passwd = this.rePasswd = this.showInfo = ''
  },
  mounted() {
    this.flag = this.$route.params.flag || 'comeIn'
  },
  methods: {
    register() {
      if (!this.nickName) {
        this.showInfo = "请输入昵称🐶"
      } else if (this.nickName.length > 12 || this.nickName.length < 2) {
        this.showInfo = "昵称🐶长度请在2~12个字符"
      } else if (!this.user) {
        this.showInfo = "请输入聊天号🐎"
      } else if (this.user.length < 6) {
        this.showInfo = "请输入至少6位的聊天号🐎"
      } else if (!this.passwd) {
        this.showInfo = "请输入聊天密🔑"
      } else if (this.passwd.length > 20) {
        this.showInfo = "密🔑太channnnnng了"
      } else if (!/^(?=.*[a-zA-Z])(?=.*\d).{8,20}$/.test(this.passwd)) {
        this.showInfo = "聊天密🔑太简单了"
      } else if (!this.rePasswd) {
        this.showInfo = "请再次输入聊天密🔑"
      } else if (this.rePasswd !== this.passwd) {
        this.showInfo = "两次输入的聊天密🔑不一致啊"
      } else {
        this.showInfo = ""
        // 注册了
        this.loading = true
        document.querySelector("#registerTitle").innerHTML="注册成功"
        login.register({nickName: this.nickName, user: this.user, passwd: this.passwd}).then(res => {
          if (res.code === 'success') {
            this.isRegister = true
            setTimeout(()=>{
              if(this.flag==='flp'){
                localStorage.setItem('isLogin', "true")
                localStorage.setItem('userName', `${this.nickName}`)
                router.push({name: 'chatRoom', params: {username: this.nickName}})
              }else{
                router.push({name: 'login'})
              }
            },500)
          } else if(res.msg === 'userIsRegistered'){
            this.showInfo = "此号🐎已被注册过了"
          }
        }).finally(() => {
          this.loading = false
        })
      }
    }
  },
  created() {
    document.querySelector("html").style.fontSize = "62.5%"
  }
}
</script>

<style scoped lang="scss">
.title {
  margin: 2rem;
  transform: translateY(6rem);
  font-size: 4rem;
  opacity: 0.6;
  display: flex;
  justify-content: center;
}

.cockedHead {
  display: block;
  transform-origin: 67% 90%;
  font-size: 6rem;
  margin-top: -2rem;
  margin-right: 0.4rem;
  animation: cockedHead 1s ease-in-out infinite alternate;
  @keyframes cockedHead {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(20deg);
    }
  }
}

.registerView {
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(135deg, #79F1A4 10%, #0E5CAD 100%);
  overflow: hidden;
  background-size: 200% 200%;
  animation: registerView 5s ease infinite alternate;

  @keyframes registerView {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 100% 100%;
    }
  }
}

.toTop {
  animation: toTop 2s forwards ease;
  @keyframes toTop {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    80% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: scale(2) translateY(-20rem);
    }
  }
}

.toBottom {
  animation: toBottom 2s forwards ease;
  @keyframes toBottom {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    60% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: scale(2) translateY(20rem);
    }
  }
}

.toRight {
  animation: toRight 2s forwards ease;
  @keyframes toRight {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    80% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: scale(2) translateX(20rem);
    }
  }
}

.enlarge {
  animation: enlarge 1s forwards ease;
  @keyframes enlarge {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
}

.loginView {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);

  button {
    width: 12rem;
    height: 3rem;
    margin-bottom: 1.2rem;
    border: 0;
    border-radius: 1rem;
    background: #ffffff;
    transition: all 0.2s;
    box-shadow: 3px 4px 4px 1px #00000014;

    &:active {
      background: rgba(255, 255, 255, 0.5);
    }
  }

  input {
    position: relative;
    width: 24rem;
    height: 2.6rem;
    margin: 0.5rem 0;
    border-radius: 1rem;
    border: 0;
    padding: 0.4rem 2rem;
    box-shadow: 3px 4px 4px 1px #00000014;
    transition: all 0.2s;

    &:active {
      outline: 1px solid rgba(0, 0, 0, 0.5);
    }
  }

  .goRegister {
    position: relative;
    margin: 0.4rem 0;
    box-sizing: border-box;
    padding-right: 0.4rem;
    width: 100%;
    text-align: right;
  }
}
</style>
