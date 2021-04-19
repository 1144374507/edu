<template>
    <div>
        <div class="__p_IK_u_2">
            <div class="__p_IK_u_5">
                <el-form label-position="left">
                    <el-form-item label="模板名称" label-width="110px" required>
                        <el-input
                            id="add_telnet_name"
                            placeholder="请输入模板名称"
                            type="text"
                            class="__p_IK_u_24"
                            v-model.trim="telnet.name"
                            @blur="telnetNameCheck()"
                        ></el-input>
                        <span
                            id="p_1268_292"
                            class="__p_1268_uid_292"
                            v-if="telnet.nameCrash"
                            >模板名称已经存在</span
                        >
                        <span
                            id="p_1268_292"
                            class="__p_1268_uid_292"
                            v-if="telnet.nameEmpty"
                            >请输入模板名称</span
                        >
                        <span
                            id="p_1268_292"
                            class="__p_1268_uid_292"
                            v-if="telnet.isIllegal"
                            >模板名称非法</span
                        >
                    </el-form-item>
                    <div class="__p_IK_u_20">
                        <i class="el-icon-info __p_IK_u_21"></i
                        ><span class="__p_IK_u_22"
                            >如果连接时无需用户名或无需密码，请留空</span
                        >
                    </div>
                    <el-form-item
                        placeholder="请输入内容"
                        label="用户名"
                        label-width="110px"
                    >
                        <el-input
                            id="add_telnet_username"
                            type="text"
                            class="__p_IK_u_25"
                            v-model.trim="telnet.userName"
                        ></el-input>
                        <span
                            id="p_1268_292"
                            class="__p_1268_uid_292"
                            v-if="!checkUserName()"
                            >用户名不允许输入中文</span
                        >
                    </el-form-item>
                    <el-form-item
                        placeholder="请输入内容"
                        label="密码"
                        label-width="110px"
                    >
                        <el-input
                            id="add_telnet_password"
                            type="password"
                            class="__p_IK_u_26"
                            v-model="telnet.password"
                        ></el-input>
                    </el-form-item>
                    <div class="__p_IK_u_27">
                        <i class="el-icon-info __p_IK_u_28"></i
                        ><span class="__p_IK_u_29">
                            超级用户密码用于进入特权模式（普通模式权限很小，一般都需要进）</span
                        >
                    </div>
                    <el-form-item label="超级用户密码" label-width="110px">
                        <el-input
                            id="add_telnet_superPassword"
                            type="password"
                            class="__p_IK_u_34"
                            v-model="telnet.superPassword"
                        ></el-input>
                    </el-form-item>

                    <div class="__p_IK_u_35" v-if="false">
                        <span
                            id="add_telnet_extent"
                            class="__p_IK_u_54"
                            @click="extent"
                            >高级设置</span
                        ><i
                            class="el-icon-arrow-down __p_IK_u_55"
                            @click="extent"
                        ></i>
                    </div>

                    <el-collapse-transition>
                        <div v-show="show">
                            <el-form-item label="端口" label-width="110px">
                                <el-input
                                    id="add_telnet_port"
                                    type="text"
                                    class="__p_IK_u_44"
                                    v-model.trim="telnet.port"
                                ></el-input>
                                <span
                                    id="p_1268_292"
                                    class="__p_1268_uid_292"
                                    v-if="!checkPort()"
                                    >请填写1～65535范围内的数值</span
                                >
                            </el-form-item>
                            <div class="__p_IK_u_41">
                                <span class="__p_IK_u_43"
                                    >以下选项支持锐捷，华为，H3C，思科的设备自动识别，无须配置。</span
                                >
                            </div>
                            <div class="__p_IK_u_50">
                                <span class="__p_IK_u_51"
                                    >其他厂商设备请选择</span
                                >
                                <el-checkbox
                                    id="add_telnet_customer"
                                    v-model="customer"
                                    class="__p_IK_u_53"
                                    >手动指定</el-checkbox
                                >
                            </div>
                            <el-form-item label="提示符" label-width="110px">
                                <el-input
                                    id="add_telnet_prompt"
                                    :disabled="!customer"
                                    type="text"
                                    class="__p_IK_u_45"
                                    v-model="telnet.prompt"
                                ></el-input>
                            </el-form-item>
                            <el-form-item
                                label="超级用户提示符"
                                label-width="110px"
                            >
                                <el-input
                                    id="add_telnet_suPrompt"
                                    :disabled="!customer"
                                    type="text"
                                    class="__p_IK_u_46"
                                    v-model="telnet.suPrompt"
                                ></el-input>
                            </el-form-item>
                            <el-form-item
                                label="特权模式命令"
                                label-width="110px"
                            >
                                <el-input
                                    id="add_telnet_enableCmd"
                                    :disabled="!customer"
                                    type="text"
                                    class="__p_IK_u_57"
                                    v-model="telnet.enableCmd"
                                ></el-input>
                            </el-form-item>
                        </div>
                    </el-collapse-transition>
                </el-form>
                <div class="__p_IK_u_30">
                    <el-button
                        id="add_telnet_submitTelnet"
                        type="primary"
                        size="small"
                        class="__p_IK_u_31"
                        @click="submitTelnet()"
                        >保存</el-button
                    >
                    <el-button
                        id="add_telnet_doCancel"
                        size="small"
                        class="__p_IK_u_32"
                        @click="doCancel"
                        >取消</el-button
                    >
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            customer: false,
            show: false,
            telnet: {
                nameCrash: false,
                nameEmpty: false,
                isIllegal: false,
            },
        };
    },
    methods: {
        checkUserName() {
            const userName = this.telnet.userName;
            if (!userName) {
                return true;
            }
            return /^[^\u4e00-\u9fa5]*$/.test(userName);
        },
        checkPort() {
            const portStr = this.telnet.port;
            if (
                !portStr ||
                (/^[1-9]\d*$/.test(portStr) && Number(portStr) <= 65535)
            ) {
                return true;
            }
            return false;
        },
        doCancel() {
            this.closeRjDialog();
        },
        extent() {
            this.show = !this.show;
        },
        submitTelnet() {
            if (!this.telnet.name) {
                this.telnet.nameEmpty = true;
                return;
            }
            if (this.telnet.nameCrash) {
                return;
            }
            if (this.telnet.name.length > 24) {
                this.telnet.isIllegal = true;
                return;
            }
            if (!this.checkUserName() || !this.checkPort()) {
                return;
            }
            let self = this;
            this.telnet.isSsh = false;
            let configLoading = null;
            
            configLoading = this.$loading({
                        lock: true,
                        text: "添加telnet模板中，请稍等",
                        spinner: "el-icon-loading",
                        customClass: "g_telnet_config_loading",
                    });
            self.$axios
                .post("/api/inc/syscfg/syscfgtelnettmpl/save", this.telnet)
                .then((res) => {
                    if (res.data.success) {
                        this.$message({
                            type: "success",
                            message: "添加成功!",
                        });
                        if (configLoading) {
                            configLoading.close();
                        }
                        self.closeRjDialog();
                    } else {
                        throw res.data.message;
                    }
                })
                .catch((err) => {
                    this.$message({
                        message: err,
                        type: "error",
                    });
                }).finally(() => {
                        if (configLoading) {
                            configLoading.close();
                        }
                    });
        },
        telnetNameCheck() {
            if (this.telnet.name) {
                this.telnet.nameEmpty = false;
            }
            if (this.telnet.name.length <= 24) {
                this.telnet.isIllegal = false;
            }
            this.$axios
                .post("/api/inc/syscfg/syscfgtelnettmpl/checkTelnetName", {
                    name: this.telnet.name,
                })
                .then((res) => {
                    if (res.data.success) {
                        this.telnet.nameCrash = false;
                    } else {
                        this.telnet.nameCrash = true;
                    }
                })
                .catch((err) => {
                    this.$message({
                        message: err,
                        type: "error",
                    });
                });
        },
    },
};
</script>

