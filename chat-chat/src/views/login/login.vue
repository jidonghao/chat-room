<template>
  <div class="loginBg">
    <h2 class="title">聊天</h2>
    <h2 class="title turnTitle">室</h2>
    <div class="loginView">
      <input type="text" :class="{'toTop':isLogin}" v-model="user" placeholder="聊天号🐎">
      <input type="password" :class="{'toBottom':isLogin}" v-model="passwd" placeholder="聊天密🔑">
      <div :class="{'goRegister':true,'toRight':isLogin}">没有🐎？
        <a @click="goRegister">点击注册-></a>
      </div>
      <div style="margin-top: 1.2rem;display: flex;flex-direction: column;align-items: center">
        <div style="color: #ef2c2c;height: 1.4rem">{{ showInfo }}</div>
        <button @click="login" :class="{'enlarge':isLogin}">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
import Login from "../../api/login";
import router from "../../router";

export default {
  name: "login",
  data() {
    return {
      user: "",
      passwd: "",
      isLogin: false,
      showInfo: ""
    }
  },
  methods: {
    /**
     * 登录
     */
    login() {
      if (!this.user) {
        this.showInfo = "请输入聊天号🐎!"
      } else if (!this.passwd) {
        this.showInfo = "请输入密🔑!"
      } else if (this.user.length < 6) {
        this.showInfo = "请输入正确的聊天号🐎!"
      } else if (this.passwd.length < 6) {
        this.showInfo = "请输入正确的密🔑!"
      } else {
        Login.login({user: this.user, passwd: this.passwd}).then(res => {
          if (res.code !== "success") {
            this.showInfo = "号🐎或密🔑错误!"
          } else {
            // console.log(res.data)
            localStorage.removeItem("userInfo")
            localStorage.setItem('isLogin', "true")
            localStorage.setItem('userInfo', JSON.stringify({
              id:res.data.id,
              nickName:res.data.user
            }))
            this.showInfo = ""
            setTimeout(() => {
              router.push({name: 'chatRoom', params: {username: res.data.user}})
            }, 1e3)

            this.isLogin = true
          }
        })

      }

    },
    /**
     * 去注册页
     */
    goRegister() {
      router.push({name: 'register', params: {flag: 'flp'}})
    }
  },
  created() {
    document.querySelector("html").style.fontSize = "62.5%"
  }
}
</script>

<style scoped lang="scss">

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


.loginBg {
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  padding: 1rem 0;
  box-sizing: border-box;
  position: relative;
  background-image: linear-gradient(135deg, #a9fbc6 10%, #45e3e9 100%);
  background-size: 200% 200%;
  animation: registerView 5s ease infinite alternate;

  @keyframes registerView {
    0%{
      background-position: 0 0;
    }
    100%{
      background-position: 100% 100%;
    }
  }


  .title {
    margin: 2rem;
    text-align: left;
    font-size: 12rem;
    opacity: 0.6;
  }

  .turnTitle {
    position: absolute;
    top: 29rem;
    transform-origin: center top;
    transform: rotate(35deg);
    animation: turnTitle 2s ease-in-out infinite alternate;
    @keyframes turnTitle {
      0% {
        transform: rotate(35deg);
      }
      100% {
        transform: rotate(-35deg);
      }
    }
  }

  .loginView {
    position: absolute;
    top: 36%;
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
}
</style>
