<template>
    <div>
        <el-card class="__p_12p_u_12">
            <div style="padding: 12px">
                <div class="__p_12p_u_16">
                    <span class="__p_12p_u_13">绑定方式</span>
                    <el-popover trigger="hover">
                        <i
                            class="el-icon-question __p_12p_u_14"
                            slot="reference"
                        ></i>
                        <div style="font-size: 12px">
                            模板绑定优先级为：基于SN绑定>基于汇聚设备。<br />
                            1. 批量绑定/单台绑定：适用于能够获取设备SN的场景。
                            <br />
                            2.
                            基于汇聚/汇聚端口绑定：适用于明确汇聚/汇聚端口所管辖区域的场景。
                        </div>
                    </el-popover>
                </div>
                <div class="__p_12p_u_48">
                    <div class="__p_12p_u_65">
                        <div class="__p_12p_u_94" v-if="currentView === 1">
                            <el-button type="text" round class="__p_12p_u_95"
                                >批量绑定 / 单台绑定</el-button
                            >
                        </div>
                        <div
                            class="__p_12p_u_68"
                            v-else
                            @click="handleExcelTabClick"
                        >
                            <span>批量绑定 / 单台绑定</span>
                        </div>

                        <div class="__p_12p_u_94" v-if="currentView === 2">
                            <el-button type="text" round class="__p_12p_u_95"
                                >基于汇聚绑定</el-button
                            >
                        </div>
                        <div
                            class="__p_12p_u_68"
                            v-else
                            @click="currentView = 2"
                        >
                            基于汇聚绑定
                        </div>

                        <!-- <div class="__p_12p_u_113">
                        <span class="__p_12p_u_114">基于汇聚端口绑定</span>
                        <div class="__p_12p_u_130">
                            <span class="__p_12p_u_131">自动</span>
                        </div>
                    </div>
                    <div class="__p_12p_u_117">
                        <span class="__p_12p_u_118">基于全局绑定</span>
                        <div class="__p_12p_u_119">
                            <span class="__p_12p_u_120">自动</span>
                        </div>
                    </div>
                    <div class="__p_12p_u_121">
                        <span class="__p_12p_u_122">小程序绑定</span>
                        <div class="__p_12p_u_123">
                            <span class="__p_12p_u_124">自动</span>
                        </div>
                    </div> -->
                    </div>
                    <div class="__p_12p_u_89">
                        <template v-if="currentView === 1">
                            <div class="bind-tip-wapper">
                                <i class="el-icon-question __p_12p_u_14"></i
                                ><span class="__p_12p_u_15"
                                    >此环节可跳过，在设备入网前、入网后绑定均可</span
                                >
                            </div>
                            <div class="__p_12p_u_90">
                                <div>
                                    <el-button
                                        type="primary"
                                        round
                                        class="__p_12p_u_126"
                                        @click="dialogToExcelBind"
                                        id="qa-test-deploy-btnBind-excel"
                                        >批量绑定</el-button
                                    >
                                    <el-button
                                        round
                                        class="__p_12p_u_127"
                                        @click="handleSingleBindBtnClick"
                                        id="qa-test-deploy-btnBind-single"
                                        >单台绑定</el-button
                                    >
                                    
                                </div>
                                <div>
                                    <el-input
                                        placeholder="请输入内容"
                                        type="text"
                                        size="small"
                                        class="__p_12p_u_129"
                                        v-model.trim="keyword"
                                        @keyup.native.enter="go2Query"
                                        @input="debounceQuery"
                                        id="qa-test-deploy-input-template"
                                    >
                                        <template v-slot:suffix>
                                            <i
                                                class="el-icon-search __search-icon"
                                                @click="go2Query"
                                            ></i>
                                        </template>
                                    </el-input>
                                </div>
                            </div>
                            <el-table
                                :data="data"
                                stripe
                                highlight-current-row
                                class="__p_12p_u_101"
                            >
                                <el-table-column
                                    label="模板名称"
                                    align="left"
                                    header-align="left"
                                    prop="tmplName"
                                ></el-table-column>
                                <el-table-column
                                    label="关联接入设备数"
                                    align="left"
                                    header-align="left"
                                    prop="num"
                                ></el-table-column>
                                <el-table-column
                                    label="操作"
                                    width="80"
                                    align="left"
                                    header-align="left"
                                >
                                    <div slot-scope="scope">
                                        <el-button
                                            type="text"
                                            style="
                                                margin-left: 0px;
                                                margin-right: 15px;
                                            "
                                            @click="
                                                () =>
                                                    goEdit(
                                                        scope.row.tmplId,
                                                        scope.row.tmplName
                                                    )
                                            "
                                            :id="
                                                'qa-test-deploy-associate-template-devices-' +
                                                scope.row.tmplName
                                            "
                                            >查看编辑</el-button
                                        >
                                    </div>
                                </el-table-column>
                            </el-table>
                            <el-pagination
                                style="margin-top: 10px"
                                :page-sizes="[10, 50, 100, 200]"
                                @size-change="sizeChangeHandle"
                                @current-change="currentChangeHandle"
                                :current-page="page_no"
                                :page-size="page_size"
                                :total="total"
                                layout="total, sizes, prev, pager, next, jumper"
                            ></el-pagination>
                        </template>
                        <aggrBind v-else></aggrBind>
                    </div>
                </div>
            </div>

            <el-dialog
                :visible.sync="excelBindDialogVisible"
                title="批量绑定"
                width="1080px"
            >
                <excel-bind
                    v-if="excelBindDialogVisible"
                    @cancel="excelBindDialogVisible = false"
                    @saved="onExcelBind"
                ></excel-bind>
            </el-dialog>
            <el-dialog
                :visible.sync="singleBindDialogVisible"
                title="单台绑定"
                width="600px"
            >
                <singleBindForm
                    v-if="singleBindDialogVisible"
                    @cancel="singleBindDialogVisible = false"
                    @saveFinish="onSingleSaveFinish"
                ></singleBindForm>
            </el-dialog>
            <el-dialog
                :visible.sync="deviceListDialogVisible"
                title="关联设备"
                width="1080px"
                @close="handleDeviceListDialogClose"
            >
                <deviceList
                    v-bind="deviceListDialogProps"
                    v-if="deviceListDialogVisible"
                ></deviceList>
            </el-dialog>
            <el-dialog
                :visible.sync="deployFinishDialogVisible"
                width="620px"
                :show-close="false"
                :close-on-click-modal="false"
            >
                <deployFinish v-if="deployFinishDialogVisible"></deployFinish>
            </el-dialog>
        </el-card>
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
import excelBind from "./components/excelBind";
import singleBindForm from "./components/singleBindForm";
import deviceList from "./components/deviceList";
import aggrBind from "./components/aggrBind";
import deployFinish from "./components/deployFinish";
export default {
    components: {
        excelBind,
        singleBindForm,
        deviceList,
        aggrBind,
        deployFinish,
    },
    data() {
        return {
            currentView: 1,
            excelBindDialogVisible: false,
            singleBindDialogVisible: false,
            deviceListDialogVisible: false,
            deviceListDialogProps: {},
            deployFinishDialogVisible: false,
            keyword: "",
            data: [],
            page_no: 1,
            page_size: 10,
            total: 0,

            deployFinishStatus: 0, // 1:已完成； 0:未完成
        };
    },
    methods: {
        getCompleteStatus() {
            // this.$axios
            //     .get("/api/vlan/devicereplace/deployFinish")
            //     .then(({ data: { success, result, message } }) => {
            //         if (success) {
            //             this.deployFinishStatus = result;
            //         }
            //     });
        },
        complete() {
            // this.$axios.post("/api/vlan/devicereplace/deployFinish");
        },
        handleDeviceListDialogClose() {
            this.go2Query();
        },
        handleExcelTabClick() {
            this.currentView = 1;
            this.go2Query();
        },
        onSingleSaveFinish() {
            this.go2Query();
            this.singleBindDialogVisible = false;
        },
        goEdit(tmplId, tmplName) {
            this.deviceListDialogVisible = true;
            this.deviceListDialogProps.tmplId = tmplId;
            this.deviceListDialogProps.tmplName = tmplName;
        },
        dialogToExcelBind() {
            this.excelBindDialogVisible = true;
        },
        onExcelBind() {
            this.excelBindDialogVisible = false;
            this.go2Query();
        },
        sizeChangeHandle(val) {
            this.page_size = val;
            this.go2Query();
        },
        currentChangeHandle(val) {
            this.page_no = val;
            this.go2Query();
        },
        debounceQuery() {
        },
        go2Query() {
            const loading = this.$loading({
                lock: true,
                text: "处理中...",
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.7)",
            });
            const query = {
                pageIndex: this.page_no,
                pageSize: this.page_size,
                tmplName: this.keyword,
            };
            // this.$axios
            //     .post("/api/vlan/zeroConfig/queryTmplDevNumOut", query)
            //     .then((res) => {
            //         loading.close();
            //         if (res.data.success) {
            //             var message = res.data.result;

            //             // 页数超标，回到最后一页
            //             if (
            //                 message.total > 0 &&
            //                 Math.ceil(message.total / this.page_size) <
            //                     this.page_no
            //             ) {
            //                 this.page_no = Math.ceil(
            //                     message.total / this.page_size
            //                 );
            //                 this.go2Query();
            //                 return;
            //             }

            //             this.data = message.list;
            //             this.total = message.total;
            //         }
            //     })
            //     .catch((err) => {
                    loading.close();
            //     });
        },
        handlePreBtnClick() {
            this.$emit("preStep");
        },
        handleNextBtnClick() {
            this.complete();
            this.deployFinishDialogVisible = true;
        },
        handleSingleBindBtnClick() {
            this.singleBindDialogVisible = true;
        },
    },
    mounted() {
        this.go2Query();
        this.getCompleteStatus();
       
    },
};
</script>
<style scoped>
.bind-tip-wapper {
    margin-bottom: 20px;
}
.__p_12p_u_7 {
    padding-top: 12px;
    padding-bottom: 12px;
    padding-left: 12px;
    padding-right: 12px;
}

