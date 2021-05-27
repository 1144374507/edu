<template>
    <div>
        <div>
                <!-- :action="uploadUrl" -->

            <el-upload
                style="display: inline-block; margin-right: 10px"
                ref="upload"
                :data="uploadData"
                :headers="headers"
                action
                :before-upload="beforeUpload"
                :on-progress='onProgress'
                :on-success="handleSuccess"
                :on-error="handleError"
                :accept="accept"
                :show-file-list="false"
                :fileList="fileList"
                :limit="2"
                :on-change="handleChange"
            >
                <el-button icon="el-icon-upload" type="primary" id="qa-test-deploy-excelbBind-upload"
                    >上传Excel</el-button
                >
            </el-upload>

            <el-button icon="el-icon-download" @click="downLoad" id="qa-test-deploy-excelbBind-download"
                >下载Excel</el-button
            >
            <span class="__tip" style="margin-left: 14px">
                <i class="el-icon-info" style="margin-right: 3px"></i>
                每次最多1000条数据，且导入的文件大小不超过10MB
            </span>
        </div>
        <div class="__filelist" v-if="fileList.length">
            <img
                style="margin-right: 8px"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAF7SURBVHgBjVNBUsJAEOxdF7khT4gvEF8AZ6sUzlIqeYHyAv2BxQsIh8hNBB+Q8gf6AuMPgp7EuOMkG7IJSMFUbdVuZqa3p9MrsAz/pAFSAQTq2DUk7lR+EJV7CPLwLQc7Nau4wQhDVfoY0xvcp3AngHEH0Lqu4J/2GKkJIocpXcFvN8uV+gXdZ28TjoB/RtgeNwDNLSaFUCpkBu92BELEcBHvHF4hn+u5oIQes4zstXqa1iDR0XKJsPg85uIRurNDSHq14LqPH+Ha9eUtU0URHVRrtzif9XisawZq5RkpA+zrQmltasYqAwC/MHMSCQhRSCgH3cePUu244xjiVsQwpe63h1jM+6geTBiolY0Xrlw0gpJeIqIFSESUvIhHIURZY+ZKclPlc0LK7NO/YNQ3ilPWsGbnSoCL/0dgAO0Ce22+ha2VKC/DUqFIjLTSXEznu4d2gFiPcLnZdWsMykbSEZQ4wtBQ2xoxPyYpCwz8Dr8uPYFx4vagVPDBH94FlvgPLfxjAAAAAElFTkSuQmCC"
                alt=""
            />
            <span style="flex: 1">{{ fileList[0].name }}</span>
            <i class="el-icon-delete __delete" @click="clearFile" id="qa-test-deploy-excelbBind-delete"></i>
        </div>

        <div style="margin-top: 50px">
            <div
                class="__legend"
                style="white-space: nowrap; margin-bottom: 20px"
            >
                绑定记录
            </div>
            <div>
                <el-table
                    :data="bindPageList"
                    size="mini"
                    :height="400"
                    style="padding: 0 20px"
                >
                    <el-table-column
                        label="设备SN"
                        prop="serialNo"
                    ></el-table-column>
                    <el-table-column
                        label="绑定配置模版"
                        prop="tmplName"
                    ></el-table-column>
                    <el-table-column
                        label="区域名称"
                        prop="areaName"
                    ></el-table-column>
                    <el-table-column
                        label="设备位置"
                        prop="location"
                    ></el-table-column>
                    <el-table-column
                        label="设备名称"
                        prop="hostName"
                    ></el-table-column>
                </el-table>
                <el-pagination
                    style="margin-top: 10px"
                    :page-sizes="[2,10, 50, 100, 200]"
                    @size-change="sizeChangeHandle"
                    @current-change="currentChangeHandle"
                    :current-page="page_no"
                    :page-size="page_size"
                    :total="total"
                    layout="total, sizes, prev, pager, next, jumper"
                ></el-pagination>
            </div>
        </div>
        <div style="text-align: right">
            <el-button @click="$emit('cancel')" style="width: 112px" id="qa-test-deploy-excelbBind-cancel"
                >取消</el-button
            >
            <el-button @click="submitBind" type="primary" style="width: 112px" id="qa-test-deploy-excelbBind-affirm"
                >绑定</el-button
            >
        </div>
    </div>
</template>
<script>

