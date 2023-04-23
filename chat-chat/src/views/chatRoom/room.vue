<template>
  <div class="container">
    <div class="topMenu">
      <h2 class="title">{{ roomInfo.roomName }}</h2>
      <div class="goBack" @click="goBack">
        <img :src="icons.return" alt="返回按钮">
        返回
      </div>
    </div>
    <div class="chatContainer" @click="showCoControl = false" :style="showCoControl?'padding-bottom:26rem':''">
      <div v-for="item in chatList" :class="item.senderId === userId?'chatItemMe chatItem':'chatItem chatItemOther'">
        <img :src="item.avatar" alt="这是用户头像">

        <div class="chatIn">
          <div class="name">{{ item.senderUser }}</div>
          <div class="content">{{ item.content }}
            <div class="smallTriangle"/>
          </div>
          <span class="dateTime">{{ item.dateTime }}</span>
        </div>
      </div>
      <!--      -->
      <div class="control">
        <div class="c-btn">
          <div @click.stop="showCoControl = !showCoControl">
            <svg t="1667303646101" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="2536" width="64" height="64">
              <path
                d="M512 938.666667C276.362667 938.666667 85.333333 747.637333 85.333333 512S276.362667 85.333333 512 85.333333s426.666667 191.029333 426.666667 426.666667-191.029333 426.666667-426.666667 426.666667z m0-64c200.298667 0 362.666667-162.368 362.666667-362.666667S712.298667 149.333333 512 149.333333 149.333333 311.701333 149.333333 512s162.368 362.666667 362.666667 362.666667z m32-394.666667h128a32 32 0 0 1 0 64H544v128a32 32 0 0 1-64 0V544H352a32 32 0 0 1 0-64h128V352a32 32 0 0 1 64 0v128z"
                p-id="2537"></path>
            </svg>
          </div>
          <textarea type="text" v-model="content" @click="showCoControl = false"/>
          <button @click="sendMessage">发送</button>
        </div>
        <div @click.stop="" :class="showCoControl?'other-control':'other-control hideOControl'">
          <div class="oc-item">
            <img :src="icons.photo" alt="照片图标,点击选择图片并发送">
            <span>照片</span>
          </div>
          <div class="oc-item">
            <img :src="icons.camera" alt="相机图标，点击拍照并发送">
            <span>拍摄</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import UseMqtt from "../../utils/useMqtt";
import tools from "../../utils/tools";

export default {
  name: "room",
  data() {
    return {
      nickName: "",
      userId: "",
      roomInfo: {},
      showCoControl: false,
      content: "",
      icons: {
        photo: require("../../../images/icons/photo.svg"),
        camera: require("../../../images/icons/camera.svg"),
        return: require("../../../images/icons/return.svg")
      },
      chatList: []
    }
  },
  methods: {
    goBack() {
      // this.$router.go(-1)
      this.$router.replace({name: "chatRoom"})
    },
    goDown() {
      let c = document.querySelector(".chatContainer")
      c.scrollTop = c.scrollHeight
    },
    sendMessage() {
      let content = this.content.trim()
      if (content !== "") {
        let message = {
          id: this.roomInfo.roomId,
          content,
          avatar: "https://www.com8.cn/wp-content/uploads/2020/05/20200515023400-5ebd8f180dc56.jpg",
          dateTime: tools.formatDate(new Date().getTime()),
          senderUser: this.nickName,
          senderId: this.userId
        }
        this.content = ""
        UseMqtt.doPublish(JSON.stringify(message))
        setTimeout(() => {
          this.goDown()
        },200)
      }
    },
    onNewMessage() {
      UseMqtt.client.on('message', (topic, payload) => {
        let result = '';
        // for (let i = 0; i < payload.byteLength; i++) {
        //   result += String.fromCharCode(payload[i]);
        // }
        result = tools.utf8ByteToUnicodeStr(payload)
        const res = JSON.parse(result);
        if (+res.id === +this.roomInfo.roomId) {
          this.chatList.push(res)
          localStorage.removeItem("" + this.roomInfo.roomId)
          localStorage.setItem("" + this.roomInfo.roomId, JSON.stringify(this.chatList))
        }
      })
    },
    loadMessage(){
      this.chatList = JSON.parse(localStorage.getItem("" + this.roomInfo.roomId))||[]
    }
  },
  mounted() {
    this.nickName = JSON.parse(localStorage.getItem("userInfo")).nickName
    this.userId = JSON.parse(localStorage.getItem("userInfo")).id + ""
    this.roomInfo = this.$route.params.roomInfo
    this.onNewMessage()
    this.loadMessage()
  },
  created() {
    document.querySelector("html").style.fontSize = "62.5%"
  }
}
</script>