.__p_12p_u_2 {
    background: #ffffff;
    border-radius: 8px;
    margin-top: 8px;
    margin-bottom: 8px;
    margin-left: 8px;
    margin-right: 8px;
}

.__p_12p_u_13 {
    font-weight: bold;
    font-size: 16px;
}

.__p_12p_u_14 {
    margin-left: 12px;
}

.__p_12p_u_15 {
    color: #8e99a0;
    font-size: 10px;
    margin-left: 10px;
}

.__p_12p_u_16 {
    margin-bottom: 32px;
}

.__p_12p_u_95 {
    background: #f0f7ff;
    width: 100%;
    font-size: 14px;
}

.__p_12p_u_94 {
    padding-left: 32px;
    padding-right: 24px;
}

.__p_12p_u_69 {
    margin-left: 48px;
}

.__p_12p_u_71 {
    color: #8e99a0;
    font-size: 12px;
}

.__p_12p_u_70 {
    background: #e1e1e1;
    border-radius: 12px;
    width: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #bbbbbb;
    margin-left: 10px;
    height: 16px;
}

.__p_12p_u_68 {
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 24px;
    margin-bottom: 10px;
    margin-top: 10px;
    cursor: pointer;
}

.__p_12p_u_114 {
    margin-left: 48px;
}

