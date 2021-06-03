<template>
  <div class="__student__wrapp__" >
    <Overview
      :isCrearteTeacher="isCrearteTeacher"
      :craeateStudent='craeateStudent'
      v-if="showOverview"
      :edit='edit'
      @startBtnClick="handleStartBtnClick"
      @startBtnClickBatch='handleStartBtnClickBatch'
      @goStep="handleGoStep"
    ></Overview>
    <div v-if="!showBatchCreateStudent && !showOverview">
      <el-card>
        <el-steps :active="activeStep" simple class="m-simple-steps">
          <el-step
            title="基础信息"
            icon="custom-icon-1"
            :class="{ 'm-active-step': activeStep === 1 }"
          ></el-step>
          <el-step
            title="入学信息"
            icon="custom-icon-2"
            :class="{ 'm-active-step': activeStep === 2 }"
          ></el-step>
          <el-step
            title="联系方式及其他"
            icon="custom-icon-3"
            :class="{ 'm-active-step': activeStep === 3 }"
          ></el-step>
        </el-steps>
      </el-card>
      <div class="content-wrapper">
        <div>
          <assign-manage
            v-if="activeStep === 1"
            :studentData='studentData'
            @preStep="handlePreStep"
            @nextStep="handleNextStep"
          ></assign-manage>
          <planning-configuration
            v-if="activeStep === 2"
            :studentData='studentData'
            @preStep="handlePreStep"
            @nextStep="handleNextStep"
            :schoolNumber="schoolNumber"
          ></planning-configuration>
          <bind-configuration
            v-if="activeStep === 3"
            :studentData='studentData'
            @preStep="handlePreStep"
            @nextStep="handleNextStep"
            @colseDielog='colseDielog'
            :schoolNumber="schoolNumber"
          ></bind-configuration>
          <deploy-finish
            v-if="activeStep === 4"
            @preStep="handlePreStep"
            @nextStep="handleNextStep"
          ></deploy-finish>
        </div>
      </div>
    </div>
    <div v-if="showBatchCreateStudent">
      <batchCreateStudent @cancel='handleCancel'></batchCreateStudent>
    </div>
  </div>
</template>
<script>
import AssignManage from "./assignManage.vue";
import BindConfiguration from "./bindConfiguration.vue";
import Overview from "./overview.vue";
import PlanningConfiguration from "./planningConfiguration.vue";
import deployFinish from "./deployFinish";
import DeployFinish from "./deployFinish.vue";
import batchCreateStudent from '@/components/home/batchCreateStudent'

export default {

  components: {
    Overview,
    BindConfiguration,
    AssignManage,
    PlanningConfiguration,
    deployFinish,
    DeployFinish,
    batchCreateStudent
  },
  props: {
    isCrearteTeacher: {},edit:{},studentData:{},craeateStudent:{}
  },
  data() {
    return {
      showBatchCreateStudent:false,
      showOverview: true,
      schoolNumber: "",
      activeStep: 1,
    };
  },
  methods: {
    handleCancel(){
      this.showBatchCreateStudent = false 
      this.showOverview = true
    },
    colseDielog(){
      this.$emit('colseDielog')
    },
    handleStartBtnClick() {
      this.showOverview = false;
    },
    handleStartBtnClickBatch(){
      this.showOverview = false;
      this.showBatchCreateStudent = true;
    },
    handlePreStep() {
      this.activeStep--;
    },
    handleNextStep(schoolNumber) {
      console.log(schoolNumber, "index---schoolNumber");
      this.schoolNumber = schoolNumber;
      console.log(this.isCrearteTeacher);
      if (this.isCrearteTeacher) {
        this.activeStep = this.activeStep + 2;
        return;
      }else{

        this.activeStep++;
      }
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
<style lang="scss">
.__student__wrapp__{
  
}
</style>