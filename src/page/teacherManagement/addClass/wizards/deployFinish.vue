<template>
  <div>
    <el-card class="__p_12P_u_2"><img src="./images/FkuvSJBRb_OiFUPMjW63kYWn-rN9.png" class="__p_12P_u_3" />
      <div class="__p_12P_u_4"><span class="__p_12P_u_5">添加完成</span>
        <p class="__p_12P_u_6">请在 查看班级 查看班级</p>
      </div>
      <el-button type="default" size="small" class="__p_12P_u_8" @click="gotoClass">前往 查看班级</el-button>
    </el-card>
  </div>
</template>
<script>
  export default {
    methods: {
      gotoClass () {
        this.$emit('gotoClass')
      }
    }
  }
</script>

<style scoped>
  .__p_12P_u_3 {
    vertical-align: bottom;
  }

  .__p_12P_u_5 {
    font-weight: bold;
    font-size: 16px;
    color: #212527;
  }

  .__p_12P_u_6 {
    font-size: 14px;
    margin-top: 16px;
  }

  .__p_12P_u_4 {
    margin-top: 36px;
  }

  .__p_12P_u_8 {
    margin-top: 40px;
    padding-left: 52px;
    padding-right: 52px;
    border-radius: 161px;
    margin-bottom: 78px;
  }

  .__p_12P_u_2 {
    border-radius: 12px;
    /* background: #FFFFFF; */
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    display: block;
  }
</style>