.__p_12p_u_131 {
    color: #8e99a0;
    font-size: 12px;
}

.__p_12p_u_130 {
    background: #e1e1e1;
    border-radius: 12px;
    width: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #bbbbbb;
    margin-left: auto;
    margin-right: 39px;
    height: 16px;
}

.__p_12p_u_113 {
    display: flex;
    align-items: center;
    line-height: 24px;
    margin-bottom: 24px;
    margin-top: 24px;
}

.__p_12p_u_118 {
    margin-left: 48px;
}

.__p_12p_u_120 {
    color: #8e99a0;
    font-size: 12px;
}

.__p_12p_u_119 {
    background: #e1e1e1;
    border-radius: 12px;
    width: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #bbbbbb;
    margin-left: auto;
    margin-right: 39px;
    height: 16px;
}

.__p_12p_u_117 {
    display: flex;
    align-items: center;
    line-height: 24px;
    margin-bottom: 24px;
    margin-top: 24px;
}

.__p_12p_u_122 {
    margin-left: 48px;
}

.__p_12p_u_124 {
    color: #8e99a0;
    font-size: 12px;
}

.__p_12p_u_123 {
    background: #e1e1e1;
    border-radius: 12px;
    width: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #bbbbbb;
    margin-left: auto;
    margin-right: 39px;
    height: 16px;
}

.__p_12p_u_121 {
    display: flex;
    align-items: center;
    line-height: 24px;
    margin-bottom: 24px;
    margin-top: 24px;
}

.__p_12p_u_65 {
    width: 236px;
    border-right: 1px solid #f0f0f0;
}

.__p_12p_u_126 {
    font-size: 14px;
    box-shadow: 0px 4px 6px rgba(2, 109, 247, 0.2);
}

.__p_12p_u_127 {
    margin-left: 16px;
    font-size: 14px;
    box-shadow: 4px 4px 12px rgba(237, 246, 252, 0.77);
}

.__p_12p_u_129 {
    width: 208px;
    box-shadow: 4px 4px 12px rgba(237, 246, 252, 0.77);
}

.__p_12p_u_90 {
    display: flex;
    justify-content: space-between;
}

.__p_12p_u_101 {
    margin-top: 24px;
}

.__p_12p_u_89 {
    flex: 1;
    margin-left: 24px;
}

.__p_12p_u_48 {
    display: flex;
}

.__p_12p_u_12 {
    background: #ffffff;
    border-radius: 8px;
    padding-bottom: 32px;
}

.__p_12p_u_110 {
    align-items: center;
    justify-content: center;
    display: flex;
    margin-top: 24px;
    margin-bottom: 24px;
}

.__p_12p_u_1 {
    background: #e5e5e5;
}
</style>

<style scoped lang="scss">
.__search-icon {
    line-height: 32px;
    padding: 0 7px;
}
.theme-18edd0 {
    .__p_12p_u_12 {
        background-color: transparent;
    }
    .__p_12p_u_95 {
        background-color: #1a1d21;
    }
    .__p_12p_u_126,
    .__p_12p_u_127,
    .__p_12p_u_129 {
        box-shadow: none;
    }
    .__p_12p_u_65 {
        border-right-color: rgba(110, 127, 151, 0.2);
    }
}
</style>
