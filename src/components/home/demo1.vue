<template>
  <div id="js003">
    <div class="main-title">Excel Demo</div>
    <div class="main-title-time">2020-04-03</div>
    <div class="main-title-tip">
      应好多小伙伴的要求，先增加一个小 Demo。该 Demo
      仅用于展示功能，略粗糙，若有 Bug，请谅解，也可在
      <a target="_blank" href="https://github.com/xrkffgg/Kvue/issues"
        >https://github.com/xrkffgg/Kvue/issues</a
      >
      提出来。可点击下载 Demo Excel，若因网络问题，可在目录 src/assets/excel
      中查看。导出的 Excel 会自动下载到浏览器默认的下载地址中。引入 2 个 JS
      文件，最新的查看
      <a
        target="_blank"
        href="https://github.com/xrkffgg/Ktools/tree/master/JS/002.Excel"
        >https://github.com/xrkffgg/Ktools/tree/master/JS/002.Excel</a
      >
    </div>
    <div class="main-content">
      <div style="display: flex; width: 340px; justify-content: space-between">
        <!-- <el-button type="primary" plain size="small" @click="doDown">下载 Excel</el-button> -->
        <el-button type="primary" plain size="small" @click="save"
          >保存</el-button
        >
        <el-upload
          action=""
          :on-change="handleChange"
          :file-list="fileListUpload"
          :show-file-list="false"
          accept=".xls,.xlsx"
          :auto-upload="false"
        >
          <el-button :loading="disbtn" size="small" type="primary"
            >上传 Excel</el-button
          >
        </el-upload>
        <el-button
          type="success"
          plain
          :loading="disbtn"
          size="small"
          @click="doOut"
          >导出 Excel</el-button
        >
      </div>
      <el-table :data="list" stripe style="margin-top: 10px" border>
        <el-table-column type="index"> </el-table-column>
        <el-table-column label="姓名" prop="name"> </el-table-column>
        <el-table-column label="英文名字" prop="englishName"> </el-table-column>
        <!-- <el-table-column  label="年龄"  prop = 'age'> </el-table-column> -->
        <!-- <el-table-column  label="班级" prop="classes">
        </el-table-column> -->
        <el-table-column label="体重" prop="weight"> </el-table-column>
        <el-table-column label="身高" prop="height"> </el-table-column>
        <el-table-column label="性别" prop="sex"> </el-table-column>
        <el-table-column label="年级" prop="grades"> </el-table-column>
        <el-table-column label="入学年级" prop="admissionGrade">
        </el-table-column>
        <el-table-column label="入学日期" prop="admissionData">
        </el-table-column>
        <el-table-column label="是否留学生" prop="overseas"> </el-table-column>
        <el-table-column label="学号" prop="schoolNumber"> </el-table-column>
        <el-table-column label="身份证号码" prop="idCardNum"> </el-table-column>
        <el-table-column label="qq" prop="qq"> </el-table-column>
        <el-table-column label="邮箱" prop="email"> </el-table-column>
        <el-table-column label="邮编" prop="postcode"> </el-table-column>
        <el-table-column label="个人简介" prop="profile"> </el-table-column>
        <el-table-column label="电话号码" prop="tel"> </el-table-column>
        <el-table-column label="个人主页" prop="homepage"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      da: [],
      list: [],
      fileListUpload: [],
      fileTemp: [],
      disbtn: false,
    };
  },

  methods: {
    save() {
      const list = this.list;
      console.log(list, "list1");
      this.$axios
        .post(`/api/createStudent/batchCreateStudent`, { list })
        .then((res) => {
          console.log(res, "res");
        });
    },
    doDown() {
      let url = "../../EXcel/Export2Excel.js";
      window.location.href = url;
    },

    // 上传附件
    handleChange(file, fileList) {
      console.log('12312321');
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
          message: "附件格式错误，请删除后重新上传！",
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
            let obj = {};
            obj.name = this.da[index]["姓名（必填）"];
            obj.englishName = this.da[index]["英文名字"];
            // obj.age = this.da[index]["年龄"];
            // obj.classes = this.da[index]["班级"];
            obj.weight = this.da[index]["体重"];
            obj.height = this.da[index]["身高"];
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
          "体重",
          "身高",
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