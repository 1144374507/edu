<template>
    <div>
        <div class="__p_IO_u_2">
            <div class="__p_IO_u_3"></div>
            <div class="__p_IO_u_5">
                <el-form label-position="left">
                    <el-form-item label="模板名称" label-width="110px" required>
                        <el-input
                            id="add_snmp_name"
                            type="text"
                            class="__p_IO_u_8"
                            v-model.trim="snmp.name"
                            @blur="snmpNameCheck()"
                        ></el-input>
                        <span
                            id="p_1268_292"
                            class="__p_1268_uid_292"
                            v-if="check.nameCrash"
                            >模板名称已经存在</span
                        >
                        <span
                            id="p_1268_292"
                            class="__p_1268_uid_292"
                            v-if="check.nameEmpty"
                            >请输入模板名称</span
                        >
                        <span
                            id="p_1268_292"
                            class="__p_1268_uid_292"
                            v-if="check.isIllegal"
                            >模板名称非法</span
                        >
                    </el-form-item>
                    <el-form-item label="SNMP 版本号" label-width="110px" required>
                        <el-select
                            id="add_snmp_version"
                            v-model="snmp.version"
                            placeholder="请选择"
                            class="__p_IO_u_10"
                        >
                            <!-- <el-option
                                id="snmp_version_option_v1"
                                value="v1"
                                label="v1"
                            ></el-option> -->
                            <el-option
                                id="snmp_version_option_v2"
                                value="v2c"
                                label="v2c"
                            ></el-option>
                            <!-- <el-option id="snmp_version_option_v3" value="v3" label="v3"></el-option> -->
                        </el-select>
                    </el-form-item>
                    <el-form-item
                        v-show="snmp.version != 'v3'"
                        label="读团体字"
                        label-width="110px"
                        required
                    >
                        <el-input
                            id="add_snmp_readCommunity"
                            type="text"
                            class="__p_IO_u_15"
                            v-model.trim="snmp.readCommunity"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        v-show="snmp.version != 'v3'"
                        label="写团体字"
                        label-width="110px"
                        required
                    >
                        <el-input
                            id="add_snmp_writeCommunity"
                            type="text"
                            class="__p_IO_u_17"
                            v-model.trim="snmp.writeCommunity"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        v-show="snmp.version == 'v3'"
                        label="安全级别"
                        label-width="110px"
                    >
                        <el-select
                            id="add_snmp_securityLevel"
                            v-model="snmp.securityLevel"
                            placeholder="请输入内容"
                            class="__p_IO_u_11"
                        >
                            <el-option
                                id="add_snmp_securityLevel_AuthPriv"
                                value="AuthPriv"
                                label="认证且加密"
                            ></el-option>
                            <el-option
                                id="add_snmp_securityLevel_AuthNoPriv"
                                value="AuthNoPriv"
                                label="认证但不加密"
                            ></el-option>
                            <el-option
                                id="add_snmp_securityLevel_NoAuthNoPriv"
                                value="NoAuthNoPriv"
                                label="不认证不加密"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item
                        v-show="snmp.version == 'v3'"
                        label="用户名"
                        label-width="110px"
                    >
                        <el-input
                            id="add_snmp_usmName"
                            type="text"
                            class="__p_IO_u_11"
                            v-model.trim="snmp.usmName"
                            @blur="snmpUserNameCheck"
                        ></el-input>
                        <span
                            id="p_1268_2921"
                            class="__p_1268_uid_292"
                            v-if="check.usmName"
                            >请输入用户名</span
                        >
                    </el-form-item>
                    <el-form-item
                        v-show="
                            snmp.version == 'v3' &&
                            (snmp.securityLevel == 'AuthPriv' ||
                                snmp.securityLevel == 'AuthNoPriv')
                        "
                        label="认证密码"
                        label-width="110px"
                    >
                        <el-input
                            id="add_snmp_authPassword"
                            type="password"
                            class="__p_IO_u_11"
                            v-model="snmp.authPassword"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        v-show="
                            snmp.version == 'v3' &&
                            snmp.securityLevel == 'AuthPriv'
                        "
                        label="加密密码"
                        label-width="110px"
                    >
                        <el-input
                            id="add_snmp_privacyKey"
                            type="password"
                            class="__p_IO_u_11"
                            v-model="snmp.privacyKey"
                        ></el-input>
                    </el-form-item>
                    <div class="__p_IO_u_23" v-if="false">
                        <span
                            class="__p_IO_u_24"
                            id="add_snmp_extent"
                            @click="extent"
                            >高级设置</span
                        ><i
                            class="el-icon-arrow-down __p_IO_u_25"
                            @click="extent"
                        ></i>
                    </div>

                    <el-collapse-transition>
                        <div v-show="show">
                            <el-form-item label="端口" label-width="110px">
                                <el-input
                                    id="add_snmp_port"
                                    maxlength="5"
                                    onkeyup="value=value.replace(/[^\d]/g,'')"
                                    type="text"
                                    class="__p_IO_u_32"
                                    v-model="snmp.port"
                                ></el-input>
                                <span
                                    id="p_1268_292"
                                    class="__p_1268_uid_292"
                                    v-if="!checkPort(snmp.port)"
                                    >请填写1～65535范围内的数值</span
                                >
                            </el-form-item>
                            <el-form-item label="重试次数" label-width="110px">
                                <el-input
                                    id="add_snmp_retryCount"
                                    maxlength="2"
                                    onkeyup="value=value.replace(/[^\d]/g,'')"
                                    type="text"
                                    class="__p_IO_u_34"
                                    v-model="snmp.retryCount"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="超时时间" label-width="110px">
                                <el-input
                                    id="add_snmp_timeOut"
                                    maxlength="5"
                                    onkeyup="value=value.replace(/[^\d]/g,'')"
                                    type="text"
                                    class="__p_IO_u_36"
                                    v-model="snmp.timeOut"
                                ></el-input
                                ><span class="__p_IO_u_42">毫秒</span>
                            </el-form-item>
                            <el-form-item
                                v-show="
                                    snmp.version == 'v3' &&
                                    (snmp.securityLevel == 'AuthPriv' ||
                                        snmp.securityLevel == 'AuthNoPriv')
                                "
                                label="认证类型"
                                label-width="110px"
                            >
                                <el-select
                                    id="add_snmp_auth_version"
                                    placeholder="请输入内容"
                                    class="__p_IO_u_10"
                                    v-model="snmp.authType"
                                >
                                    <el-option
                                        id="add_snmp_auth_version_MD5"
                                        value="MD5"
                                        label="MD5"
                                    ></el-option>
                                    <el-option
                                        id="add_snmp_auth_version_SHA"
                                        value="SHA"
                                        label="SHA"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item
                                v-show="
                                    snmp.version == 'v3' &&
                                    snmp.securityLevel == 'AuthPriv'
                                "
                                label="加密类型"
                                label-width="110px"
                            >
                                <el-select
                                    id="add_snmp_auth_privacyType"
                                    placeholder="请输入内容"
                                    class="__p_IO_u_10"
                                    v-model="snmp.privacyType"
                                >
                                    <el-option
                                        id="add_snmp_auth_privacyType_DES56"
                                        value="DES56"
                                        label="DES56"
                                    ></el-option>
                                    <el-option
                                        id="add_snmp_auth_privacyType_DES3"
                                        value="DES3"
                                        label="DES3"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </el-collapse-transition>
                </el-form>
                <div class="__p_IO_u_39">
                    <el-button
                        id="add_snmp_auth_submitSnmp"
                        type="primary"
                        size="small"
                        class="__p_IO_u_40"
                        @click="submitSnmp()"
                        >保存</el-button
                    >
                    <el-button
                        id="add_snmp_auth_doCancel"
                        size="small"
                        class="__p_IO_u_41"
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
            safeLevel: "",
            show: false,
            check: {
                nameCrash: false,
                nameEmpty: false,
                isIllegal: false,
                usmName: false,
            },
            snmp: { version: 'v2c', port: 161, retryCount: 3, timeOut: 2000 },
        };
    },
    methods: {
        checkPort(portStr) {
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
        submitSnmp() {
            if (!this.snmp.name) {
                this.check.nameEmpty = true;
                return;
            }
            if (this.snmp.version == "v3") {
                if (!this.snmp.usmName) {
                    this.check.usmName = true;
                    return;
                }
            }
            if (this.check.nameCrash) {
                return;
            }
            if (this.snmp.name.length > 24) {
                this.check.isIllegal = true;
                return;
            }

            if (!this.snmp.readCommunity) {
                this.$message.error('读团体字不能为空');
                return;
            }

            if (!this.snmp.writeCommunity) {
                this.$message.error('写团体字不能为空');
                return;
            }

            if(/\s\S/.test(this.snmp.readCommunity) || /\s\S/.test(this.snmp.writeCommunity)){
                this.$message.error('团体字不能包含空格');
                return;
            }
            let configLoading = null;
            
            configLoading = this.$loading({
                        lock: true,
                        text: "添加snmp模板中，请稍等",
                        spinner: "el-icon-loading",
                        customClass: "g_snmp_config_loading",
                    });
            let self = this;
            self.$axios
                .post("/api/inc/syscfg/syscfgsnmptmpl/save", this.snmp)
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
        snmpUserNameCheck() {
            if (this.snmp.version == "v3") {
                if (this.snmp.usmName) {
                    this.check.usmName = false;
                }
            }
        },
        snmpNameCheck() {
            if (this.snmp.name) {
                this.check.nameEmpty = false;
            }
            if (this.snmp.name.length <= 24) {
                this.check.isIllegal = false;
            }
            this.$axios
                .post("/api/inc/syscfg/syscfgsnmptmpl/checkSnmpName", {
                    name: this.snmp.name,
                })
                .then((res) => {
                    if (res.data.success) {
                        this.check.nameCrash = false;
                    } else {
                        this.check.nameCrash = true;
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
.__p_IO_u_3 {
    margin-bottom: 20px;
}

.__p_IO_u_8 {
    width: 210px;
}

.__p_IO_u_10 {
    width: 100px;
}

.__p_IO_u_11 {
    width: 210px;
}

.__p_IO_u_15 {
    width: 210px;
}

.__p_IO_u_17 {
    width: 210px;
}

.__p_IO_u_24 {
    color: #8c8c8c;
    cursor: pointer;
}

.__p_IO_u_25 {
    margin-left: 5px;
    cursor: pointer;
}

.__p_IO_u_23 {
    justify-content: space-between;
}

.__p_IO_u_27 {
    color: #8c8c8c;
}

.__p_IO_u_26 {
    line-height: 30px;
}

.__p_IO_u_29 {
    color: #8c8c8c;
}

.__p_IO_u_30 {
    margin-left: 10px;
}

.__p_IO_u_28 {
    line-height: 30px;
}

.__p_IO_u_32 {
    width: 100px;
}

.__p_IO_u_34 {
    width: 100px;
}

.__p_IO_u_36 {
    width: 100px;
}

.__p_IO_u_42 {
    margin-left: 5px;
}

.__p_IO_u_40 {
    width: 100px;
}

.__p_IO_u_41 {
    width: 100px;
}

.__p_IO_u_39 {
    text-align: right;
}

.__p_IO_u_5 {
    margin-top: 20px;
}

.__p_IO_u_2 {
    width: 600px;
}
.__p_1268_uid_292 {
    color: #e03556;
    display: block;
    line-height: 20px;
}
</style>