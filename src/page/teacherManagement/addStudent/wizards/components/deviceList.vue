<template>
    <div>
        <div
            style="
                display: flex;
                align-items: center;
                justify-content: space-between;
            "
        >
            <div>模板名称：{{ tmplName }}</div>
            <el-input
                v-model.trim="keyword"
                placeholder="SN | 区域 | 位置"
                style="width: 210px"
                @keyup.native.enter="go2Query"
                @input="debounceQuery"
                id="qa-test-deploy-excelbBind-associatedDevices-search-input"
            >
                <template v-slot:suffix>
                    <i
                        class="el-icon-search __search-icon"
                        @click="go2Query"
                    ></i>
                </template>
            </el-input>
        </div>
        <el-table
            :data="data"
            stripe
            height="450px"
            highlight-current-row
            class="__p_12p_u_101"
        >
            <el-table-column
                show-overflow-tooltip
                label="状态"
                align="left"
                header-align="left"
                prop="adminState"
            >
                <template slot-scope="scope">
                    <span
                        :class="`__admin-state__0`"
                        v-if="scope.row.adminState === 0"
                        >未纳管</span
                    >
                    <span
                        :class="`__admin-state__2`"
                        v-else-if="scope.row.adminState === 2"
                        >未纳管</span
                    >
                    <span
                        :class="`__admin-state__1 __admin-state__1-${scope.row.upState}`"
                        v-else-if="scope.row.adminState === 1"
                        >已纳管</span
                    >
                </template>
            </el-table-column>
            <el-table-column
                show-overflow-tooltip
                label="设备IP"
                align="left"
                header-align="left"
                prop="deviceIp"
            ></el-table-column>
            <el-table-column
                show-overflow-tooltip
                label="设备SN"
                align="left"
                header-align="left"
                prop="serialNo"
            ></el-table-column>
            <el-table-column
                show-overflow-tooltip
                label="设备型号"
                align="left"
                header-align="left"
                prop="modelName"
            ></el-table-column>
            <el-table-column
                show-overflow-tooltip
                label="设备名称"
                align="left"
                header-align="left"
                prop="deviceName"
            ></el-table-column>
            <el-table-column
                show-overflow-tooltip
                label="区域名称"
                align="left"
                header-align="left"
                prop="areaName"
            ></el-table-column>
            <el-table-column
                show-overflow-tooltip
                label="设备位置"
                align="left"
                header-align="left"
                prop="location"
            ></el-table-column>
            <el-table-column
                label="操作"
                width="150"
                align="left"
                header-align="left"
            >
                <div slot-scope="scope">
                    <el-button
                        type="text"
                        style="margin-left: 0px; margin-right: 15px"
                        icon="el-icon-edit"
                        @click="() => goEdit(scope.row)"
                        :id="
                            'qa-test-deploy-excelbBind-associatedDevices-delete-' +
                            scope.row.deviceName
                        "
                        >编辑</el-button
                    >
                    <el-button
                        v-if="scope.row.upState === 0"
                        type="text"
                        style="margin-left: 0px; margin-right: 15px"
                        icon="el-icon-delete"
                        @click="() => remove(scope.row.id)"
                        :id="
                            'qa-test-deploy-excelbBind-associatedDevices-status-' +
                            scope.row.deviceName
                        "
                        >删除</el-button
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

        <el-dialog
            :visible.sync="singleBindDialogVisible"
            title="单台绑定"
            width="600px"
            append-to-body
        >
            <singleBindForm
                :bindInfo="bindInfo"
                v-if="singleBindDialogVisible"
                @cancel="singleBindDialogVisible = false"
                @saveFinish="onSingleSaveFinish"
            ></singleBindForm>
        </el-dialog>
    </div>
</template>
<script>
import singleBindForm from "./singleBindForm";

export default {
    props: {
        tmplId: {},
        tmplName: {},
    },
    components: {
        singleBindForm,
    },
    data() {
        return {
            singleBindDialogVisible: false,
            bindInfo: null,
            keyword: "",
            data: [],
            page_no: 1,
            page_size: 10,
            total: 0,
        };
    },
    methods: {
        onSingleSaveFinish() {
            this.go2Query();
            this.singleBindDialogVisible = false;
        },
        goEdit(data) {
            this.bindInfo = data;
            this.singleBindDialogVisible = true;
        },
        remove(id) {
            this.$confirm("确认删除吗？").then(() => {
                this.$axios
                    .delete(`/api/vlan/zeroConfig/delete/${id}`)
                    .then(({ data: { success, message } }) => {
                        if (success) {
                            this.$message.success("操作成功");
                            this.go2Query();
                        } else {
                            this.$message.error(message || "操作失败");
                        }
                    });
            });
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
            // to be implemented in mounted hook
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
                tmplId: this.tmplId,
                snOrAreaOrLocation: this.keyword,
            };
            this.$axios
                .post("/api/vlan/zeroConfig/queryTmplDevOut", query)
                .then((res) => {
                    loading.close();
                    if (res.data.success) {
                        var message = res.data.result;

                        // 页数超标，回到最后一页
                        if (
                            message.total > 0 &&
                            Math.ceil(message.total / this.page_size) <
                                this.page_no
                        ) {
                            this.page_no = Math.ceil(
                                message.total / this.page_size
                            );
                            this.go2Query();
                            return;
                        }

                        this.data = message.list;
                        this.total = message.total;
                    }
                })
                .catch((err) => {
                    loading.close();
                });
        },
    },
    mounted() {
        this.go2Query();
    },
};
</script>
<style scoped>
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
    margin-left: 32px;
}

.__p_12p_u_14 {
    margin-left: 12px;
}

.__p_12p_u_15 {
    color: #8e99a0;
    font-size: 10px;
}

.__p_12p_u_16 {
    margin-bottom: 32px;
    padding-top: 24px;
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
    margin-left: auto;
    margin-right: 39px;
    height: 16px;
}

.__p_12p_u_68 {
    display: flex;
    align-items: center;
    line-height: 24px;
    margin-bottom: 24px;
    margin-top: 24px;
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
    margin-right: 24px;
}

.__p_12p_u_48 {
    display: flex;
}

.__p_12p_u_12 {
    margin-top: 8px;
    margin-bottom: 8px;
    margin-left: 8px;
    margin-right: 8px;
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
<style lang="scss" scoped>
.__search-icon {
    line-height: 32px;
    padding: 0 7px;
}
.theme-2b6afd {
    .__admin-state__0,
    .__admin-state__2,
    .__admin-state__1 {
        color: #5b656b;
        &::before {
            content: "";
            display: inline-block;
            width: 6px;
            height: 6px;
            border-radius: 6px;
            margin-right: 8px;
            background-color: #5b656b;
        }
    }
    .__admin-state__0,
    .__admin-state__2 {
        &::before {
            visibility: hidden;
        }
    }
    .__admin-state__1-3::before {
        background-color: #00a54e;
    }
}
</style>