<style scoped>
.__p_IK_u_4 {
    margin-bottom: 10px;
    font-size: 16px;
}

.__p_IK_u_3 {
    margin-bottom: 20px;
}

.__p_IK_u_24 {
    width: 210px;
}

.__p_IK_u_21 {
    font-size: 14px;
}

.__p_IK_u_22 {
    margin-left: 10px;
    color: #8c8c8c;
}

.__p_IK_u_20 {
    line-height: 30px;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-right: 10px;
    margin-top: -20px;
}

.__p_IK_u_25 {
    width: 210px;
}

.__p_IK_u_26 {
    width: 210px;
}

.__p_IK_u_28 {
    font-size: 14px;
}

.__p_IK_u_29 {
    margin-left: 10px;
    color: #8c8c8c;
}

.__p_IK_u_27 {
    line-height: 30px;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-right: 10px;
    padding-left: 0;
    margin-top: -20px;
}

.__p_IK_u_34 {
    width: 210px;
}

.__p_IK_u_54 {
    color: #8c8c8c;
    cursor: pointer;
}

.__p_IK_u_55 {
    cursor: pointer;
    margin-left: 5px;
}

.__p_IK_u_35 {
    justify-content: space-between;
}

.__p_IK_u_44 {
    width: 100px;
}

.__p_IK_u_43 {
    color: #8c8c8c;
}

.__p_IK_u_41 {
    line-height: 30px;
    margin-top: -20px;
}

.__p_IK_u_51 {
    color: #8c8c8c;
}

.__p_IK_u_53 {
    margin-left: 10px;
}

.__p_IK_u_50 {
    line-height: 30px;
}

.__p_IK_u_45 {
    width: 100px;
}

.__p_IK_u_46 {
    width: 100px;
}

.__p_IK_u_57 {
    width: 100px;
}

.__p_IK_u_31 {
    width: 100px;
}

.__p_IK_u_32 {
    width: 100px;
}

.__p_IK_u_30 {
    text-align: right;
}

.__p_IK_u_5 {
    margin-top: 20px;
}

.__p_IK_u_2 {
    width: 600px;
}
.__p_1268_uid_292 {
    color: #e03556;
    display: block;
    line-height: 20px;
}
</style>