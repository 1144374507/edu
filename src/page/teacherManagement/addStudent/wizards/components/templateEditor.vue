
<template>
    <div>
        <div style="margin-bottom: 28px">
            <template v-if="cliVisible">
                <el-button
                    id="qa-test-config-return"
                    type="text"
                    @click="cliVisible = false"
                    style="margin-right: 10px"
                    ><i class="el-icon-back" style="font-size: 16px"></i
                ></el-button>
                <span style="font-size: 16px" class="__title"
                    >配置模板（CLI配置）</span
                >
            </template>
            <template v-else>
                <span style="font-size: 16px" class="__title">配置模板</span>
                <el-button
                    id="qa-test-cli-config"
                    type="text"
                    @click="goEditCli"
                    style="margin-left: 10px"
                    >使用CLI配置</el-button
                >
            </template>
        </div>

        <transition name="el-slide-left">
            <div v-show="cliVisible">
                <el-row>
                    <el-col :span="12" style="padding: 10px">
                        <span class="__cli-label">配置预览</span>
                        <el-input
                            type="textarea"
                            v-model="preview"
                            id="qa-test-optPlan-config-confPreview"
                            readonly
                            :rows="35"
                            resize="none"
                            class="__preview g__preview"
                            style="margin-top: 10px"
                        ></el-input>
                    </el-col>
                    <el-col :span="12" style="padding: 10px">
                        <div class="__cli-label">自定义CLI</div>
                        <div>
                            <el-input
                                id="qa-test-optPlan-config-cli"
                                type="textarea"
                                v-model="cliTemp"
                                placeholder="请在此填入 cli 命令。建议使用文本编辑器编辑好以后直接粘贴进来。"
                                class="__preview g__preview-1"
                                :rows="35"
                                resize="none"
                                style="margin-top: 10px"
                            ></el-input>
                        </div>
                    </el-col>
                </el-row>
                <div
                    style="
                        text-align: right;
                        margin-top: 20px;
                        padding-top: 20px;
                    "
                >
                    <el-button
                        @click="cliVisible = false"
                        id="qa-test-optPlan-config-cancel"
                        >取消</el-button
                    >
                    <el-button
                        type="primary"
                        @click="getPreview"
                        id="qa-test-optPlan-config-confPre"
                        >确认并预览</el-button
                    >
                </div>
            </div>
        </transition>

        <transition name="el-slide-right">
            <div v-show="!cliVisible">
                <div>
                    <el-form
                        :model="form1"
                        :rules="form1Rules"
                        ref="form1"
                        label-width="13em"
                        label-position="left"
                    >
                        <el-form-item label="配置模板名称" prop="name">
                            <el-input
                                v-model="form1.name"
                                :maxlength="32"
                                placeholder="请输入模板名称"
                                style="width: 208px"
                                id="qa-test-template-name"
                            ></el-input>
                            <el-tooltip
                                content="最多32个中英文数字及字符，字符仅包含“-”、“_”"
                                style="margin-left: 10px"
                                ><i class="el-icon-info"></i
                            ></el-tooltip>
                        </el-form-item>
                        <el-form-item
                            label="模板适用端口数（电口）"
                            prop="portNum"
                        >
                            <el-select
                                v-model="form1.portNum"
                                id="qa-test-optPlan-switchPort"
                                @change="onPortNumChange"
                                style="width: 208px"
                                :disabled="isEdit"
                            >
                                <el-option
                                    :value="4"
                                    label="4"
                                    id="qa-test-optPlan-switchPort_4"
                                ></el-option>
                                <el-option
                                    :value="8"
                                    label="8"
                                    id="qa-test-optPlan-switchPort_8"
                                ></el-option>
                                <el-option
                                    :value="10"
                                    label="10"
                                    id="qa-test-optPlan-switchPort_10"
                                ></el-option>
                                <el-option
                                    :value="16"
                                    label="16"
                                    id="qa-test-optPlan-switchPort_16"
                                ></el-option>
                                <el-option
                                    :value="18"
                                    label="18"
                                    id="qa-test-optPlan-switchPort_18"
                                ></el-option>
                                <el-option
                                    :value="24"
                                    label="24"
                                    id="qa-test-optPlan-switchPort_24"
                                ></el-option>
                                <el-option
                                    :value="26"
                                    label="26"
                                    id="qa-test-optPlan-switchPort_26"
                                ></el-option>
                                <el-option
                                    :value="48"
                                    label="48"
                                    id="qa-test-optPlan-switchPort_48"
                                ></el-option>
                            </el-select>
                            <el-popover trigger="click">
                                <el-button
                                    id="qa-test-check-portNumber"
                                    type="text"
                                    slot="reference"
                                    style="margin-left: 10px"
                                    >查看设备型号端口数</el-button
                                >
                                <ports-guide></ports-guide>
                            </el-popover>
                        </el-form-item>
                        <el-form-item label="Telnet凭证" prop="telnetTmplId">
                            <el-select
                                v-model="form1.telnetTmplId"
                                id="qa-test-wizards-telnet"
                                style="width: 208px"
                            >
                                <el-option value="">
                                    <div
                                        @click.stop
                                        style="
                                            margin: 0 -20px;
                                            text-align: center;
                                            cursor: default;
                                        "
                                    >
                                        <el-button
                                            style="padding: 0"
                                            id="qa-test-wizards-telnet-newTelnet"
                                            type="text"
                                            @click="go2AddTelent"
                                            >新建Telnet模板</el-button
                                        >
                                    </div>
                                </el-option>
                                <el-option
                                    v-for="item in telnets"
                                    :id="'qa-test-wizards-telnet_' + item.name"
                                    :label="item.name"
                                    :value="item.id"
                                    :key="item.id"
                                ></el-option>
                            </el-select>
                            <el-popover
                                placement="bottom"
                                width="200"
                                trigger="click">
                                <telnetDefaultTip></telnetDefaultTip>
                                <el-button slot="reference" type="text" style="margin-left: 10px">查看Telnet缺省模板</el-button>
                            </el-popover>
                        </el-form-item>
                        <el-form-item label="SNMP凭证" prop="snmpTmplId">
                            <el-select
                                v-model="form1.snmpTmplId"
                                id="qa-test-wizards-snmp"
                                style="width: 208px"
                            >
                                <el-option value="">
                                    <div
                                        @click.stop
                                        style="
                                            margin: 0 -20px;
                                            text-align: center;
                                            cursor: default;
                                        "
                                    >
                                        <el-button
                                            style="padding: 0"
                                            type="text"
                                            id="qa-test-wizards-snmp-newSnmp"
                                            @click="go2AddSnmp"
                                            >新建SNMP模板</el-button
                                        >
                                    </div>
                                </el-option>
                                <el-option
                                    v-for="item in snmps"
                                    :id="'qa-test-wizards-snmp_' + item.name"
                                    :label="item.name"
                                    :value="item.id"
                                    :key="item.id"
                                ></el-option>
                            </el-select>
                            <el-popover
                                placement="bottom"
                                width="200"
                                trigger="click">
                                <snmpDefaultTip></snmpDefaultTip>
                                <el-button slot="reference" type="text" style="margin-left: 10px">查看SNMP缺省模板</el-button>
                            </el-popover>
                        </el-form-item>
                    </el-form>
                    <el-tabs v-model="tab" class="g-template-editor-tab1">
                        <el-tab-pane name="1" label="端口">
                            <ports-editor
                                :upPorts="upPorts"
                                :downPorts="downPorts"
                                @up-change="
                                    ({ index, payload }) =>
                                        setPorts(upPorts, index, payload)
                                "
                                @down-change="
                                    ({ index, payload }) =>
                                        setPorts(downPorts, index, payload)
                                "
                            ></ports-editor>
                        </el-tab-pane>
                        <el-tab-pane name="2" label="全局">
                            <el-form
                                :model="form2"
                                :rules="form2Rules"
                                ref="form2"
                                label-width="190px"
                                label-position="left"
                            >
                                <el-form-item
                                    label="MAC通告采集周期"
                                    prop="DEVICE_MAC_NOTIFICATION_PERIOD"
                                >
                                    <el-input
                                        v-model="
                                            form2.DEVICE_MAC_NOTIFICATION_PERIOD
                                        "
                                        placeholder="请输入采集周期"
                                        style="width: 192px"
                                    ></el-input>
                                    秒
                                    <el-tooltip
                                        content="范围1-3600秒（建议不低于60秒）"
                                    >
                                        <i class="el-icon-info"></i>
                                    </el-tooltip>
                                </el-form-item>
                                <el-form-item
                                    label="光模块告警检测"
                                    prop="DEVICE_FIBER_ENABLE"
                                >
                                    <el-checkbox
                                        v-model="form2.DEVICE_FIBER_ENABLE"
                                        id="qa-test-alarm-switch"
                                        >启用</el-checkbox
                                    >
                                    <el-tooltip
                                        content="检测间隔默认5分钟"
                                    >
                                        <i class="el-icon-info"></i>
                                    </el-tooltip>
                                </el-form-item>
                                <el-form-item
                                    label="密钥加密"
                                    prop="DEVICE_SERVICE_ENCRYPT"
                                >
                                    <el-checkbox
                                        v-model="form2.DEVICE_SERVICE_ENCRYPT"
                                        id="qa-test-key-switch"
                                        >启用</el-checkbox
                                    >
                                </el-form-item>
                                <el-form-item
                                    label="Log服务器"
                                    prop="logServerEnabled"
                                >
                                    <el-checkbox
                                        v-model="form2.logServerEnabled"
                                        id="qa-test-logserver-switch"
                                        >启用</el-checkbox
                                    >
                                </el-form-item>
                                <div
                                    v-show="form2.logServerEnabled"
                                    class="__form"
                                    style="
                                        margin-left: 190px;
                                        border-radius: 12px;
                                    "
                                >
                                    <el-row>
                                        <el-col :span="10">
                                            <el-form-item
                                                label="Log服务器IP"
                                                label-width="104px"
                                                prop="DEVICE_LOGIN_SERVER_HOST"
                                            >
                                                <el-input
                                                    v-model.trim="
                                                        form2.DEVICE_LOGIN_SERVER_HOST
                                                    "
                                                    placeholder="请输入服务器IP"
                                                    id="qa-test-logserverip"
                                                ></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="5" :offset="1">
                                            <el-form-item
                                                label="端口"
                                                label-width="50px"
                                                prop="DEVICE_LOGIN_SERVER_PORT"
                                            >
                                                <el-input
                                                    v-model.trim="
                                                        form2.DEVICE_LOGIN_SERVER_PORT
                                                    "
                                                    placeholder="请输入端口"
                                                    id="qa-test-portNumber"
                                                ></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="10">
                                            <el-form-item
                                                label="Buffer大小"
                                                label-width="104px"
                                                prop="DEVICE_LOGGIN_BUFFER"
                                            >
                                                <el-input
                                                    v-model.trim="
                                                        form2.DEVICE_LOGGIN_BUFFER
                                                    "
                                                    placeholder="请输入Buffer大小"
                                                    id="qa-test-bufferSize"
                                                ></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="10">
                                            <div
                                                style="
                                                    line-height: 41px;
                                                    font-size: 14px;
                                                "
                                            >
                                                <span>（字节）</span>
                                                <el-tooltip
                                                    content="Buffer值范围为4096～1048576"
                                                    ><i class="el-icon-info"></i
                                                ></el-tooltip>
                                            </div>
                                        </el-col>
                                    </el-row>
                                </div>
                            </el-form>
                        </el-tab-pane>
                    </el-tabs>

                    <div style="text-align: right; margin-top: 35px">
                        <el-button
                            @click="$emit('cancel')"
                            id="qa-test-port-btnCancel"
                            >取消</el-button
                        >
                        <el-button
                            type="primary"
                            @click="handleSaveBtnClick"
                            id="qa-test-port-btnSave"
                            >保存</el-button
                        >
                    </div>
                </div>
            </div>
        </transition>

        <rj-dialog></rj-dialog>
    </div>
