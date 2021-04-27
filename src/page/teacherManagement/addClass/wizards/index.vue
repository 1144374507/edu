<template>
  <div>
    <Overview v-if="showOverview" @startBtnClick="handleStartBtnClick" @goStep="handleGoStep"></Overview>
    <div v-else>
      <el-card>
        <el-steps :active="activeStep" simple class="m-simple-steps">
          <el-step title="添加班级" icon="custom-icon-1" :class="{'m-active-step': activeStep === 1}"></el-step>
          
        </el-steps>
      </el-card>
      <div class="content-wrapper">
        <div>
          <assign-manage v-if="activeStep === 1" @preStep="handlePreStep" @nextStep="handleNextStep"></assign-manage>
          <schedule :pid='pid' v-if="activeStep === 2" @preStep="handlePreStep" @nextStep="handleNextStep" ></schedule>
          <deploy-finish @gotoClass='gotoClass'  v-if="activeStep === 3" @preStep="handlePreStep" @nextStep="handleNextStep"></deploy-finish>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AssignManage from './assignManage.vue'
import Overview from './overview.vue'
import DeployFinish from './deployFinish.vue'
import schedule from './schedule'

export default {
  components: {
    Overview,
    AssignManage,
    DeployFinish,
    schedule
  },
  data () {
    return {
      showOverview: true,
      activeStep: 1,
    }
  },
  methods: {
    gotoClass(){
      this.$emit('gotoClass')
    },
    handleStartBtnClick () {
      this.showOverview = false
    },
    handlePreStep () {
      this.activeStep --
    },
    handleNextStep (pid) {
      console.log(pid,'pid');
      this.pid = pid
      this.activeStep ++
    },
    handleGoStep (step) {
      this.showOverview = false
      this.activeStep = step
    }
  }
}
</script>
<style lang="scss" scoped>
  .content-wrapper {
    margin-top: 10px;
    width: 100%;
    float: left;
  }
</style>
<style lang="scss">
  .custom-icon-1 {
    &::before {
      display: block;
      font-style: initial;
      content: '1';
    }
  }

  .custom-icon-2 {
    &::before {
      display: block;
      font-style: initial;
      content: '2';
    }
  }

  .custom-icon-3 {
    &::before {
      display: block;
      font-style: initial;
      content: '3';
    }
  }

  .m-simple-steps.el-steps--simple.el-steps {
    padding: 0 12px;

    & .el-step__head .el-step__line-inner {
      display: none;
    }
    & .el-step__icon {
      background: #C7CCCF;
      border-radius: 50%;
      width: 20px;
      height: 20px;
    }
    & .is-finish .el-step__icon {
      background: #026DF7;
    }

    & .el-step.is-simple  {
      & .el-step__main {
        & .el-step__arrow {
          &::before {
            display: none;
          }
          &::after {
            display: none;
          }
          height: 0;
          border-bottom: 1px dashed #C7CCCF;
          margin: 8px;
        }

        & .is-finish + .el-step__arrow {
          border-bottom: 1px dashed #026DF7;
        }
      }
      &.m-active-step .el-step__main {
        & .is-finish + .el-step__arrow {
          border-bottom: 1px dashed #C7CCCF;
        }
      }
    }
  }
</style>