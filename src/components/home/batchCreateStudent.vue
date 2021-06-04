<template>
  <div>
    <div class="batchCreateStudent">
      <!-- :action="uploadUrl" -->
      <!-- :headers="headers" -->

      <el-upload
        action=""
        :on-change="handleChange"
        :file-list="fileListUpload"
        :show-file-list="false"
        accept=".xls,.xlsx"
        :auto-upload="false"
        style="display: inline-block; margin-right: 10px"
        ref="upload"
        :fileList="fileList"
      >
        <!-- <el-button
          icon="el-icon-upload"
          type="primary"
          id="qa-test-deploy-excelbBind-upload"
          >上传Excel</el-button
        > -->
        <el-button type="primary" icon="el-icon-upload">上传 Excel</el-button>
      </el-upload>

      <el-button
        icon="el-icon-download"
        @click="doOut"
        id="qa-test-deploy-excelbBind-download"
        >下载 Excel</el-button
      >
      <!-- <span class="__tip" style="margin-left: 14px">
        <i class="el-icon-info" style="margin-right: 3px"></i>
        每次最多1000条数据，且导入的文件大小不超过10MB
      </span> -->
    </div>
    <div class="__filelist" v-if="fileList.length">
      <img
        style="margin-right: 8px"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAF7SURBVHgBjVNBUsJAEOxdF7khT4gvEF8AZ6sUzlIqeYHyAv2BxQsIh8hNBB+Q8gf6AuMPgp7EuOMkG7IJSMFUbdVuZqa3p9MrsAz/pAFSAQTq2DUk7lR+EJV7CPLwLQc7Nau4wQhDVfoY0xvcp3AngHEH0Lqu4J/2GKkJIocpXcFvN8uV+gXdZ28TjoB/RtgeNwDNLSaFUCpkBu92BELEcBHvHF4hn+u5oIQes4zstXqa1iDR0XKJsPg85uIRurNDSHq14LqPH+Ha9eUtU0URHVRrtzif9XisawZq5RkpA+zrQmltasYqAwC/MHMSCQhRSCgH3cePUu244xjiVsQwpe63h1jM+6geTBiolY0Xrlw0gpJeIqIFSESUvIhHIURZY+ZKclPlc0LK7NO/YNQ3ilPWsGbnSoCL/0dgAO0Ce22+ha2VKC/DUqFIjLTSXEznu4d2gFiPcLnZdWsMykbSEZQ4wtBQ2xoxPyYpCwz8Dr8uPYFx4vagVPDBH94FlvgPLfxjAAAAAElFTkSuQmCC"
        alt=""
      />
      <span style="flex: 1">{{ fileList[0].name }}</span>
      <i
        class="el-icon-delete __delete"
        @click="clearFile"
        id="qa-test-deploy-excelbBind-delete"
      ></i>
    </div>

    <div style="margin-top: 50px">
      <!-- <div class="__legend" style="white-space: nowrap; margin-bottom: 20px">
        绑定记录
      </div> -->
      <div>
        <el-table :data="list" stripe style="margin-top: 10px">
          <el-table-column type="index"> </el-table-column>
          <el-table-column label="姓名" prop="name"> </el-table-column>
          <el-table-column label="英文名字" prop="englishName">
          </el-table-column>
          <!-- <el-table-column  label="年龄"  prop = 'age'> </el-table-column> -->
          <!-- <el-table-column  label="班级" prop="classes">
        </el-table-column> -->
          <el-table-column label="体重（kg）" prop="weight"> </el-table-column>
          <el-table-column label="身高（cm）" prop="height"> </el-table-column>
          <el-table-column label="性别" prop="sex"> </el-table-column>
          <el-table-column label="年级" prop="grades"> </el-table-column>
          <el-table-column label="入学年级" prop="admissionGrade">
          </el-table-column>
          <el-table-column label="入学日期" prop="admissionData">
          </el-table-column>
          <el-table-column label="是否留学生" prop="overseas">
          </el-table-column>
          <el-table-column label="学号" prop="schoolNumber"> </el-table-column>
          <el-table-column label="身份证号码" prop="idCardNum">
          </el-table-column>
          <el-table-column label="qq" prop="qq"> </el-table-column>
          <el-table-column label="邮箱" prop="email"> </el-table-column>
          <el-table-column label="邮编" prop="postcode"> </el-table-column>
          <el-table-column label="个人简介" prop="profile"> </el-table-column>
          <el-table-column label="电话号码" prop="tel"> </el-table-column>
          <el-table-column label="个人主页" prop="homepage"> </el-table-column>
        </el-table>
      </div>
    </div>
    <div style="text-align: center; padding-top: 8px">
      <el-button
        @click="$emit('cancel')"
        style="width: 112px"
        id="qa-test-deploy-excelbBind-cancel"
        >取消</el-button
      >
      <el-button
        @click="save"
        type="primary"
        style="width: 112px"
        id="qa-test-deploy-excelbBind-affirm"
        >创建</el-button
      >
    </div>
  </div>
