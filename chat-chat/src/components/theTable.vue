<template>
  <div class="theTable">
    <div class="tableTitle">
      {{ title }}
    </div>
    <div class="table">
      <div class="thead">
        <div>步骤</div>
        <div>流程</div>
        <div>说明</div>
        <div>时间节点</div>
        <div>负责人</div>
        <div>相关产出资料</div>
        <div>提醒</div>
      </div>
      <div class="tbody">
        <div class="tBodyItem">
          <div class="tbTitle">
            <div :style="`width:${tableWidth[0]}px`">1</div>
            <div :style="`width:${tableWidth[1]}px`"></div>
            <div class="addItem addTitle">+ 添加</div>
          </div>
          <div class="tbContent">
            <div class="tbContentItem">
              <div :style="`width:${tableWidth[2]}px`" contenteditable></div>
              <div :style="`width:${tableWidth[3]}px`"></div>
              <div :style="`width:${tableWidth[4]}px`"></div>
              <div :style="`width:${tableWidth[5]}px`">
                <span>输入名称</span>|<span>上传附件</span>
              </div>
              <div :style="`width:${tableWidth[6]}px`"></div>
              <div class="addItem addContent">+ 添加</div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "theTable",
  data() {
    return {
      title: "基建项目变电二、三次管理流程",
      tableData: [
        {
          title: "生产计划",
          children: [
            {
              "说明": "所有工作根据项目经理编制的生产计划展开",
              "时间节点": "2022-9-10",
              "负责人": "项目经理",
              "相关产出资料": "月生产计划"
            }
          ]
        }
      ],
      content: "1",
      tableWidth: [130, 130, 130, 169, 149, 207]
    };
  },
  mounted() {
    this.setTableWidth();
    window.onresize = this.setTableWidth;
  },
  methods: {
    setTableWidth() {
      document.querySelectorAll(".thead div").forEach((item, i) => {
        if (i < 2) {
          this.$set(this.tableWidth, i, item.clientWidth);
        } else {
          this.$set(this.tableWidth, i, item.offsetWidth);
        }

      });

      console.log(this.tableWidth);
    }
  }
};
</script>

<style scoped lang="scss">
.theTable {
  width: 60vw;
  height: 80vh;
  //background: #cce8cf;
  padding: 12px;
  margin: 0 auto;
}

.tableTitle {
  font-family: "楷体", "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-size: 1.8em;
  font-weight: 600;
}

.table {
  width: 100%;
}

.thead {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;

  div:nth-child(n) {
    font-family: "楷体", "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    font-size: 1.2em;
    font-weight: 600;
    flex-grow: 1;
    padding: 1px 20px;
    border: 1px solid black;
    border-top-width: 2px;
  }

  div:nth-child(1) {
    border-left-width: 2px;
  }

  div:nth-last-child(1) {
    border-right-width: 2px;
  }
}

.tbody {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.tbTitle {
  //margin-left: 1px;
  display: flex;
position: relative;
  div:nth-child(n) {
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  div:nth-child(1) {
    border-left-width: 2px;
  }
}

.tbContent {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.tBodyItem {
  width: 100%;
  display: flex;
}

.tbContentItem {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  position: relative;

  div span{
    padding:0 8px;
    &:nth-child(2){
      color: dodgerblue;
      text-decoration:underline
    }
  }
  div:nth-child(n) {
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px 0;
    box-sizing: border-box;
  }

  div:nth-last-child(1) {
    border-right-width: 2px;
  }
}

.addItem {
  position: absolute;
  border: 1px solid black!important;
  border-radius: 12px;
  padding: 2px 12px!important;
  background: #42b983;
  color: white;
  cursor: pointer;
  &:hover{
    background: rgba(66, 185, 131, 0.8);
  }
  &:active{
    border: 2px solid #595757 !important;
  }
}
.addContent{
  right: 0;
  transform: translateX(110%);
}
.addTitle{
  left: 50%;
  top: 110%;
  transform: translateX(-50%);
}
</style>