<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  background: white;
  position: relative;
  padding-top: 4.6rem;
  overflow: hidden;
  box-sizing: border-box;
}

.topMenu {
  width: 100vw;
  height: 4.6rem;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 5px #0000004f;
  background-image: linear-gradient(135deg, #a9fbc6 10%, #45e3e9 100%);
  background-size: 200% 200%;
  animation: registerView 2s ease infinite alternate;

  @keyframes registerView {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 100% 100%;
    }
  }

  .goBack {
    display: flex;
    align-items: center;
    position: absolute;
    left: 1.8rem;
    margin-top: 0.6rem;

    img {
      width: 1.4rem;
      transform: translateY(-0.16rem);
    }
  }

  .title {
    margin: 0;
    font-size: 1.5rem;
  }

  .myInfo {
    position: absolute;
    right: 0.3rem;
    top: 50%;
    transform: translateY(-50%);
  }
}

.chatContainer {
  width: 100vw;
  height: 100%;
  background: #f5f5f5;
  box-sizing: border-box;
  padding-bottom: 6rem;
  overflow-y: scroll;
  overflow-x: hidden;

  .chatItem {
    width: 100%;
    height: 7rem;
    display: flex;
    align-items: center;
    margin-top: 1rem;

    img {
      height: 60%;
      border-radius: 50%;
      margin: 0 0.6rem;
      transform: translateY(-1.2rem);
    }

    .chatIn {
      display: flex;
      width: 80%;
      flex-direction: column;

      .name {
        font-size: 1.2rem;
      }

      .content {
        font-size: 1.6rem;
        background: white;
        padding: 0.6rem 1.4rem;
        text-align: left;

        position: relative;

        .smallTriangle {
          height: 1.8rem;
          width: 1.2rem;
          background: white;
          position: absolute;
          clip-path: polygon(0 9%, 0% 100%, 100% 0);
        }
      }

      .dateTime {
        opacity: 0.5;
        font-size: 1.2rem;
      }
    }
  }

  .chatItemMe {
    flex-direction: row-reverse;

    .content {
      border-radius: 12px 0 12px 12px;
      margin: 0.2rem 1rem 0.2rem 0.2rem;

    }

    .smallTriangle {
      top: -0.1rem;
      right: -1rem;
    }

    .chatIn {
      align-items: flex-end;
    }

    .dateTime {
      margin-right: 2rem;
    }
  }

  .chatItemOther {
    .chatIn {
      align-items: flex-start;
    }

    .content {
      margin: 0.2rem 0.2rem 0.2rem 1rem;

      border-radius: 0 12px 12px 12px;
    }

    .smallTriangle {
      top: -0.1rem;
      left: -1rem;
      transform: rotateY(180deg);
    }

    .dateTime {
      margin-left: 2rem;
    }
  }


  .control {
    width: 100%;
    height: auto;
    background: white;
    position: absolute;
    bottom: 0;
    padding-bottom: constant(safe-area-inset-bottom); /* 兼容 iOS < 11.2 */
    padding-bottom: env(safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */
    box-shadow: 0 2px 5px #0000004f;

    .hideOControl {
      height: 0 !important;
    }

    .other-control {
      width: 100%;
      height: 20rem;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      display: flex;
      overflow: hidden;
      transition: all 0.2s;

      .oc-item {
        width: 8rem;
        height: 8rem;
        background: #f5f5f5;
        margin: 1rem;
        border-radius: 1rem;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        padding: 0.6rem;
        justify-content: center;
        align-items: center;

        img {
          width: 5rem;
        }
      }
    }

    .c-btn {
      width: 100%;
      height: 5rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;

      div {
        width: 2.6rem;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 0.6rem;

        .icon {
          width: 2.4rem;
        }
      }

      textarea {
        width: 76%;
        height: 3rem;
        resize: none;
        outline: none;
        border: 0;
        background: #f5f5f5;
        font-size: 2rem;
        padding: 0.4rem 0.6rem;
        box-sizing: border-box;
        border-radius: 3px;

      }

      button {
        width: 18%;
        margin: 0 0.6rem;
        border-radius: 6px;
        height: 3rem;
        border: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.4rem;
        background-image: linear-gradient(135deg, #a9fbc6 10%, #45e3e9 100%);
        transition: all 0.1s;
      }

      button:active {
        background-image: linear-gradient(135deg, #74e2e7 100%, #7deaa2 10%);
      }
    }

  }
}
</style>
