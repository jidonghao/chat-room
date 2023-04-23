<template>
  <div class="container">
    <div class="topMenu">
      <div class="top">
        <img :src="re" alt="" @click="goBack">
      </div>
      <div class="myInfo">
        <img src="" class="avatar" alt="">
        <span class="name">name</span>
      </div>
    </div>
    <div class="item">
      <span>修改个人资料</span>
      <img :src="re" alt="">
    </div>
    <div class="item">
      <span>修改密码</span>
      <img :src="re" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "my",
  data() {
    return {
      re: require('../../../images/icons/return.svg')
    }
  },
  methods:{
    goBack(){
      this.$router.replace({name:"chatRoom"})
    }
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
  overflow: hidden;
  box-sizing: border-box;
  background: #f5f5f5;

  .item {
    width: 100%;
    height: 4.6rem;
    background: #ffffff;
    margin-top: 2px;
    font-size: 1.8rem;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding-left: 2.4rem;
    padding-right: 2rem;
    align-items: center;
    transition: all 0.2s;

    &:active {
      background: rgba(255, 255, 255, 0.3);
    }

    img {
      width: 2rem;
      transform: rotate(180deg);
    }
  }

  .topMenu {
    width: 100vw;
    height: 24rem;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    box-shadow: 0 -4px 5px -4px #0000004f inset;
    background-image: linear-gradient(135deg, rgba(169, 251, 198, 0.87) 10%, #45e3e9 100%);
    background-size: 200% 200%;
    animation: registerView 2s ease infinite alternate;

    .myInfo {
      width: 100%;
      height: 80%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      img {
        width: 12rem;
        height: 12rem;
        background: #0E5CAD;
        border-radius: 50%;
      }

      .name {
        font-size: 2.4rem;
      }
    }

    .top {
      width: 100%;
      height: 4.6rem;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      img {
        width: 2.6rem;
        height: 3.6rem;
        margin-left: 1.4rem;
      }
    }


  }
}
</style>
