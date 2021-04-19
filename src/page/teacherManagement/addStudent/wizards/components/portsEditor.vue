<template>
    <div>
        <div
            style="
                display: flex;
                margin-bottom: 10px;
                justify-content: space-between;
                align-items: center;
            "
        >
            <div style="display: flex">
                <div>
                    <div
                        class="port-access port-access__up"
                        style="vertical-align: middle"
                    ></div>
                    <span
                        class="__label"
                        style="vertical-align: middle; margin-left: 8px"
                        >Access口</span
                    >
                </div>
                <div style="margin-left: 30px">
                    <div
                        class="port-trunk port-trunk__up"
                        style="vertical-align: middle"
                    ></div>
                    <span
                        class="__label"
                        style="vertical-align: middle; margin-left: 8px"
                        >Trunk口</span
                    >
                </div>
            </div>

            <div style="display: flex; align-items: center" v-if="upLink">
                <div style="display: flex; align-items: center">
                    <img
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFbSURBVHgBnVI7boNAEIUF+VNwALu1lBTcIJUPkFAg8bOouYaTO6TBNbILEAVOlTs4VYREDoAPgAtACPJGArKiiKKMNJrZ+e6bGVHgSNM0ZblcOl3Xrdq2FXtzwRhTmqbx4zi+DrGDU7As6xEJ92VZHpIkKfiCruuu6rreSZKUn0CjwzRNxzAMb9qdmLdRDDUgXdJ1fYWvPIRh+MonLRYLX5blp81m855lWU32NE0vqqqS7ZPB6c1msyNfGUl7iDtiYN7zPoIyn88dBv0WBMEI2rZtCtwOb+DeAsrz8Cb8oiiuKVHhv4hpfkDNuSZf4MsUr8w/+mme+wmv+44F8J+FCTHhf1QwVMyn3/iNaAsQCquq6oQpen9NxOp22ILP+illwDUm40IOEC/E0MdLoRgk5rSF8eToeiDWuMkjf5NEBAVdqHAWRdEb2UQ+oL9JCrgJP2vCGLorQeJv+BvvSJta+jxzywAAAABJRU5ErkJggg=="
                        alt=""
                    />
                    <span style="margin-left: 5px">上联口</span>
                </div>
                <div
                    style="
                        display: flex;
                        align-items: center;
                        margin-left: 10px;
                    "
                >
                    <img
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAALCAYAAABLcGxfAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABPSURBVHgB5ZE7DQAhEESHy6lABkKQgQ4EoAYh9CAAHUwFCd9Q85LX7GZ2ixFoeBowR1HdDy3W1N1PHU00bgKZGipPl4dPHy55MiCwb7hHFZonCWqMFtqfAAAAAElFTkSuQmCC"
                        alt=""
                    />
                    <span style="margin-left: 5px">电口</span>
                </div>
            </div>
        </div>

        <div class="__pd__u_31" v-drag-select>
            <div
                style="display: inline-block; margin-right: 3px"
                v-for="item in myUpPorts.length"
                :key="item"
            >
                <div
                    class="port-wrapper"
                    data-direction="up"
                    :data-index="item - 1"
                    :class="{
                        'port-wrapper__selected': isPortSelected(
                            myUpPorts[item - 1]
                        ),
                    }"
                    @click="() => onTogglePort(myUpPorts[item - 1])"
                >
                    <div>
                        <span class="__pd__u_38">{{
                            myUpPorts[item - 1].DEVICE_INTERFACE_INDEX
                        }}</span>
                    </div>
                    <div
                        :class="`port-${myUpPorts[
                            item - 1
                        ].DEVICE_INTERFACE_TYPE.toLowerCase()} port-${myUpPorts[
                            item - 1
                        ].DEVICE_INTERFACE_TYPE.toLowerCase()}__up${
                            Number(upLink) ===
                            Number(myUpPorts[item - 1].DEVICE_INTERFACE_INDEX)
                                ? ' port-nbr'
                                : ''
                        }`"
                    ></div>
                </div>

                <div
                    class="port-wrapper"
                    data-direction="down"
                    :data-index="item - 1"
                    :class="{
                        'port-wrapper__selected': isPortSelected(
                            myDownPorts[item - 1]
                        ),
                    }"
                    @click="() => onTogglePort(myDownPorts[item - 1])"
                >
                    <div
                        :class="`port-${myDownPorts[
                            item - 1
                        ].DEVICE_INTERFACE_TYPE.toLowerCase()} port-${myDownPorts[
                            item - 1
                        ].DEVICE_INTERFACE_TYPE.toLowerCase()}__down${
                            Number(upLink) ===
                            Number(myDownPorts[item - 1].DEVICE_INTERFACE_INDEX)
                                ? ' port-nbr'
                                : ''
                        }`"
                    ></div>
                    <div>
                        <span class="__pd__u_43">{{
                            myDownPorts[item - 1].DEVICE_INTERFACE_INDEX
                        }}</span>
                    </div>
                </div>
            </div>
        </div>

        <div
            style="
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                margin-top: 10px;
            "
        >
            <span class="__tip">
                <i class="el-icon-info" style="margin-right: 3px"></i>
                请先选择要设置的端口，可框选多个
                <template v-if="this.upLink"
                    >（注：为避免设备断网，上联口禁止操作）</template
                >
            </span>
            <div>
                <el-button
                    id="qa-test-select-all"
                    type="text"
                    @click="selectAll"
                    >全选</el-button
                >
                <el-button
                    type="text"
                    style="margin-left: 24px"
                    @click="unselectAll"
                    id="qa-test-cancel-select"
                    >取消所有选中</el-button
                >
            </div>
        </div>

        <div style="margin-top: 50px">
            <div
                style="
                    display: flex;
                    flex-direction: row;
                    align-items: flex-start;
                "
            >
                <div class="__legend" style="white-space: nowrap">端口配置</div>
                <div style="margin-left: 9px; margin-top: -7px">
                    <div v-if="selectedPorts.length" class="__selected">
                        <span style="vertical-align: middle">已选:</span>
                        <span
                            v-for="port in selectedPorts"
                            :key="port.DEVICE_INTERFACE_INDEX"
                            style="vertical-align: middle"
                            :class="`port__with-label port-${port.DEVICE_INTERFACE_TYPE.toLowerCase()} port-${port.DEVICE_INTERFACE_TYPE.toLowerCase()}__${
                                port.DEVICE_INTERFACE_INDEX % 2 === 1
                                    ? 'up'
                                    : 'down'
                            }`"
                        >
                            {{ port.DEVICE_INTERFACE_INDEX }}
                        </span>
                    </div>
                </div>
            </div>
            <div class="__port-setter">
                <div
                    v-if="!selectedPorts.length"
                    style="
                        height: 100px;
                        text-align: center;
                        line-height: 100px;
                    "
                >
                    <i
                        class="el-icon-info"
                        style="color: rgb(124 188 253); margin-right: 3px"
                    ></i>
                    请先在设备面板上选择要设置的端口
                </div>
                <div v-else style="padding: 0 20px">
                    <el-form
                        :rules="rules"
                        :model="form"
                        :inline="true"
                        label-width="120px"
                        label-position="left"
                        ref="form"
                    >
                        <div>
                            <el-form-item
                                label="端口类型"
                                prop="DEVICE_INTERFACE_TYPE"
                            >
                                <el-select
                                    id="qa-test-port-type"
                                    v-model="form.DEVICE_INTERFACE_TYPE"
                                >
                                    <el-option
                                        label="Access"
                                        value="access"
                                        id="qa-test-port-type-Access"
                                    ></el-option>
                                    <el-option
                                        label="Trunk"
                                        value="trunk"
                                        id="qa-test-port-type-Trunk"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div>
                            <el-form-item
                                label="VLAN ID"
                                prop="DEVICE_INTERFACE_VLAN_ID"
                                v-if="form.DEVICE_INTERFACE_TYPE === 'access'"
                            >
                                <el-input
                                    v-model.trim="form.DEVICE_INTERFACE_VLAN_ID"
                                    placeholder="请输入1-4094之间的整数"
                                    style="width: 192px"
                                    id="qa-test-vlanNumber"
                                ></el-input>
                            </el-form-item>
                        </div>
                        <div>
                            <el-form-item
                                label="Native Vlan"
                                prop="DEVICE_INTERFACE_NATIVE_ID"
                                v-if="form.DEVICE_INTERFACE_TYPE === 'trunk'"
                            >
                                <el-input
                                    v-model.trim="
                                        form.DEVICE_INTERFACE_NATIVE_ID
                                    "
                                    placeholder="请输入1-4094之间的整数"
                                    style="width: 192px"
                                ></el-input>
                            </el-form-item>
                        </div>
                        <div>
                            <el-form-item
                                label="Allowed Vlan"
                                prop="DEVICE_INTERFACE_ALLOWED_VLAN"
                                v-if="form.DEVICE_INTERFACE_TYPE === 'trunk'"
                            >
                                <el-input
                                    v-model.trim="
                                        form.DEVICE_INTERFACE_ALLOWED_VLAN
                                    "
                                    placeholder="格式如: 1,2,5-8,21,4094"
                                    style="width: 192px"
                                ></el-input>
                            </el-form-item>
                        </div>
                        <div style="margin-bottom: 22px">
                            <span
                                class="__advanced"
                                @click="
                                    advancedConfigVisible = !advancedConfigVisible
                                "
                                id="qa-test-setting-advanced"
                            >
                                <i
                                    :class="`el-icon-arrow-${
                                        advancedConfigVisible ? 'up' : 'down'
                                    }`"
                                    style="margin-right: 12px"
                                ></i
                                >高级设置
                            </span>
                        </div>
                        <el-collapse-transition>
                            <div v-show="advancedConfigVisible">
                                <div>
                                    <el-form-item
                                        label="MAC地址通告"
                                        prop="DEVICE_MAC_NOTIFICATION_INT"
                                    >
                                        <el-checkbox
                                            v-model="
                                                form.DEVICE_MAC_NOTIFICATION_INT
                                            "
                                            id="qa-test-mac-switch"
                                            >开启</el-checkbox
                                        >
                                    </el-form-item>
                                </div>
                                <div>
                                    <el-form-item
                                        label="风暴抑制开关"
                                        prop="DEVICE_STORM_CONTROL"
                                    >
                                        <el-checkbox-group
                                            v-model="form.DEVICE_STORM_CONTROL"
                                        >
                                            <el-checkbox
                                                label="3"
                                                id="qa-test-single-switch"
                                                >单播</el-checkbox
                                            >
                                            <el-checkbox
                                                label="2"
                                                id="qa-test-multi-switch"
                                                >多播</el-checkbox
                                            >
                                            <el-checkbox
                                                label="1"
                                                id="qa-test-broadcast-switch"
                                                >广播</el-checkbox
                                            >
                                        </el-checkbox-group>
                                    </el-form-item>
                                </div>
                                <div>
                                    <el-form-item
                                        label="POE开关"
                                        prop="DEVICE_POE_ENABLE"
                                    >
                                        <el-select
                                            v-model="form.DEVICE_POE_ENABLE"
                                            id="qa-test-isolate-switch"
                                        >
                                            <el-option
                                                label="默认（开启）"
                                                value="2"
                                                id="qa-test-isolate-switch-2"
                                            ></el-option>
                                            <el-option
                                                label="开启"
                                                value="1"
                                                id="qa-test-isolate-switch-1"
                                            ></el-option>
                                            <el-option
                                                label="关闭"
                                                value="0"
                                                id="qa-test-isolate-switch-0"
                                            ></el-option>
                                        </el-select>
                                        <el-tooltip
                                            content="可选择“默认/开启/关闭”，默认指出厂配置（开启）"
                                        >
                                            <i
                                                class="el-icon-info __tip"
                                                style="
                                                    margin-right: 3px;
                                                    margin-left: 3px;
                                                "
                                            ></i>
                                        </el-tooltip>
                                    </el-form-item>
                                </div>
                                <div>
                                    <el-form-item
                                        label="端口隔离开关"
                                        prop="DEVICE_SWITCH_PORT"
                                    >
                                        <el-checkbox
                                            v-model="form.DEVICE_SWITCH_PORT"
                                            id="qa-test-isolate-switch"
                                            >开启</el-checkbox
                                        >
                                        <el-tooltip
                                            content="室内交换机可能会有广播需求，因此默认关闭"
                                        >
                                            <i
                                                class="el-icon-info __tip"
                                                style="
                                                    margin-right: 3px;
                                                    margin-left: 3px;
                                                "
                                            ></i>
                                        </el-tooltip>
                                    </el-form-item>
                                </div>
                                <div>
                                    <el-form-item
                                        label="POE供电优先级"
                                        prop="DEVICE_POE_PORITY"
                                    >
                                        <el-select
                                            v-model="form.DEVICE_POE_PORITY"
                                            id="qa-test-poepriority"
                                        >
                                            <el-option
                                                label="默认（Low）"
                                                value="default"
                                                id="qa-test-poepriority-default"
                                            ></el-option>
                                            <el-option
                                                label="Critical"
                                                value="critical"
                                                id="qa-test-poepriority-critical"
                                            ></el-option>
                                            <el-option
                                                label="High"
                                                value="high"
                                                id="qa-test-poepriority-high"
                                            ></el-option>
                                            <el-option
                                                label="Low"
                                                value="low"
                                                id="qa-test-poepriority-low"
                                            ></el-option>
                                        </el-select>
                                        <el-tooltip
                                            content="可选择“默认/Ctitical/High/Low”，默认指出厂配置（Low）"
                                        >
                                            <i
                                                class="el-icon-info __tip"
                                                style="
                                                    margin-right: 3px;
                                                    margin-left: 3px;
                                                "
                                            ></i>
                                        </el-tooltip>
                                    </el-form-item>
                                </div>
                            </div>
                        </el-collapse-transition>
                        <el-form-item label=" ">
                            <el-button
                                type="primary"
                                @click="confirm"
                                style="width: 100px"
                                id="qa-test-port-btnyes"
                                :disabled="!hasMutation"
                                >确定</el-button
                            >
                            <span class="__tip">
                                <i
                                    class="el-icon-info"
                                    style="margin-right: 3px; margin-left: 3px"
                                ></i>
                                对端口操作进行确认
                            </span>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
        <div>
            <div>
                <div
                    class="__legend"
                    style="margin-top: 48px; margin-bottom: 20px"
                >
                    端口列表
                </div>
                <div>
                    <el-table
                        :data="portsList"
                        size="mini"
                        :max-height="300"
                        style="padding: 0 20px"
                    >
                        <el-table-column label="端口名称" width="100px">
                            <template slot-scope="scope">
                                <span v-if="scope.$index < portsList.length - mgPortNums">Gi</span>
                                <span v-else>Mg</span>0/{{
                                    scope.row.DEVICE_INTERFACE_INDEX
                                }}</template
                            >
                        </el-table-column>
                        <el-table-column label="端口类型" width="100px">
                            <template slot-scope="scope">{{
                                scope.row.DEVICE_INTERFACE_TYPE
                            }}</template>
                        </el-table-column>
                        <el-table-column label="VLAN">
                            <template slot-scope="scope">
                                <template
                                    v-if="
                                        scope.row.DEVICE_INTERFACE_TYPE ===
                                        'access'
                                    "
                                >
                                    {{ scope.row.DEVICE_INTERFACE_VLAN_ID }}
                                </template>
                                <template v-else>
                                    Native Vlan:
                                    {{
                                        scope.row.DEVICE_INTERFACE_NATIVE_ID
                                    }}&emsp;Allowed Vlan:
                                    {{
                                        scope.row.DEVICE_INTERFACE_ALLOWED_VLAN
                                    }}
                                </template>
                            </template>
                        </el-table-column>
                        <el-table-column label="MAC地址通告">
                            <template slot-scope="scope">{{
                                scope.row.DEVICE_MAC_NOTIFICATION_INT
                                    ? "开启"
                                    : "关闭"
                            }}</template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {
    isValidVlanId,
    isValidVlanIdAndRangeGroup,
    hasConflictVlanId,
} from "../../utils/validate";
export default {
    props: {
        upPorts: {},
        downPorts: {},
        upLink: {}, // 上联口
        mgPortNums: { // 百兆口数量
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            hasMutation: false,
            advancedConfigVisible: false,
            myUpPorts: [],
            myDownPorts: [],
            form: {
                DEVICE_INTERFACE_TYPE: "",
                DEVICE_INTERFACE_NATIVE_ID: "",
                DEVICE_INTERFACE_ALLOWED_VLAN: "",
                DEVICE_INTERFACE_VLAN_ID: "",
                DEVICE_MAC_NOTIFICATION_INT: true,
                DEVICE_STORM_CONTROL: [],
                DEVICE_POE_ENABLE: "2",
                DEVICE_SWITCH_PORT: false,
                DEVICE_POE_PORITY: "default",
            },
            rules: {
                DEVICE_INTERFACE_TYPE: [
                    {
                        required: true,
                        message: "请选择端口类型",
                        trigger: [],
                    },
                ],
                DEVICE_INTERFACE_NATIVE_ID: [
                    {
                        required: true,
                        message: "请输入Native Vlan",
                    },
                    {
                        validator(rule, value, callback) {
                            if (!isValidVlanId(value)) {
                                callback(new Error("请输入1-4094之间的整数"));
                            } else {
                                callback();
                            }
                        },
                    },
                ],
                DEVICE_INTERFACE_ALLOWED_VLAN: [
                    {
                        required: true,
                        message: "请输入Allowed Vlan",
                    },
                    {
                        validator(rule, value, callback) {
                            if (!isValidVlanIdAndRangeGroup(value)) {
                                callback(
                                    new Error(
                                        "格式不正确，格式如: 1,2,5-8,21,4094"
                                    )
                                );
                            } else if (hasConflictVlanId(value)) {
                                callback(new Error("存在重复的vlan，请检查"));
                            } else {
                                callback();
                            }
                        },
                    },
                ],
                DEVICE_INTERFACE_VLAN_ID: [
                    {
                        required: true,
                        message: "请输入VLAN ID",
                    },
                    {
                        validator(rule, value, callback) {
                            if (!isValidVlanId(value)) {
                                callback(new Error("请输入1-4094之间的整数"));
                            } else {
                                callback();
                            }
                        },
                    },
                ],
            },
        };
    },
    computed: {
        selectedUpPorts() {
            return this.myUpPorts.filter((e) => this.isPortSelected(e));
        },
        selectedDownPorts() {
            return this.myDownPorts.filter((e) => this.isPortSelected(e));
        },
        selectedPorts() {
            return this.selectedUpPorts
                .concat(this.selectedDownPorts)
                .sort(
                    (a, b) =>
                        Number(a.DEVICE_INTERFACE_INDEX) -
                        Number(b.DEVICE_INTERFACE_INDEX)
                );
        },
        portsList() {
            return this.myUpPorts
                .concat(this.myDownPorts)
                .sort(
                    (a, b) =>
                        Number(a.DEVICE_INTERFACE_INDEX) -
                        Number(b.DEVICE_INTERFACE_INDEX)
                );
        },
    },
    watch: {
        form: {
            deep: true,
            handler() {
                this.hasMutation = true;
            },
        },
        upPorts: {
            immediate: true,
            deep: true,
            handler() {
                this.syncPorts();
            },
        },
        downPorts: {
            immediate: true,
            deep: true,
            handler() {
                this.syncPorts();
            },
        },
    },
    methods: {
        selectAll() {
            this.portsList.forEach((e) => {
                this.onTogglePort(e, true);
            });
        },
        unselectAll() {
            this.selectedPorts.forEach((e) => {
                this.onTogglePort(e, false);
            });
        },
        syncPorts() {
            this.myUpPorts = JSON.parse(JSON.stringify(this.upPorts));
            this.myDownPorts = JSON.parse(JSON.stringify(this.downPorts));
        },
        isPortAccess(port) {
            return port.DEVICE_INTERFACE_TYPE === "access";
        },
        isPortTrunk(port) {
            return port.DEVICE_INTERFACE_TYPE === "trunk";
        },
        isPortSelected(port) {
            return port.selected;
        },
        onTogglePort(port, value) {
            if (
                this.upLink &&
                Number(port.DEVICE_INTERFACE_INDEX) === Number(this.upLink)
            ) {
                //上联口不让选中
                return;
            }
            if (value !== undefined) {
                this.$set(port, "selected", value);
            } else if (this.isPortSelected(port)) {
                this.$set(port, "selected", false);
            } else {
                this.$set(port, "selected", true);
            }

            const isSameProps =
                this.selectedPorts.length > 1 &&
                !this.selectedPorts
                    .slice(1, this.selectedPorts.length)
                    .some((e) => {
                        return (
                            e.DEVICE_INTERFACE_TYPE !==
                                this.selectedPorts[0].DEVICE_INTERFACE_TYPE ||
                            e.DEVICE_INTERFACE_VLAN_ID !==
                                this.selectedPorts[0]
                                    .DEVICE_INTERFACE_VLAN_ID ||
                            e.DEVICE_INTERFACE_NATIVE_ID !==
                                this.selectedPorts[0]
                                    .DEVICE_INTERFACE_NATIVE_ID ||
                            e.DEVICE_INTERFACE_ALLOWED_VLAN !==
                                this.selectedPorts[0]
                                    .DEVICE_INTERFACE_ALLOWED_VLAN ||
                            e.DEVICE_MAC_NOTIFICATION_INT !==
                                this.selectedPorts[0]
                                    .DEVICE_MAC_NOTIFICATION_INT ||
                            JSON.stringify(e.DEVICE_STORM_CONTROL) !==
                                JSON.stringify(
                                    this.selectedPorts[0].DEVICE_STORM_CONTROL
                                ) ||
                            e.DEVICE_POE_ENABLE !==
                                this.selectedPorts[0].DEVICE_POE_ENABLE ||
                            e.DEVICE_SWITCH_PORT !==
                                this.selectedPorts[0].DEVICE_SWITCH_PORT ||
                            e.DEVICE_POE_PORITY !==
                                this.selectedPorts[0].DEVICE_POE_PORITY
                        );
                    });
            if (this.selectedPorts.length === 1 || isSameProps) {
                const target = this.selectedPorts[0];
                this.$set(
                    this.form,
                    "DEVICE_INTERFACE_TYPE",
                    target.DEVICE_INTERFACE_TYPE
                );
                this.$set(
                    this.form,
                    "DEVICE_INTERFACE_VLAN_ID",
                    target.DEVICE_INTERFACE_VLAN_ID
                );
                this.$set(
                    this.form,
                    "DEVICE_INTERFACE_NATIVE_ID",
                    target.DEVICE_INTERFACE_NATIVE_ID
                );
                this.$set(
                    this.form,
                    "DEVICE_INTERFACE_ALLOWED_VLAN",
                    target.DEVICE_INTERFACE_ALLOWED_VLAN
                );
                this.$set(
                    this.form,
                    "DEVICE_MAC_NOTIFICATION_INT",
                    target.DEVICE_MAC_NOTIFICATION_INT
                );
                this.$set(this.form, "DEVICE_STORM_CONTROL", [
                    ...target.DEVICE_STORM_CONTROL,
                ]);
                this.$set(
                    this.form,
                    "DEVICE_POE_ENABLE",
                    target.DEVICE_POE_ENABLE
                );
                this.$set(
                    this.form,
                    "DEVICE_SWITCH_PORT",
                    target.DEVICE_SWITCH_PORT
                );
                this.$set(
                    this.form,
                    "DEVICE_POE_PORITY",
                    target.DEVICE_POE_PORITY
                );
            } else {
                this.resetForm();
            }

            this.$nextTick(() => {
                this.hasMutation = false;
            });
        },
        reset() {
            this.syncPorts();
            this.resetForm();
        },
        resetForm() {
            this.form = JSON.parse(JSON.stringify(this.$options.data().form));
        },
        confirm() {
            this.$refs.form.validate().then(() => {
                const payload = {
                    DEVICE_INTERFACE_TYPE: this.form.DEVICE_INTERFACE_TYPE,
                    DEVICE_MAC_NOTIFICATION_INT: this.form
                        .DEVICE_MAC_NOTIFICATION_INT,
                    DEVICE_STORM_CONTROL: [...this.form.DEVICE_STORM_CONTROL],
                    DEVICE_POE_ENABLE: this.form.DEVICE_POE_ENABLE,
                    DEVICE_SWITCH_PORT: this.form.DEVICE_SWITCH_PORT,
                    DEVICE_POE_PORITY: this.form.DEVICE_POE_PORITY,
                };
                if (payload.DEVICE_INTERFACE_TYPE === "access") {
                    payload.DEVICE_INTERFACE_VLAN_ID = this.form.DEVICE_INTERFACE_VLAN_ID;
                } else {
                    payload.DEVICE_INTERFACE_NATIVE_ID = this.form.DEVICE_INTERFACE_NATIVE_ID;
                    payload.DEVICE_INTERFACE_ALLOWED_VLAN = this.form.DEVICE_INTERFACE_ALLOWED_VLAN;
                }

                const selectedUpIndexArray = [];
                const selectedDownIndexArray = [];
                this.selectedUpPorts.forEach((port) => {
                    selectedUpIndexArray.push(port.DEVICE_INTERFACE_INDEX);
                    this.$emit("up-change", {
                        index: (Number(port.DEVICE_INTERFACE_INDEX) - 1) / 2,
                        payload: {
                            DEVICE_INTERFACE_INDEX: port.DEVICE_INTERFACE_INDEX,
                            // ...payload,
                        },
                    });
                });
                this.selectedDownPorts.forEach((port) => {
                    selectedDownIndexArray.push(port.DEVICE_INTERFACE_INDEX);
                    this.$emit("down-change", {
                        index: (Number(port.DEVICE_INTERFACE_INDEX) - 2) / 2,
                        payload: {
                            DEVICE_INTERFACE_INDEX: port.DEVICE_INTERFACE_INDEX,
                            // ...payload,
                        },
                    });
                });
                this.$nextTick(() => {
                    
                    this.myUpPorts.forEach((e) => {
                        if (
                            !!~selectedUpIndexArray.indexOf(e.DEVICE_INTERFACE_INDEX)
                        ) {
                            console.log(1);
                            this.$set(e, 'selected', true);
                        }
                    });
                    this.myDownPorts.forEach((e) => {
                        if (
                            !!~selectedDownIndexArray.indexOf(e.DEVICE_INTERFACE_INDEX)
                        ) {
                            this.$set(e, 'selected', true);
                        }
                    });
                });
                this.hasMutation = false;
                this.$message.success("已确认");
            });
        },
    },
    mounted() {
        this.syncPorts();
    },
    directives: {
        dragSelect: (function () {
            const body = document.body;
            function pageX2TargetX(pageX, target) {
                const rect = target.getBoundingClientRect();
                const x = pageX - rect.x;
                // 确保在target容器内部
                return Math.min(rect.width, Math.max(0, x));
            }
            function pageY2TargetY(pageY, target) {
                const rect = target.getBoundingClientRect();
                const y = pageY - rect.y;
                // 确保在target容器内部
                return Math.min(rect.height, Math.max(0, y));
            }
            return {
                bind(el, binding, vNode) {
                    let startX = 0;
                    let startY = 0;
                    let endX = 0;
                    let endY = 0;
                    let moveStarted = false;
                    const helperEl = document.createElement("div");
                    helperEl.style.position = "absolute";
                    helperEl.style.boxSizing = "border-box";
                    helperEl.style.backgroundColor = "rgba(255, 255, 255, .1)";

                    function onMousemove(ev) {
                        let X = pageX2TargetX(ev.pageX, el);
                        let Y = pageY2TargetY(ev.pageY, el);

                        // 忽略幅度过小的移动操作
                        if (
                            !moveStarted &&
                            Math.abs(X - startX) < 5 &&
                            Math.abs(Y - startY) < 5
                        ) {
                            return;
                        }

                        moveStarted = true;
                        endX = X;
                        endY = Y;
                        helperEl.style.border =
                            "1px solid rgba(2, 109, 247, 0.3";
                        if (endX >= startX) {
                            helperEl.style.left = `${startX}px`;
                            helperEl.style.width = `${endX - startX}px`;
                        } else {
                            helperEl.style.left = `${endX}px`;
                            helperEl.style.width = `${startX - endX}px`;
                        }
                        if (endY >= startY) {
                            helperEl.style.top = `${startY}px`;
                            helperEl.style.height = `${endY - startY}px`;
                        } else {
                            helperEl.style.top = `${endY}px`;
                            helperEl.style.height = `${startY - endY}px`;
                        }
                        ev.preventDefault();
                    }

                    function onMouseup(ev) {
                        if (moveStarted) {
                            [].forEach.call(
                                el.querySelectorAll(".port-wrapper"),
                                (portEl) => {
                                    const rect = portEl.getBoundingClientRect();
                                    const centerX = pageX2TargetX(
                                        rect.left + rect.width / 2,
                                        el
                                    );
                                    const centerY = pageY2TargetY(
                                        rect.top + rect.height / 2,
                                        el
                                    );
                                    if (
                                        centerX >= Math.min(startX, endX) &&
                                        centerX <= Math.max(startX, endX) &&
                                        centerY >= Math.min(startY, endY) &&
                                        centerY <= Math.max(startY, endY)
                                    ) {
                                        const direction =
                                            portEl.dataset.direction;
                                        const index = Number(
                                            portEl.dataset.index
                                        );
                                        const _this = vNode.context;
                                        const port =
                                            direction === "up"
                                                ? _this.myUpPorts[index]
                                                : _this.myDownPorts[index];
                                        _this.onTogglePort(port, true);
                                    }
                                }
                            );
                        }
                        helperEl.style.width = "0px";
                        helperEl.style.height = "0px";
                        helperEl.style.border = "none";
                        startX = 0;
                        startY = 0;
                        endX = 0;
                        endY = 0;
                        moveStarted = false;
                        body.removeEventListener("mousemove", onMousemove);
                        body.removeEventListener("mouseup", onMouseup);
                    }

                    el.style.position = "relative";
                    el.insertAdjacentElement("afterbegin", helperEl);
                    el.addEventListener("mousedown", function (ev) {
                        startX = pageX2TargetX(ev.pageX, el);
                        startY = pageY2TargetY(ev.pageY, el);
                        helperEl.style.left = `${startX}px`;
                        helperEl.style.top = `${startY}px`;
                        body.addEventListener("mousemove", onMousemove);
                        body.addEventListener("mouseup", onMouseup);
                    });
                },
            };
        })(),
    },
};
</script>

<style lang="scss">
.port-access,
.port-trunk {
    display: inline-block;
    width: 24px;
    height: 24px;
    box-sizing: border-box;
    background-position: center center;
    background-size: 100% 100%;
}
.port__with-label {
    width: 32px;
    height: 32px;
    font-size: 12px;
    line-height: 38px;
    text-align: center;
    color: #fff;
    transform: scale(0.75);
    box-sizing: border-box;
    &.port-access {
        &__down {
            line-height: 30px;
        }
    }
    &.port-trunk {
        padding-right: 5px;
        line-height: 34px;
        &__down {
            line-height: 30px;
        }
    }
}
.port-access {
    &__up {
        background-image: url("/static/vlan-img/port-access-up.png");
    }
    &__down {
        background-image: url("/static/vlan-img/port-access-down.png");
    }
}
.port-trunk {
    &__up {
        background-image: url("/static/vlan-img/port-trunk-up.png");
    }
    &__down {
        background-image: url("/static/vlan-img/port-trunk-down.png");
    }
}
.port-nbr {
    position: relative;
    &::before {
        content: "";
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -6px;
        margin-top: -6px;
        width: 12px;
        height: 12px;
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADsSURBVHgBjVHtjcIwDLUDJ4F00h0bMMKN0FG6wa3ABrABbAJMAhsAouC2xDF21UJS+MGTIsXPH895QWghIr+lD//CYYLO/RgXmNGB24zHwxXEIKIp1X5NdMugh2eOpk9SCVPo4qKo/+x08UFzj5qCfB53W+G18odST9xk6he6zXQ6LxP5indUeWnPLh5W1jx38b4MXxmg7B8Egt6V6/LMk6ThW90ILNsutnvfISchnOBDuMFAHAocz2/s7KN5i6knljUJdc18b7z3uXHS1iTdL5/TwtTjHKayPg8QMtu1mazvs5VHo+ECEY/G3QFiZ89MeXuDZgAAAABJRU5ErkJggg==");
        background-size: 100% 100%;
    }
}
.port-wrapper {
    text-align: center;
    padding: 2px 6px;
    margin: 2px 0;
    cursor: pointer;
    border: 1px solid transparent;
    &__selected {
        background-color: #1b3852;
    }
}
.__pd__u_31 {
    border: 1px solid #3e4a5f;
}
.my-head {
    border-bottom: 1px solid #3e4a5f;
}
</style>
<style lang="scss" scoped>
.theme-2b6afd {
    .__pd__u_31 {
        background-color: #f7f9fc;
        border: 1px solid #e3e5ea;
        border-radius: 12px;
        padding: 11px 26px;
    }
    .my-head {
        border-bottom: 1px solid #f0f0f0;
    }
    .port-wrapper__selected {
        background: #f3faff;
        border: 1px solid rgba(2, 109, 247, 0.3);
        box-sizing: border-box;
        border-radius: 2px;
    }
    .__label {
        font-size: 12px;
        color: rgba(142, 153, 160, 0.85);
    }
    .__tip {
        font-size: 12px;
        color: rgba(142, 153, 160, 0.85);
    }
    .__legend {
        position: relative;
        font-size: 16px;
        line-height: 20px;
        color: #505a60;
        padding-left: 10px;
        font-weight: bold;
        &::before {
            position: absolute;
            content: "";
            top: 50%;
            left: 0;
            margin-top: -6px;
            height: 12px;
            width: 2px;
            border-radius: 1px;
            background-color: #006eff;
        }
    }
    .__selected {
        color: #8e99a0;
    }
    .__port-setter {
        margin-top: 24px;
        background: #f7f9fc;
        border: 1px solid #f0f0f0;
        box-sizing: border-box;
        border-radius: 8px;
        padding: 24px;
    }
    .__advanced {
        cursor: pointer;
        &:hover {
            color: #2b6afd;
        }
    }
}
</style>
