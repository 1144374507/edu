<template>
  <div>
    <addSchedile ref="addSchedile" :pid="pid"></addSchedile>
    <div style="text-align: center; margin-top: 24px">
      <el-button
        type="info"
        @click="handlePreBtnClick"
        id="  qa-test-deploy-lastStep"
        >上一步</el-button
      >
      <el-button
        v-if="deployFinishStatus === 0"
        type="primary"
        @click="handleNextBtnClick"
        id="qa-test-deploy-fin"
        >完成</el-button
      >
    </div>
  </div>
</template>
<script>
import addSchedile from "../addSchedile/addSchedile";
export default {
  components: {
    addSchedile,
  },
  props: {
    schoolNumber: {},
    pid: {},
  },
  data() {
    return {
      deployFinishDialogVisible: false,
       deployFinishStatus: 0
    };
  },
  methods: {
    // 上一辈
    handlePreBtnClick() {
      this.$emit("preStep");
    },
    // 下一步
    handleNextBtnClick() {},
    // 下一步
    handleNextBtnClick() {
      this.deployFinishDialogVisible = true;
      const loading = this.$loading({
        lock: true,
        text: "处理中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      console.log(this.$refs.addSchedile.data1, "addSchedile");
      this.$axios
        .post(`/api/teacherManagement/updataSchedule`, this.$refs.addSchedile.data1)
        .then((res) => {
          if (res.data.success) {
            this.$message.success("添加成功");
            loading.close();
            this.$emit("nextStep");
          } else {
            this.$message.error();
            ("添加失败");
            loading.close();
          }
        });
    },
  },
  mounted() {},
};
</script>
<style scoped>
.__p_12z_u_7 {
  font-size: 16px;
  font-weight: bold;
  color: #212527;
  margin-bottom: 20px;
}

.__p_12z_u_19 {
  font-size: 16px;
  font-weight: bold;
  margin-left: 5px;
}

.__p_12z_u_2 {
  padding: 12px;
}

.__p_12z_u_20 {
  margin-left: 5px;
}

.__p_12z_u_18 {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  margin-top: 48px;
}

.__p_12z_u_30 {
  width: 116px;
}

.__p_12z_u_29 {
  text-align: center;
  margin-top: 24px;
}
</style>
<style lang="scss" scoped>
.asm-input-wraop {
  position: absolute;
  left: 0;
  top: 0;
}
.asm-input {
  width: 200px;
  // position: absolute;
  // left: 0;
  // top: 0;
}

.asm-input-tips {
  // position: absolute;
  // left: 0;
  // top: 0;
}
</style>

<style scoped lang="scss">
.theme-18edd0 {
  .__p_12z_u_7 {
    color: #fff;
  }
}
</style>
