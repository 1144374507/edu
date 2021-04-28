<template>
  <div class="__p_13f_u_66" style="height: 100%; width: 100%">
    <div class="__p_13f_u_100">
      <!-- 标题  老师列表-->
      <el-row
        type="flex"
        justify="start"
        align="top"
        :gutter="0"
        class="__p_137_u_270"
      >
        <el-col :span="12" :offset="0" :push="0" :pull="0">
          <el-row
            type="flex"
            justify="start"
            align="top"
            :gutter="0"
            class="__p_137_u_272"
          >
            <el-col
              :span="12"
              :offset="0"
              :push="0"
              :pull="0"
              class="__p_137_u_273"
              ><span class="__p_137_u_274">学生列表</span></el-col
            >
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="__p_13f_u_100 ____p_13f_u_103__wrap__">
      <!-- 搜索框 -->
      <el-row
        type="flex"
        justify="start"
        align="top"
        :gutter="0"
        class="__p_13f_u_103"
      >
        <div style="margin-top: 15px">
          <el-input
            placeholder="请输入内容"
            v-model="form.value"
            class="input-with-select"
          >
            <el-select
              v-model="form.key"
              slot="prepend"
              width="100px"
              placeholder="请选择"
            >
              <el-option label="年级" value="grades"></el-option>
              <el-option label="名字" value="name"></el-option>
              <el-option label="学号" value="schoolNumber"></el-option>
            </el-select>
            <el-button
              @click="goSearch"
              slot="append"
              icon="el-icon-search"
            ></el-button>
          </el-input>
        </div>
      </el-row>

      <!-- 标题 已删除占位 -->
      <el-row
        type="flex"
        justify="start"
        align="top"
        :gutter="0"
        class="__p_13f_u_104"
      >
        <el-col
          :span="12"
          :offset="0"
          :push="0"
          :pull="0"
          class="__p_13f_u_110"
        >
        </el-col>
      </el-row>
    </div>

    <!-- 学生列表 -->
    <div>
      <div>
        <el-table
          class="__studebt__list__wrap__"
          :data="classmenbel"
          stripe
          highlight-current-row
          height="670"
        >
          <el-table-column fixed type="index" width="50"> </el-table-column>
          <el-table-column
            label="姓名"
            prop="name"
            width="150"
            align="left"
            header-align="left"
          ></el-table-column
          ><el-table-column
            label="英文姓名"
            prop="englishName"
            width="150"
            align="left"
            header-align="left"
          ></el-table-column>
          <el-table-column
            label="性别"
            prop="sex"
            width="150"
            align="left"
            header-align="left"
          ></el-table-column>
          <el-table-column
            label="年级"
            prop="grades"
            width="150px"
            align="left"
            header-align="left"
          ></el-table-column>
          <el-table-column
            label="学号"
            prop="schoolNumber"
            width="150px"
            align="left"
            header-align="left"
          ></el-table-column>
          <el-table-column
            label="联系方式"
            prop="tel"
            width="150px"
            align="left"
            header-align="left"
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
                style="margin-left: 0px; margin-right: 15px"
                @click="deleteStudent(scope.row.cid)"
                >删除</el-button
              >
            </div>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <!-- <el-dialog
      :visible.sync="addTeacherVisible"
      :close-on-click-modal="false"
      width="480px"
      top="5vh"
    >
      <addTeacher
        v-if="addTeacherVisible"
        :id="id"
        :classes="classes"
        :isaddTeacher="isaddTeacher"
        :payload="addTeacherVisible"
        @cancel="addTeacherVisible = false"
        @updata="updata"
      ></addTeacher>
    </el-dialog> -->
  </div>
</template>

