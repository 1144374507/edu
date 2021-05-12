<template>
    <div>
        <div>
            <div class="__p_12e_u_57">

                <span v-if='teacherData' class="__p_12e_u_58">编辑老师信息</span>
                <span v-else class="__p_12e_u_58">创建老师</span>
            </div>
            <el-row :gutter="16">
                <el-col :span="8">
                    <div
                        class="__p_12e_u_60"
                        id="qa-test-customize"
                        :class="{ 'm-cursor': allowEditItem }"
                        @click="handleStep1Click"
                    >
                        <img
                            src="./images/index1.png"
                            class="__p_12e_u_61"
                        />
                        <div class="__p_12e_u_62">
                            <span class="__p_12e_u_63">① 基础信息</span
                            > 
                        </div>
                    </div>
                </el-col>
                
                <el-col :span="8">
                    <div
                        class="__p_12e_u_69"
                        id="qa-test-binding-config-template"
                        :class="{ 'm-cursor': allowEditItem }"
                        @click="handleStep3Click"
                    >
                        <img
                            src="./images/index3.png"
                            class="__p_12e_u_70"
                        />
                        <div class="__p_12e_u_71">
                            <span class="__p_12e_u_72">② 联系方式及其他 </span>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <div class="__p_12e_u_73">
                <el-button
                    type="primary"
                    size="small"
                    class="__p_12e_u_74"
                    id="qa-test-wizards-open"
                    @click="handleStartBtnClick"
                    >开始</el-button
                >
            </div>
        </div>
    </div>
</template>
<script>
export default {
  props:{
    teacherData:{}
  },
    data() {
        return {
            allowEditItem: false,
        };
    },
    mounted() {
    },
    methods: {
        handleStartBtnClick() {
            this.$emit("startBtnClick");
        },
        handleStep1Click() {
            if (!this.allowEditItem) return;
            this.$emit("goStep", 1);
        },
        handleStep2Click() {
            if (!this.allowEditItem) return;
            this.$emit("goStep", 2);
        },
        handleStep3Click() {
            if (!this.allowEditItem) return;
            this.$emit("goStep", 3);
        },
    },
};
</script>

<style scoped>
.m-cursor {
    cursor: pointer;
}
.__p_12e_u_58 {
    font-size: 20px;
    color: #212527;
    padding-top: 0;
    margin-top: 0;
    padding-bottom: 0;
    margin-left: 0;
    font-weight: bold;
    margin-right: auto;
    margin-bottom: 0;
    align-items: center;
    padding-left: 0;
    width: 122px;
}

.__p_12e_u_57 {
    padding-bottom: 24px;
}

.__p_12e_u_61 {
    vertical-align: bottom;
    width: 100%;
    max-width: 400px;
}

.__p_12e_u_63 {
    font-size: 16px;
    font-weight: bold;
}

.__p_12e_u_64 {
    background: rgba(245, 124, 0, 0.1);
    border: 1px solid rgba(245, 124, 0, 0.4);
    line-height: 16px;
    padding-left: 2px;
    padding-right: 2px;
    border-radius: 30px;
    font-size: 12px;
    color: #f57c00;
    height: 16px;
    display: block;
    width: 65px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 14px;
}

.__p_12e_u_62 {
    line-height: 24px;
    margin-top: 16px;
}

.__p_12e_u_60 {
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 4.02px 4.02px 12.85px rgba(237, 246, 252, 0.7);
    text-align: center;
    top: 0;
    padding: 32px 54px 72px;
    vertical-align: 0;
    margin-top: 0;
    line-height: 0;
    border: 1px solid #f0f0f0;
}

.__p_12e_u_66 {
    vertical-align: bottom;
    width: 100%;
    max-width: 400px;
}

.__p_12e_u_68 {
    font-size: 16px;
    font-weight: bold;
}

.__p_12e_u_67 {
    line-height: 24px;
    margin-top: 16px;
}

.__p_12e_u_65 {
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 4.02px 4.02px 12.85px rgba(237, 246, 252, 0.7);
    text-align: center;
    padding: 32px 54px 104px;
    border: 1px solid #f0f0f0;
}

.__p_12e_u_70 {
    vertical-align: bottom;
    width: 100%;
    max-width: 400px;
}

.__p_12e_u_72 {
    font-size: 16px;
    font-weight: bold;
}

.__p_12e_u_71 {
    line-height: 24px;
    margin-top: 16px;
}

.__p_12e_u_69 {
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 4.02px 4.02px 12.85px rgba(237, 246, 252, 0.7);
    text-align: center;
    padding: 32px 54px 104px;
    border: 1px solid #f0f0f0;
}

.__p_12e_u_59 {
    display: flex;
}

.__p_12e_u_74 {
    width: 166px;
    height: 40px;
    border-radius: 36px;
    background: #026df7;
    box-shadow: 0px 5.33px 8px rgba(2, 109, 247, 0.2);
}

.__p_12e_u_73 {
    text-align: center;
    margin-top: 56px;
}
</style>
<style scoped lang="scss">
.theme-18edd0 {
    .__p_12e_u_60,
    .__p_12e_u_65,
    .__p_12e_u_69 {
        background: linear-gradient(0deg, #282d3c, #304054);
        border: 1px solid rgba(110, 127, 151, 0.2);
        box-shadow: none;
        border-radius: 2px;
    }
    .__p_12e_u_58 {
        color: #fff;
    }
    .__p_12e_u_74 {
        box-shadow: none;
    }
}
</style>