</template>
<script>
import portsEditor from "./portsEditor";
import portsGuide from "./portsGuide";
import rjDialog from "@/common/dialog.vue";
import addTelent from "./addTelent.vue";
import addSnmp from "./addSnmp.vue";
import telnetDefaultTip from './telnetDefaultTip'
import snmpDefaultTip from './snmpDefaultTip'

import { isValidIp } from "../../utils/validate.js";

export default {
    components: {
        telnetDefaultTip,
        snmpDefaultTip,
        portsEditor,
        portsGuide,
        rjDialog,
        addTelent,
        addSnmp,
    },
    props: {
        payload: {},
    },
    data() {
        return {
            initLoading: false,
            priginConfigTemplate: {},
            telnets: [],
            snmps: [],
            form1: {
                name: "",
                portNum: undefined,
                snmpTmplId: 1,
                telnetTmplId: 1,
            },
            form1Rules: {
                name: [
                    {
                        required: true,
                        message: "请输入模板名称",
                    },
                    {
                        validator(rule, value, callback) {
                            if (value) {
                                if (
                                    !/^[\u4e00-\u9fa5a-zA-Z0-9-_]+$/.test(value)
                                ) {
                                    return callback(
                                        new Error(
                                            "只能包含中英文及字符，字符仅包含“-”、“_”"
                                        )
                                    );
                                }
                            }
                            callback();
                        },
                    },
                ],
                portNum: [
                    {
                        required: true,
                        message: "请选择模板适用端口数（电口）",
                    },
                ],
                telnetTmplId: [
                    {
                        required: true,
                        message: "请选择Telnet协议",
                    },
                ],
                snmpTmplId: [
                    {
                        required: true,
                        message: "请选择SNMP协议",
                    },
                ],
            },
            tab: "1",

            upPorts: [],
            downPorts: [],

            form2: {
                DEVICE_MAC_NOTIFICATION_PERIOD: "60",
                DEVICE_FIBER_ENABLE: true,
                DEVICE_SERVICE_ENCRYPT: true,
                logServerEnabled: false,
                DEVICE_LOGIN_SERVER_HOST: "",
                DEVICE_LOGIN_SERVER_PORT: "",
                DEVICE_LOGGIN_BUFFER: "",
            },
            form2Rules: {
                DEVICE_MAC_NOTIFICATION_PERIOD: [
                    {
                        validator: (rules, value, callback) => {
                            if (value) {
                                if (!/^[0-9]\d*$/.test(value)) {
                                    callback(new Error("请填写数字"));
                                } else if (
                                    Number(value) < 1 ||
                                    Number(value) > 3600
                                ) {
                                    callback(new Error("范围为1～3600"));
                                } else {
                                    callback();
                                }
                            } else {
                                callback();
                            }
                        },
                        trigger: ["blur"],
                    }
                ],
                DEVICE_LOGIN_SERVER_HOST: [
                    {
                        validator: (rules, value, callback) => {
                            if (!this.form2.logServerEnabled) {
                                callback();
                                return;
                            }
                            if (!isValidIp(value)) {
                                callback(new Error("IP格式不正确"));
                            } else {
                                callback();
                            }
                        },
                        trigger: ["blur"],
                    },
                ],
                DEVICE_LOGIN_SERVER_PORT: [
                    {
                        validator: (rules, value, callback) => {
                            if (!this.form2.logServerEnabled) {
                                callback();
                                return;
                            }
                            if (!value) {
                                callback(new Error("请输入端口"));
                            } else if (!/^[1-9]\d*$/.test(value)) {
                                callback(new Error("端口格式不正确"));
                            } else if (
                                Number(value) < 1 ||
                                Number(value) > 65535
                            ) {
                                callback(new Error("端口范围为1～65535"));
                            } else {
                                callback();
                            }
                        },
                        trigger: ["blur"],
                    },
                ],
                DEVICE_LOGGIN_BUFFER: [
                    {
                        validator: (rules, value, callback) => {
                            if (!this.form2.logServerEnabled) {
                                callback();
                                return;
                            }
                            if (!value) {
                                callback(new Error("请输入Buffer大小"));
                            } else if (!/^[1-9]\d*$/.test(value)) {
                                callback(new Error("Buffer格式不正确"));
                            } else if (
                                Number(value) < 4096 ||
                                Number(value) > 1048576
                            ) {
                                callback(
                                    new Error("Buffer值范围为4096～1048576")
                                );
                            } else {
                                callback();
                            }
                        },
                        trigger: ["blur"],
                    },
                ],
            },

            cliVisible: false,
            preview: "",
            cli: "",
            cliTemp: "",
        };
    },
    computed: {
        isEdit() {
            return !!this.payload;
        },
    },
    methods: {
        getTempateData() {
            this.initLoading = true;
            this.$axios
                .get(`/api/vlan/customConfigTemplate/get/${this.payload.id}`)
                .then(({ data: { success, result, message } }) => {
                    if (success) {
                        this.priginConfigTemplate = result
                        this.cli = result.cli;
                        Object.keys(this.form1).forEach((e) => {
                            this.form1[e] = result[e];
                        });
                        Object.keys(this.form2).forEach((e) => {
                            if (
                                e === "DEVICE_FIBER_ENABLE" ||
                                e === "DEVICE_SERVICE_ENCRYPT"
                            ) {
                                this.form2[e] = result.baseMap[e] === "1";
                            } else {
                                this.form2[e] = result.baseMap[e];
                            }
                        });
                        if (
                            result.baseMap.DEVICE_LOGIN_SERVER_HOST ||
                            result.baseMap.DEVICE_LOGIN_SERVER_PORT ||
                            result.baseMap.DEVICE_LOGGIN_BUFFER
                        ) {
                            this.form2.logServerEnabled = true;
                        }
                        result.interfaces
                            .sort((a, b) => {
                                return (
                                    Number(a.DEVICE_INTERFACE_INDEX) -
                                    Number(b.DEVICE_INTERFACE_INDEX)
                                );
                            })
                            .forEach((e) => {
                                const target =
                                    e.DEVICE_INTERFACE_INDEX % 2 === 1
                                        ? this.upPorts
                                        : this.downPorts;
                                target.push({
                                    // ...e,
                                    DEVICE_STORM_CONTROL: e.DEVICE_STORM_CONTROL
                                        ? e.DEVICE_STORM_CONTROL.split(",")
                                        : [],
                                    DEVICE_MAC_NOTIFICATION_INT:
                                        e.DEVICE_MAC_NOTIFICATION_INT === "1",
                                    DEVICE_SWITCH_PORT:
                                        e.DEVICE_SWITCH_PORT === "1",
                                });
                            });
                    }
                })
                .finally(() => {
                    this.initLoading = false;
                });
        },
        go2AddTelent() {
            this.rjDialog
                .title("添加Telnet模板")
                .id("dialog_add_telnet")
                .width("650px")
                .currentView(addTelent, {})
                .showClose(true)
                .sizeTiny()
                .then((opt) => {
                    this.queryTelnetTmpl();
                })
                .show();
        },

        go2AddSnmp() {
            this.rjDialog
                .title("添加 SNMP 模板")
                .id("dialog_add_snmp")
                .width("650px")
                .currentView(addSnmp, {})
                .showClose(true)
                .sizeTiny()
                .then((opt) => {
                    this.querySnmpTmpl();
                })
                .show();
        },
        queryTelnetTmpl(tempData) {
            this.$axios
                .post("/api/vlan/syscfg/queryTelnetTmpl", {})
                .then((res) => {
                    if (res.data.success) {
                        this.telnets = res.data.data.rows;
                    } else {
                        throw res.data.message;
                    }
                })
                .catch((err) => {
                    this.$message({
                        message: err,
                        type: "error",
                    });
                });
        },
        querySnmpTmpl(tempData) {
            this.$axios
                .post("/api/vlan/syscfg/querySnmpTmplByName", {})
                .then((res) => {
                    if (res.data.success) {
                        this.snmps = res.data.data.rows;
                    } else {
                        throw res.data.message;
                    }
                })
                .catch((err) => {
                    this.$message({
                        message: err,
                        type: "error",
                    });
                });
        },
        onPortNumChange(portNum) {
            const newPortsNumPerRow = portNum / 2;
            if (this.upPorts.length < newPortsNumPerRow) {
                for (let i = this.upPorts.length; i < newPortsNumPerRow; i++) {
                    const upLabel = "" + (i * 2 + 1);
                    const downLabel = "" + (i * 2 + 2);
                    this.upPorts.push({
                        DEVICE_INTERFACE_INDEX: upLabel,
                        DEVICE_INTERFACE_TYPE: "access",
                        DEVICE_INTERFACE_VLAN_ID: "1",
                        DEVICE_MAC_NOTIFICATION_INT: true,
                        DEVICE_STORM_CONTROL: [],
                        DEVICE_POE_ENABLE: "2",
                        DEVICE_SWITCH_PORT: false,
                        DEVICE_POE_PORITY: "default",
                    });
                    this.downPorts.push({
                        DEVICE_INTERFACE_INDEX: downLabel,
                        DEVICE_INTERFACE_TYPE: "access",
                        DEVICE_INTERFACE_VLAN_ID: "1",
                        DEVICE_MAC_NOTIFICATION_INT: true,
                        DEVICE_STORM_CONTROL: [],
                        DEVICE_POE_ENABLE: "2",
                        DEVICE_SWITCH_PORT: false,
                        DEVICE_POE_PORITY: "default",
                    });
                }
            } else if (this.upPorts.length > newPortsNumPerRow) {
                this.upPorts.splice(newPortsNumPerRow);
                this.downPorts.splice(newPortsNumPerRow);
            }
        },
        setPorts(target, index, payload) {
            this.$set(target, index, JSON.parse(JSON.stringify(payload)));
        },
        goEditCli() {
            this.cliTemp = this.cli;
            this.cliVisible = true;
            const config = this.genConfig();
            this.$axios
                .post("/api/vlan/customConfigTemplate/viewConfig", config)
                .then(({ data: { success, data, message } }) => {
                    if (success) {
                        this.preview = data;
                    } else {
                        this.$message.error(message || "操作失败");
                    }
                });
        },
        getPreview() {
            this.cli = this.cliTemp;
            this.$message.success("保存成功");
            const config = this.genConfig();
            this.$axios
                .post("/api/vlan/customConfigTemplate/viewConfig", config)
                .then(({ data: { success, data, message } }) => {
                    if (success) {
                        this.preview = data;
                    } else {
                        this.$message.error(message || "操作失败");
                    }
                });
        },
        handleSaveBtnClick() {
            this.$refs.form1.validate((valid) => {
                if (!valid) {
                    this.$refs.form1.$el.scrollIntoView();
                    return;
                }
                this.$refs.form2.validate((valid) => {
                    if (!valid) {
                        this.tab = "2";
                        return;
                    }
                    const title = "是否保存配置模板？";
                    const message =
                        this.isEdit && this.payload.deviceNum && (this.priginConfigTemplate.telnetTmplId !== this.form1.telnetTmplId)
                            ? `保存后，将下发配置给关联该模板的 ${this.payload.deviceNum} 个设备。本次修订会导致设备重启，请在业务空闲时段操作。`
                            : "";
                    this.$confirm(message, title, {
                        confirmButtonText: "保存",
                        cancelButtonText: "取消",
                        type: "info",
                    })
                        .then(() => {
                            this.save();
                        })
                        .catch(() => {});
                });
            });
        },
        save() {
            const config = this.genConfig();
            let url = "/api/vlan/customConfigTemplate/";
            if (this.isEdit) {
                url += "update";
                config.id = this.payload.id;
            } else {
                url += "save";
            }
            this.$axios
                .post(url, config)
                .then(({ data: { success, data, message } }) => {
                    if (success) {
                        this.$message.success("保存成功");
                        this.$emit("saved");
                    } else {
                        this.$message.error(message || "操作失败");
                    }
                });
        },
        genConfig() {
            const ret = this.form1 
            ret.baseMap = {
                // ...this.form2,
                DEVICE_FIBER_ENABLE: this.form2.DEVICE_FIBER_ENABLE ? "1" : "0",
                DEVICE_SERVICE_ENCRYPT: this.form2.DEVICE_SERVICE_ENCRYPT
                    ? "1"
                    : "0",
            };
            if (!ret.baseMap.logServerEnabled) {
                ret.baseMap.DEVICE_LOGIN_SERVER_HOST = "";
                ret.baseMap.DEVICE_LOGIN_SERVER_PORT = "";
                ret.baseMap.DEVICE_LOGGIN_BUFFER = "";
            }
            delete ret.baseMap.logServerEnabled;
            ret.interfaces = this.upPorts.concat(this.downPorts).map((e) => {
                return {
                    // ...e,
                    DEVICE_STORM_CONTROL: e.DEVICE_STORM_CONTROL.join(","),
                    DEVICE_MAC_NOTIFICATION_INT: e.DEVICE_MAC_NOTIFICATION_INT
                        ? "1"
                        : "0",
                    DEVICE_SWITCH_PORT: e.DEVICE_SWITCH_PORT ? "1" : "0",
                };
            });
            ret.cli = this.cli;
            return ret;
        },
    },
    created() {
        this.queryTelnetTmpl();
        this.querySnmpTmpl();
        if (this.isEdit) {
            this.getTempateData();
        } else {
            this.form1.portNum = 18;
            this.onPortNumChange(18);
        }
    },
};
</script>

<style lang="scss">
.g-template-editor-tab1.g-template-editor-tab1.g-template-editor-tab1 {
    .el-tabs__active-bar {
        margin-left: 0;
    }
    .el-tabs__nav :nth-child(2) {
        margin-left: 0;
    }
}
</style>

<style lang="scss" scoped>
.theme-2b6afd {
    .__title {
        color: #212527;
        font-weight: bold;
    }
    .__form {
        background-color: #f7f9fc;
        padding-top: 24px;
        padding-left: 24px;
    }
    .__cli-label {
        color: #212527;
    }
}
</style>
<style lang="scss">
.theme-2b6afd {
    .__preview textarea {
        background: #f7f9fc;
        border-radius: 12px;
    }
    .g__preview-1 textarea {
        background: #fff;
        border-radius: 12px;
    }
}
</style>