<script>
// import addTeacher from "../addStudent/addStundent";
import scroll from "@/common/scroll";
import qs from "qs";
export default {
  name: "classMessage",
  components: {
    // addTeacher,
    scroll,
  },
  props: {
    classes: {},
    teacherMessage: {},
    id: {},
  },
  data() {
    return {
      classmenbel: [],
      addTeacherVisible: false,
      isaddTeacher: "",
      value: "高一  ",
      input3: "123",
      select: "年级",
      form: {
        key: "grades",
        value: "",
      },
    };
  },
  methods: {
    // 删除
    deleteTeacher(cid) {
      this.$confirm("确认删除吗？").then(() => {
        const loading = this.$loading({
          lock: true,
          text: "处理中",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });

        this.$axios
          .delete(`/api/teacherManagement/deleteClass/deleteTeacher/${cid}`)
          .then((res) => {
            if (res.data.success) {
              this.$message.success("删除成功");
              this.$emit("updata");
              loading.close();
            }
          });
      });
    },

    getData() {
      const loading = this.$loading({
        lock: true,
        text: "处理中",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      this.$axios.get("/api/addClass/getStudents").then((res) => {
        if (res.data.success) {
          this.studentsData = res.data.list;
          this.classmenbel = res.data.list;
          this.$message.success("查询成功");
          loading.close();
        } else {
          loading.close();
          this.$message.success("查询失败，请重试");
        }
      });
    },

    goSearch() {
      const loading = this.$loading({
        lock: true,
        text: "处理中",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      
      this.$axios
        .get(`/api/addClass/getStudents2?${this.form.key}=${this.form.value}`)
        .then((res) => {
          if (res.data.success) {
            this.studentsData = res.data.list;
            this.classmenbel = res.data.list;
            this.$message.success("查询成功");
            loading.close();
          }else {
          loading.close();
          this.$message.success("查询失败，请重试");
        }
        });
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style>
</style>

<style>
.__p_137_u_4 {
  vertical-align: bottom;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>

<style scoped>
.__p_137_u_144 {
  text-align: left;
  color: #290d0d;
  font-size: 14px;
}

.__p_137_u_142 {
  width: 157px;
  text-align: left;
  background: #9ce9eb;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-end;
  align-items: center;
  height: 44px;
  border-radius: 5px;
  margin-right: 5px;
  padding-right: 5px;
}

.__p_137_u_152 {
  text-align: left;
  color: #290d0d;
  font-size: 14px;
}

.__p_137_u_151 {
  width: 350px;
  text-align: left;
  background: #abf4f4;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  height: 44px;
  border-radius: 5px;
  padding-left: 5px;
}

.__p_137_u_141 {
  height: 53px;
  margin-left: auto;
  margin-right: 5px;
  display: flex;
  vertical-align: middle;
  border-bottom: 1px dotted #bbbbbb;
  text-align: left;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
}

.__p_137_u_155 {
  text-align: left;
  color: #290d0d;
  font-size: 14px;
}

.__p_137_u_154 {
  width: 157px;
  text-align: left;
  background: #9ce9eb;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-end;
  align-items: center;
  height: 44px;
  border-radius: 5px;
  margin-right: 5px;
  padding-right: 5px;
}

.__p_137_u_157 {
  text-align: left;
  color: #290d0d;
  font-size: 14px;
}

.__p_137_u_156 {
  width: 350px;
  text-align: left;
  background: #abf4f4;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  height: 44px;
  border-radius: 5px;
  padding-left: 5px;
}

.__p_137_u_153 {
  height: 53px;
  margin-left: auto;
  margin-right: 5px;
  display: flex;
  vertical-align: middle;
  border-bottom: 1px dotted #bbbbbb;
  text-align: left;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
}

.__p_137_u_160 {
  text-align: left;
  color: #290d0d;
  font-size: 14px;
}

.__p_137_u_159 {
  width: 157px;
  text-align: left;
  background: #9ce9eb;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-end;
  align-items: center;
  height: 44px;
}

.__p_137_u_162 {
  text-align: left;
  color: #290d0d;
  font-size: 14px;
}

.__p_137_u_161 {
  width: 350px;
  text-align: left;
  background: #faffff;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  height: 44px;
}

.__p_137_u_158 {
  height: 53px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  vertical-align: middle;
  border-bottom: 1px dotted #bbbbbb;
  text-align: left;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
}

.__p_137_u_165 {
  text-align: left;
  color: #290d0d;
  font-size: 14px;
}

.__p_137_u_164 {
  width: 157px;
  text-align: left;
  background: #9ce9eb;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-end;
  align-items: center;
  height: 44px;
}

.__p_137_u_167 {
  text-align: left;
  color: #290d0d;
  font-size: 14px;
}

.__p_137_u_166 {
  width: 350px;
  text-align: left;
  background: #faffff;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  height: 44px;
}

.__p_137_u_163 {
  height: 53px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  vertical-align: middle;
  border-bottom: 1px dotted #bbbbbb;
  text-align: left;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
}

.__p_137_u_170 {
  text-align: left;
  color: #290d0d;
  font-size: 14px;
}

.__p_137_u_169 {
  width: 157px;
  text-align: left;
  background: #9ce9eb;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-end;
  align-items: center;
  height: 44px;
}

.__p_137_u_172 {
  text-align: left;
  color: #290d0d;
  font-size: 14px;
}

.__p_137_u_171 {
  width: 350px;
  text-align: left;
  background: #faffff;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  height: 44px;
}

.__p_137_u_168 {
  height: 53px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  vertical-align: middle;
  border-bottom: 1px dotted #bbbbbb;
  text-align: left;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
}

.__p_137_u_175 {
  text-align: left;
  color: #290d0d;
  font-size: 14px;
}

.__p_137_u_174 {
  width: 157px;
  text-align: left;
  background: #9ce9eb;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-end;
  align-items: center;
  height: 44px;
}

.__p_137_u_177 {
  text-align: left;
  color: #290d0d;
  font-size: 14px;
}

.__p_137_u_176 {
  width: 350px;
  text-align: left;
  background: #faffff;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  height: 44px;
}

.__p_137_u_173 {
  height: 53px;
  margin-left: auto;
  margin-right: 5px;
  display: flex;
  vertical-align: middle;
  border-bottom: 1px dotted #bbbbbb;
  text-align: left;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
}

.__p_137_u_139 {
  width: 561px;
  border-right: 1px solid #bbbbbb;
}

.__p_137_u_223 {
  text-align: left;
  color: #290d0d;
  font-size: 14px;
}

.__p_137_u_222 {
  width: 157px;
  text-align: left;
  background: #9ce9eb;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-end;
  align-items: center;
  height: 44px;
  border-radius: 5px;
  margin-right: 5px;
  padding-right: 5px;
}

.__p_137_u_225 {
  text-align: left;
  color: #290d0d;
  font-size: 14px;
}

.__p_137_u_224 {
  width: 350px;
  text-align: left;
  background: #abf4f4;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  height: 44px;
  border-radius: 5px;
  padding-left: 5px;
  margin-right: 5px;
}

.__p_137_u_221 {
  height: 53px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  vertical-align: middle;
  border-bottom: 1px dotted #bbbbbb;
  text-align: left;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
}

.__p_137_u_228 {
  text-align: left;
  color: #290d0d;
  font-size: 14px;
}

.__p_137_u_227 {
  width: 157px;
  text-align: left;
  background: #9ce9eb;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-end;
  align-items: center;
  height: 44px;
  border-radius: 5px;
  margin-right: 5px;
  padding-right: 5px;
}

.__p_137_u_230 {
  text-align: left;
  color: #290d0d;
  font-size: 14px;
}

.__p_137_u_229 {
  width: 350px;
  text-align: left;
  background: #abf4f4;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  height: 44px;
  border-radius: 5px;
  padding-left: 5px;
}

.__p_137_u_226 {
  height: 53px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  vertical-align: middle;
  border-bottom: 1px dotted #bbbbbb;
  text-align: left;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
}

.__p_137_u_235 {
  text-align: left;
  color: #290d0d;
  font-size: 14px;
}

.__p_137_u_234 {
  width: 157px;
  text-align: left;
  background: #9ce9eb;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-end;
  align-items: center;
  height: 44px;
  border-radius: 5px;
  margin-right: 5px;
  padding-right: 5px;
}

.__p_137_u_237 {
  text-align: left;
  color: #290d0d;
  font-size: 14px;
}

.__p_137_u_236 {
  width: 350px;
  text-align: left;
  background: #abf4f4;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  height: 44px;
  border-radius: 5px;
  padding-left: 5px;
  margin-right: 5px;
}

.__p_137_u_233 {
  height: 53px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  vertical-align: middle;
  border-bottom: 1px dotted #bbbbbb;
  text-align: left;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
}

.__p_137_u_241 {
  text-align: left;
  color: #290d0d;
  font-size: 14px;
}

.__p_137_u_240 {
  width: 157px;
  text-align: left;
  background: #9ce9eb;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-end;
  align-items: center;
  height: 44px;
  border-radius: 5px;
  margin-right: 5px;
  padding-right: 5px;
}

.__p_137_u_243 {
  text-align: left;
  color: #290d0d;
  font-size: 14px;
}

.__p_137_u_242 {
  width: 350px;
  text-align: left;
  background: #abf4f4;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  height: 44px;
  border-radius: 5px;
  padding-left: 5px;
}

.__p_137_u_239 {
  height: 53px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  vertical-align: middle;
  border-bottom: 1px dotted #bbbbbb;
  text-align: left;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
}

.__p_137_u_248 {
  text-align: left;
  color: #290d0d;
  font-size: 14px;
}

.__p_137_u_247 {
  width: 157px;
  text-align: left;
  background: #9ce9eb;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-end;
  align-items: center;
  height: 44px;
}

.__p_137_u_250 {
  text-align: left;
  color: #290d0d;
  font-size: 14px;
}

.__p_137_u_249 {
  width: 350px;
  text-align: left;
  background: #faffff;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  height: 44px;
}

.__p_137_u_246 {
  height: 53px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  vertical-align: middle;
  border-bottom: 1px dotted #bbbbbb;
  text-align: left;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
}

.__p_137_u_254 {
  text-align: left;
  color: #290d0d;
  font-size: 14px;
}

.__p_137_u_253 {
  width: 157px;
  text-align: left;
  background: #9ce9eb;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-end;
  align-items: center;
  height: 44px;
}

.__p_137_u_256 {
  text-align: left;
  color: #290d0d;
  font-size: 14px;
}

.__p_137_u_255 {
  width: 350px;
  text-align: left;
  background: #faffff;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  height: 44px;
}

.__p_137_u_252 {
  height: 53px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  vertical-align: middle;
  border-bottom: 1px dotted #bbbbbb;
  text-align: left;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
}

.__p_137_u_261 {
  text-align: left;
  color: #290d0d;
  font-size: 14px;
}

.__p_137_u_260 {
  width: 157px;
  text-align: left;
  background: #9ce9eb;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-end;
  align-items: center;
  height: 44px;
}

.__p_137_u_263 {
  text-align: left;
  color: #290d0d;
  font-size: 14px;
}

.__p_137_u_262 {
  width: 350px;
  text-align: left;
  background: #faffff;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  height: 44px;
}

.__p_137_u_259 {
  height: 53px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  vertical-align: middle;
  border-bottom: 1px dotted #bbbbbb;
  text-align: left;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
}

.__p_137_u_267 {
  text-align: left;
  color: #290d0d;
  font-size: 14px;
}

.__p_137_u_266 {
  width: 157px;
  text-align: left;
  background: #9ce9eb;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-end;
  align-items: center;
  height: 44px;
}

.__p_137_u_269 {
  text-align: left;
  color: #290d0d;
  font-size: 14px;
}

.__p_137_u_268 {
  width: 350px;
  text-align: left;
  background: #faffff;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  height: 44px;
}

.__p_137_u_265 {
  height: 53px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  vertical-align: middle;
  border-bottom: 1px dotted #bbbbbb;
  text-align: left;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
}

.__p_137_u_274 {
  text-align: left;
  color: #290d0d;
  font-size: 14px;
  font-weight: bold;
}

.__p_137_u_273 {
  width: 228px;
  text-align: left;
  background: #f8f8f4;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  height: 44px;
  border-radius: 30px;
}

.__p_137_u_272 {
  height: 53px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  vertical-align: middle;
  text-align: left;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  width: 210px;
}

.__p_137_u_270 {
  text-align: center;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #bbbbbb;
  width: 1000px;
}

.__p_137_u_140 {
  /* height: 807px; */
  width: 824px;
  padding-top: 8px;
  padding-left: 8px;
}

.__p_137_u_138 {
  /* height: 824px; */
}

.__p_137_u_137 {
  height: 842px;
}
.__p_137_u_223 {
  text-align: left;
  color: #290d0d;
  font-size: 14px;
}

.__p_137_u_222 {
  width: 157px;
  text-align: left;
  background: #9ce9eb;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-end;
  align-items: center;
  height: 44px;
  border-radius: 5px;
  margin-right: 5px;
  padding-right: 5px;
}

.__p_137_u_225 {
  text-align: left;
  color: #290d0d;
  font-size: 14px;
}

.__p_137_u_224 {
  width: 350px;
  text-align: left;
  background: #abf4f4;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  height: 44px;
  border-radius: 5px;
  padding-left: 5px;
  margin-right: 30px;
}

.__p_137_u_221 {
  height: 53px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  vertical-align: middle;
  border-bottom: 1px dotted #bbbbbb;
  text-align: left;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
}

.__p_137_u_219 {
  width: 491px;
}

.__p_137_u_218 {
  width: 456px;
  margin-right: 20px;
}

.__p_137_u_364 {
  text-align: left;
  color: #290d0d;
  font-size: 14px;
}

.__p_137_u_363 {
  width: 157px;
  text-align: left;
  background: #9ce9eb;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-end;
  align-items: center;
  height: 44px;
  border-radius: 5px;
  margin-right: 5px;
  margin-left: 5px;
  padding-right: 5px;
}

.__p_137_u_366 {
  text-align: left;
  color: #290d0d;
  font-size: 14px;
  /* margin-right: 10px; */
}

.__p_137_u_365 {
  width: 350px;
  text-align: left;
  background: #abf4f4;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  height: 44px;
  border-radius: 5px;
  padding-left: 5px;
  margin-right: 20px;
}

.__p_137_u_362 {
  height: 53px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  vertical-align: middle;
  border-bottom: 1px dotted #bbbbbb;
  text-align: left;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
}

.__p_137_u_361 {
  width: 491px;
}

.__p_137_u_360 {
  width: 456px;
}

.__p_137_u_140 {
  height: auto;
  width: 966px;
  padding-top: 8px;
  padding-left: 8px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
}

.__p_137_u_1402 {
  width: 966px;
}
.__p_137_u_138 {
  /* height: 824px; */
}
</style>

<style lang="less">
.__p_13f_u_87 {
  width: 80vw;
}
.__eid__el-main__ {
  .el-main {
    overflow: visible;
    height: auto !important;
    // height: 800px;
  }
  .__p_137_u_273 {
    margin-bottom: 5px;
    margin-top: 5px;
  }
  .__p_137_u_140 {
    margin-bottom: 18px;
  }
}
</style>
 

 <style lang="scss">
.____p_13f_u_103__wrap__ {
  .__p_13f_u_103 {
    margin-top: 20px;
  }
  .el-select .el-input {
    width: auto;
    min-width: 100px;
    max-width: 120px;
  }
}
.__studebt__list__wrap__ {
  max-height: 667px;
  overflow: auto;
}
</style>

