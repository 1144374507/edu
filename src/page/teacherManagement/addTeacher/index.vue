<template>
  <div>
    <Overview
      v-if="showOverview"
      :teacherData="teacherData"
      @startBtnClick="handleStartBtnClick"
      @goStep="handleGoStep"
    ></Overview>
    <div v-else>
      <el-card>
        <el-steps :active="activeStep" simple class="m-simple-steps">
          <el-step
            title="基础信息"
            icon="custom-icon-1"
            :class="{ 'm-active-step': activeStep === 1 }"
          ></el-step>

          <el-step
            title="联系方式及其他"
            icon="custom-icon-3"
            :class="{ 'm-active-step': activeStep === 2 }"
          ></el-step>
        </el-steps>
      </el-card>
      <div class="content-wrapper">
        <div>
          <assign-manage
            v-if="activeStep === 1"
            :teacherData="teacherData"
            @preStep="handlePreStep"
            @nextStep="handleNextStep"
          ></assign-manage>

          <bind-configuration
            v-if="activeStep === 2"
            :teacherData="teacherData"
            @colseDielog="colseDielog"
            @preStep="handlePreStep"
            @nextStep="handleNextStep"
            :schoolNumber="schoolNumber"
          ></bind-configuration>
          <deploy-finish
            v-if="activeStep === 3"
            @preStep="handlePreStep"
            @nextStep="handleNextStep"
          ></deploy-finish>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AssignManage from "./assignManage.vue";
import BindConfiguration from "./bindConfiguration.vue";
import Overview from "./overview.vue";
import deployFinish from "./deployFinish";
import DeployFinish from "./deployFinish.vue";

export default {
  components: {
    Overview,
    BindConfiguration,
    AssignManage,
    deployFinish,
    DeployFinish,
  },
  props: {
    teacherData: {},
  },
  data() {
    return {
      showOverview: true,
      schoolNumber: "",
      activeStep: 1,
    };
  },
  methods: {
    colseDielog(){
      this.$emit('colseDielog')
    },
    handleStartBtnClick() {
      this.showOverview = false;
    },
    handlePreStep() {
      this.activeStep--;
    },
    handleNextStep(schoolNumber) {
      console.log(schoolNumber, "index---schoolNumber");
      this.schoolNumber = schoolNumber;
      this.activeStep++;
    },
    handleGoStep(step) {
      this.showOverview = false;
      this.activeStep = step;
    },
  },
};
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
    content: "1";
  }
}

.custom-icon-2 {
  &::before {
    display: block;
    font-style: initial;
    content: "2";
  }
}

.custom-icon-3 {
  &::before {
    display: block;
    font-style: initial;
    content: "3";
  }
}

.m-simple-steps.el-steps--simple.el-steps {
  padding: 0 12px;

  & .el-step__head .el-step__line-inner {
    display: none;
  }
  & .el-step__icon {
    background: #c7cccf;
    border-radius: 50%;
    width: 20px;
    height: 20px;
  }
  & .is-finish .el-step__icon {
    background: #026df7;
  }

  & .el-step.is-simple {
    & .el-step__main {
      & .el-step__arrow {
        &::before {
          display: none;
        }
        &::after {
          display: none;
        }
        height: 0;
        border-bottom: 1px dashed #c7cccf;
        margin: 8px;
      }

      & .is-finish + .el-step__arrow {
        border-bottom: 1px dashed #026df7;
      }
    }
    &.m-active-step .el-step__main {
      & .is-finish + .el-step__arrow {
        border-bottom: 1px dashed #c7cccf;
      }
    }
  }
}
</style>