export default {
    props: {},
    data() {
        return {
            cliParamToRequestArr: [],
            uploadData: {},
            // headers: {'X-Authorization': tokenObj.getToken()},
            // uploadUrl:
            //     "/api/inc/buzz/buzzbindtmpl/importSnFile?token=" +
            //     tokenObj.getToken(),
            accept: ".xls,.xlsx",
            fileList: [],
            uploadDoing: false,

            sourceResult: {},
            bindList: [],
            bindPageList: [],
            page_no: 1,
            page_size: 10,
            total: 0,
        };
    },
    methods: {
        onProgress(){
            this.loading = this.$loading({
                lock: true,
                text: "处理中...",
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.7)"
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
        go2Query() {
            this.bindPageList = this.bindList.slice(
                (this.page_no - 1) * this.page_size,
                this.page_no * this.page_size
            );
            // this.$axios
            //     .post("/api/vlan/zeroConfig/getDeviceByPage", query)
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
            //     });
        },
        downLoad() {
            // rjDownload.download(
            //     "/api/inc/buzz/buzzbindtmpl/exportSnTemplate?params=" +
            //         this.cliParamToRequestArr
            // );
        },
        beforeUpload(file) {
            const filenameMatch = file.name.match(/\.([^\.]+)$/);
            const isXls =
                file.type ===
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
                file.type === "application/vnd.ms-excel" ||
                (filenameMatch &&
                    (filenameMatch[1] === "xls" ||
                        filenameMatch[1] === "xlsx"));
            if (!isXls) {
                this.$message.error("只能上传xls，xlsx格式!");
                return false;
            }
            if (file.size > 50 * 1024 * 1024) {
                this.$message.error("文件大小不能大于50MB!");
                return false;
            }
            return isXls;
        },
        handleSuccess(res, file) {
            console.log(res,'jsf');
             this.loading.close()
            this.uploadDoing = false;
            if (res == null || res == "") {
                this.$alert(`导入失败。`, "导入失败", {
                    confirmButtonText: "关闭",
                    type: "error",
                    callback: (action) => {
                        this.fileList = [];
                        this.$refs.upload.clearFiles();
                    },
                });
                return;
            } else if (res.success) {
                this.sourceResult = res.result.newList;
                this.bindList = res.result.newList.concat(
                    res.result.existsList
                );
                this.page_no = 1;
                this.total = this.bindList.length;
                this.go2Query();
            } else {
                if (res.result == null) {
                    this.$alert(
                        `导入失败，请修改后重新导入。${res.message}`,
                        "导入失败",
                        {
                            confirmButtonText: "关闭",
                            type: "error",
                            callback: (action) => {
                                this.fileList = [];
                                this.$refs.upload.clearFiles();
                            },
                        }
                    );
                } else {
                    let l = res.result.message.split("\n");
                    let a = "";
                    let isHtml = false;
                    if (l.length >= 2) {
                        a = "</br>";
                        a += l.join("</br>");
                        isHtml = true;
                    } else {
                        a = res.result.message;
                    }
                    this.$alert(
                        `导入失败，请修改后重新导入。` + a,
                        "导入失败",
                        {
                            dangerouslyUseHTMLString: isHtml,
                            confirmButtonText: "关闭",
                            type: "error",
                            callback: (action) => {
                                this.fileList = [];
                                this.$refs.upload.clearFiles();
                            },
                        }
                    );
                }
            }
        },
        handleError(err, file) {
            this.uploadDoing = false;
            this.$alert("导入失败，请修改后重新导入。", "导入失败", {
                confirmButtonText: "关闭",
                type: "error",
                callback: (action) => {
                    this.fileList = [];
                    this.$refs.upload.clearFiles();
                },
            });
        },
        clearFile() {
            this.fileList = [];
            this.$refs.upload.clearFiles();
        },
        handleChange(file, fileList) {
            this.fileList = [file];
        },
        submitBind() {
            if (!this.bindList.length) {
                this.$message({
                    type: "error",
                    message: "绑定记录为空",
                });
                return;
            }
            // this.$axios
                // .post("/api/inc/buzz/buzzonliningdevice/saveBuzzOnliningDevice", {
                //     list: this.sourceResult,
                //     isExcel: true,
                // })
                // .then(({ data: { result, success, message } }) => {
                //     if (success) {
                //         this.$message.success("绑定成功");
                //         this.$emit("saved");
                //     } else {
                //         this.$message.error(message);
                //     }
                // });
        },
    },
};
</script>

<style lang="scss" scoped>
.theme-2b6afd {
    .__tip {
        font-size: 12px;
        color: #8e99a0;
    }
    .__filelist {
        background: #f7f9fc;
        border: 1px solid #e3e5ea;
        border-radius: 12px;
        margin-top: 16px;
        padding: 16px;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .__delete {
        color: #f20742;
        &:hover {
            color: lighten($color: #f20742, $amount: 10);
            cursor: pointer;
        }
    }
    .__legend {
        position: relative;
        font-size: 16px;
        line-height: 20px;
        color: #505a60;
        padding-left: 10px;
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
}
</style>