</template>
<script>
import {
  testSchoolNumble,
  testEmile,
  testPostcode,
  testQQ,
  testTel,
  testCard,
} from '@/common/js/validate.js'
export default {
  props: {},
  data() {
    return {
      cliParamToRequestArr: [],
      fileList: [],
      bindList: [],
      bindPageList: [],
      da: [],
      list: [],
      fileListUpload: [],
      fileTemp: [],
      disbtn: false,
    };
  },
  methods: {
    onProgress() {
      this.loading = this.$loading({
        lock: true,
        text: "处理中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
    },
    sizeChangeHandle(val) {
      this.page_size = val;
    },
    currentChangeHandle(val) {
      this.page_no = val;
    },
    clearFile() {
      this.fileList = [];
      this.$refs.upload.clearFiles();
    },

    save() {
      if (!this.list.length) {
        this.$message({
          type: "error",
          message: "绑定记录为空",
        });
        return;
      }
      const list = this.list;
      console.log(list, "list1");
      this.$axios
        .post(`/api/createStudent/batchCreateStudent`, { list })
        .then((res) => {
          console.log(res, "res");
          if (res.data.success) {
            this.$message.success(res.data.msg || "添加成功");
            return;
          }
          this.$message.error(res.data.msg || "接口异常");
        });
    },
    downLoad() {
      let url = "../../EXcel/Export2Excel.js";
      window.location.href = url;
    },

    // 上传附件
    handleChange(file, fileList) {
      this.fileTemp = file.raw;
      this.doBegin();
    },

    doBegin() {
      if (
        this.fileTemp.type ==
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        this.fileTemp.type == "application/vnd.ms-excel"
      ) {
        this.disbtn = true;
        this.importfxx(this.fileTemp);
      } else {
        this.$message({
          type: "warning",
          message: "附件格式错误，请重新上传！",
        });
      }
    },

    // Excel 转化
    importfxx(obj) {
      let _this = this;
      // 通过DOM取文件数据
      this.file = obj;
      var rABS = false; // 是否将文件读取为二进制字符串
      var f = this.file;
      var reader = new FileReader();
      // if (!FileReader.prototype.readAsBinaryString) {
      FileReader.prototype.readAsBinaryString = function (f) {
        var binary = "";
        var rABS = false; // 是否将文件读取为二进制字符串
        var pt = this;
        var wb; // 读取完成的数据
        var outdata;
        var reader = new FileReader();
        reader.onload = function (e) {
          var bytes = new Uint8Array(reader.result);
          var length = bytes.byteLength;
          for (var i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          var XLSX = require("xlsx");
          if (rABS) {
            wb = XLSX.read(btoa(fixdata(binary)), {
              // 手动转化
              type: "base64",
            });
          } else {
            wb = XLSX.read(binary, {
              type: "binary",
            });
          }
          outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]); // outdata就是你想要的东西
          this.da = [...outdata];
          let arr = [];
          if (this.da.length == 0) {
            _this.$confirm(`表格为空`);
            return;
          }
          // this.da.map((v,i) => {
          for (let index in this.da) {
            if (
              this.da[index]["姓名（必填）"] == "" ||
              this.da[index]["姓名（必填）"] == undefined ||
              this.da[index]["姓名（必填）"] == "undefined"
            ) {
              _this.$confirm(`第${index * 1 + 1}行，姓名不能为空`);
              return;
            }
            if (
              this.da[index]["年级（必填）"] == "" ||
              this.da[index]["年级（必填）"] == undefined ||
              this.da[index]["年级（必填）"] == "undefined"
            ) {
              _this.$confirm(`第${index * 1 + 1}行，年级不能为空`);
              return;
            }
            if (
              this.da[index]["入学年级（必填）"] == "" ||
              this.da[index]["入学年级（必填）"] == undefined ||
              this.da[index]["入学年级（必填）"] == "undefined"
            ) {
              _this.$confirm(`第${index * 1 + 1}行，入学年级不能为空`);
              return;
            }

            if (
              this.da[index]["入学日期（必填）"] == "" ||
              this.da[index]["入学日期（必填）"] == undefined ||
              this.da[index]["入学日期（必填）"] == "undefined"
            ) {
              _this.$confirm(`第${index * 1 + 1}行，入学日期不能为空`);
              return;
            }
            if (
              this.da[index]["身份证号码（必填）"] == "" ||
              this.da[index]["身份证号码（必填）"] == undefined ||
              this.da[index]["身份证号码（必填）"] == "undefined"
            ) {
              _this.$confirm(`第${index * 1 + 1}行，身份证号码不能为空`);
              return;
            }
            if (
              this.da[index]["学号（必填）"] == "" ||
              this.da[index]["学号（必填）"] == undefined ||
              this.da[index]["学号（必填）"] == "undefined"
            ) {
              _this.$confirm(`第${index * 1 + 1}行，学号不能为空`);
              return;
            }
            if (
              this.da[index]["电话号码（必填）"] == "" ||
              this.da[index]["电话号码（必填）"] == undefined ||
              this.da[index]["电话号码（必填）"] == "undefined"
            ) {
              _this.$confirm(`第${index * 1 + 1}行，电话号码不能为空`);
              return;
            }
            // 表单校验
            // 省份证号码校验
            // const testCard = (text) => {
            //   var idcardReg = /^\d{17}[\d|x]|\d{15}$/;
            //   return idcardReg.test(text);
            // };
            if (!testCard(this.da[index]["身份证号码（必填）"])) {
              _this.$confirm(`第${index * 1 + 1}行，身份证号码格式错误`);
              return;
            }
            // 电话号码校验
            // const testTel = (text) => {
            //   var reg_tel = /^[0-9-()（）]{7,18}$/;
            //   return reg_tel.test(text);
            // };
            if (!testTel(this.da[index]["电话号码（必填）"])) {
              _this.$confirm(`第${index * 1 + 1}行，请输入正确的手机号码`);
              return;
            }
            // qq号码校验
            // const testQQ = (text) => {
            //   let reg = /^[1-9]([0-9]{4,10})$/;
            //   return reg.test(text);
            // };
            if (
              this.da[index]["qq"] != undefined &&
              !testQQ(this.da[index]["qq"])
            ) {
              _this.$confirm(`第${index * 1 + 1}行，请输入正确的qq号码`);
              return;
            }
            // 邮编号码校验
            // const testPostcode = (text) => {
            //   let reg = /^\d{6}$/;
            //   return reg.test(text);
            // };
            if (
              this.da[index]["邮编"] != undefined &&
              !testPostcode(this.da[index]["邮编"])
            ) {
              _this.$confirm(`第${index * 1 + 1}行，请输入正确的邮政编码`);
              return;
            }
            // 邮箱号码校验
            // const testEmile = (text) => {
            //   let reg = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}$/;
            //   return reg.test(text);
            // };
            if (
              this.da[index]["邮箱"] != undefined &&
              !testEmile(this.da[index]["邮箱"])
            ) {
              _this.$confirm(`第${index * 1 + 1}行，请输入正确的邮箱号码`);
              return;
            }

            // 学号校验校验
            // const testSchoolNumble = (text) => {
            //   let reg = /^[1-9][0-9]{9}$/;
            //   return reg.test(text);
            // };
            if (
              this.da[index]["学号（必填）"] != undefined &&
              !testSchoolNumble(this.da[index]["学号（必填）"])
            ) {
              _this.$confirm(`第${index * 1 + 1}行，请输入正确的学号`);
              return;
            }

            // 验证身高
            const testNumble = (text) => {
              let reg = /^[1-9][0-9]{0,}$/;
              return reg.test(text);
            };
            if (
              this.da[index]["体重（kg）"] != undefined &&
              !testNumble(this.da[index]["体重（kg）"])
            ) {
              _this.$confirm(`第${index * 1 + 1}行，请输入正确的体重（kg）`);
              return;
            }
            if (
              this.da[index]["身高（cm）"] != undefined &&
              !testNumble(this.da[index]["身高（cm）"])
            ) {
              _this.$confirm(`第${index * 1 + 1}行，请输入正确的身高（cm）`);
              return;
            }

            let obj = {};
            obj.name = this.da[index]["姓名（必填）"];
            obj.englishName = this.da[index]["英文名字"];
            // obj.age = this.da[index]["年龄"];
            // obj.classes = this.da[index]["班级"];
            obj.weight = this.da[index]["体重（kg）"];
            obj.height = this.da[index]["身高（cm）"];
            obj.sex = this.da[index]["性别"];
            obj.grades = this.da[index]["年级（必填）"];
            obj.admissionGrade = this.da[index]["入学年级（必填）"];
            obj.admissionData = this.da[index]["入学日期（必填）"];
            obj.overseas = this.da[index]["是否留学生"];
            obj.schoolNumber = this.da[index]["学号（必填）"];
            obj.idCardNum = this.da[index]["身份证号码（必填）"];
            obj.qq = this.da[index]["qq"];
            obj.email = this.da[index]["邮箱"];
            obj.postcode = this.da[index]["邮编"];
            obj.profile = this.da[index]["个人简介"];
            obj.tel = this.da[index]["电话号码（必填）"];
            obj.homepage = this.da[index]["个人主页"];
            arr.push(obj);
            _this.list = [...arr];
            _this.disbtn = false;
          }
          // this.da.map( item => {
          //   Object.keys(item).map( res => {
          //     if(item[res] =='' || item[res] == undefined || item[res] == 'undefined' ){

          //     }
          //   })

          // })
          console.log(_this.list, "list");
        };
        reader.readAsArrayBuffer(f);
      };
      if (rABS) {
        reader.readAsArrayBuffer(f);
      } else {
        reader.readAsBinaryString(f);
      }
    },

    // out下载模板
    doOut() {
      // if (this.list.length == 0) {
      //   return this.$message.error("空数组！");
      // }
      this.disbtn = true;
      let list = [
        {
          admissionGrade: "(例)2018级",
          admissionData: "(例)2018.09",
          // age: '(例)16',
          // classes: "1班",
          email: "(例)1144374500@qq.com",
          englishName: "(例)zhangsan",
          grades: "(例)2017级",
          height: "(例)177",
          homepage: "",
          idCardNum: "(例)350825199803121111",
          name: "(例)张三",
          overseas: "(例)否",
          postcode: "(例)366200",
          profile: "",
          qq: "(例)1144374500",
          schoolNumber: "(例)2018021065",
          sex: "(例)男",
          tel: "(例)16712318888",
          weight: "(例)60",
        },
      ];
      this.getExcel(list);
    },

    //  数组导入Excel
    getExcel(arr) {
      require.ensure([], () => {
        // 这里 require 的地址指向你项目中 Export2Excel.js 文件存放地址
        const { export_json_to_excel } = require("../../EXcel/Export2Excel.js");
        const tHeader = [
          "姓名（必填）",
          "英文名字",
          // "年龄",
          // "班级",
          "体重（kg）",
          "身高（cm）",
          "性别",
          "年级（必填）",
          "入学年级（必填）",
          "入学日期（必填）",
          "是否留学生",
          "学号（必填）",
          "身份证号码（必填）",
          "qq",
          "邮箱",
          "邮编",
          "个人简介",
          "电话号码（必填）",
          "个人主页",
        ];
        const filterVal = [
          "name",
          "englishName",
          // "age",
          // "classes",
          "weight",
          "height",
          "sex",
          "grades",
          "admissionGrade",
          "admissionData",
          "overseas",
          "schoolNumber",
          "idCardNum",
          "qq",
          "email",
          "postcode",
          "profile",
          "tel",
          "homepage",
        ];
        const list = arr;
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "奥力给");
        this.disbtn = false;
      });
    },

    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]));
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
<style lang="scss">
.batchCreateStudent {
  display: flex;
  justify-content: flex-start !important;
}
</style>