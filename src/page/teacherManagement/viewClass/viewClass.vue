<template>
  <div>
    <div
      class="__p_13f_u_66"
      style="height: 100%; width: 100%"
      v-if="!isShowClassMessage"
    >
      <el-row type="flex" justify="start" align="top" :gutter="0">
        <el-col :span="12" :offset="0" :push="0" :pull="0" class="__p_13f_u_87">
          <div class="__p_13f_u_100">
            <!-- 搜索框 -->
            <el-row
              type="flex"
              justify="start"
              align="top"
              :gutter="0"
              class="__p_13f_u_103"
            >
              <!-- 年级 -->
              <el-col
                :span="12"
                :offset="0"
                :push="0"
                :pull="0"
                class="__p_13f_u_105"
                ><span class="__p_13f_u_107">年级</span>
                <el-select
                  placeholder="请输入内容"
                  size="small"
                  class="__p_13f_u_108"
                  v-model="value"
                >
                  <el-option
                    v-for="(item, index) in term"
                    :key="index"
                    :value="item.value"
                    :label="item.label"
                  ></el-option>
                </el-select>
                <el-button type="primary" size="small" class="__p_13f_u_109"
                  >搜索</el-button
                >
              </el-col>

              <!-- 搜索班级 -->
              <el-col
                :span="12"
                :offset="0"
                :push="0"
                :pull="0"
                class="__p_13f_u_198"
                ><span class="__p_13f_u_199">班级</span>

                <el-select
                  placeholder="请输入内容"
                  size="small"
                  class="__p_13f_u_108"
                  v-model="value"
                >
                  <el-option
                    v-for="(item, index) in term"
                    :key="index"
                    :value="item.value"
                    :label="item.label"
                  ></el-option>
                </el-select>
                <el-button type="primary" size="small" class="__p_13f_u_201"
                  >搜索</el-button
                >
              </el-col>
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
          <!-- 班级表格 -->
          <div>
            <el-table :data="data" stripe highlight-current-row>
              <el-table-column type="index" width="50"> </el-table-column>
              <el-table-column
                label="年级"
                prop="grades"
                width="150px"
                align="left"
                header-align="left"
              ></el-table-column>
              <el-table-column
                label="班级"
                prop="classes"
                width="150px"
                align="left"
                header-align="left"
              ></el-table-column>
              <el-table-column
                label="课程名"
                prop="courseName"
                width="150px"
                align="left"
                header-align="left"
              ></el-table-column>
              <el-table-column
                label="班主任"
                prop="monitor"
                width="150px"
                align="left"
                header-align="left"
              ></el-table-column>
              <el-table-column
                label="人数"
                prop="count"
                width="150px"
                align="left"
                header-align="left"
              ></el-table-column>
              <el-table-column label="操作" align="left" header-align="left">
                <div slot-scope="scope">
                  <el-button
                    type="text"
                    style="margin-left: 0px; margin-right: 15px"
                    @click="
                      isShowClassMessageclick(
                        scope.row.classmenbel,
                        scope.row.teacherMessage,
                        scope.row
                      )
                    "
                    >查看班级详情</el-button
                  >
                  <el-button
                    type="text"
                    style="margin-left: 0px; margin-right: 15px"
                    @click="deleteClass(scope.row.id, scope.row)"
                    >删除班级</el-button
                  >
                </div>
              </el-table-column>
            </el-table>
            <el-pagination
              :current-page="1"
              :page-sizes="[50, 100, 200]"
              :page-size="50"
              :total="100"
              layout="total, sizes, prev, pager, next, jumper"
              class="__p_13f_u_128"
            ></el-pagination>
          </div>

          <el-steps :active="0" align-center></el-steps>
        </el-col>
      </el-row>
    </div>

    <classMessage
      v-if="isShowClassMessage"
      :classmenbel="classmenbel"
      @setShowClassMessage="setShowClassMessage"
      @updata="updata"
      :id="updataId"
      :classes="classes"
    ></classMessage>
    <teacherMessage
      @updata="updata"
      :classes="classes"
      :id="updataId"
      v-if="isShowClassMessage"
      :teacherMessage="teacherMessage"
    ></teacherMessage>
    <schedule :id="updataId" v-if="isShowClassMessage" :classmenbel="classmenbel"></schedule>
  </div>
</template>

<script>
import classMessage from "./classMessage";
import schedule from "./schedule";
import teacherMessage from "./teacherMessage";
export default {
  name: "viewClass",
  components: {
    classMessage,
    schedule,
    teacherMessage,
  },
  data() {
    return {
      // let aerr =[ 1,1,1,1] 
      // arr.push(a)
      updataId: "",
      classmenbel: [],
      teacherMessage:[],
      isShowClassMessage: false,
      term: [
        {
          value: "高一/秋季",
          label: "高一/秋季",
        },
        {
          value: "高一/春季",
          label: "高一/春季",
        },
        {
          value: "高二/秋季",
          label: "高二/秋季",
        },
        {
          value: "高二/春季",
          label: "高二/春季",
        },
        {
          value: "高三/秋季",
          label: "高三/秋季",
        },
        {
          value: "高三/春季",
          label: "高三/春季",
        },
      ],
      value: "高一/秋季",
      data: [],
    };
  },
  computed: {},
  watch: {
    // classmenbel: {
    //   handler(val, oldVal) {
    //     // console.log(val.length != oldVal.length , "lenght");
    //     console.log(oldVal, "oldVal");
    //     // this.classmenbel = val;
    //     if (!(oldVal == undefined)) {
    //       // console.log(val.length != oldVal.length || 0, "lenght");
    //       console.log(val.length, oldVal, "lenght");
    //       if (val.length != oldVal.length) {
    //         console.log("我要变了", "mgPortNums");
    //         console.log(val);
    //         console.log(this.classmenbel);
    //         console.log();
    //       }
    //     }
    //   },
    //   immediate: true,
    //   deep: true,
    // },
  },
  methods: {
    updata() {
      this.getdata();
      // this.isShowClassMessage = false;
    },
    deleteClass(id, row) {
      console.log(row);
      this.$confirm("确认删除吗？").then(() => {
        const loading = this.$loading({
          lock: true,
          text: "处理中...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        this.$axios
          .delete(`/api/teacherManagement/deleteclass/${id}`)
          .then((res) => {
            console.log(res);
            if (res.data.succeed) {
              this.$message.success("操作成功");
              loading.close();
              this.getdata();
            }
          });
      });
    },
    isShowClassMessageclick(classmenbel, teacherMessage, scop) {
      console.log(scop, "scop");
      this.updataId = scop.id;
      this.classes = scop.classes;
      this.classmenbel = classmenbel;

      this.teacherMessage = teacherMessage;

      this.isShowClassMessage = true;
    },
    setShowClassMessage() {
      this.isShowClassMessage = false;
    },
    getdata() {
      const loading = this.$loading({
        lock: true,
        text: "处理中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      this.$axios.get("/api/teacherManagement").then((res) => {
        console.log(res);
        if (res.data.success) {
          this.data = res.data.list;
          console.log(this.data);

          // 添加学生刷新数据
          if (!(this.updataId == "")) {
            res.data.list.map((item) => {
              if (item.id == this.updataId) {
                this.classmenbel = item.classmenbel;
                this.teacherMessage = item.teacherMessage;
              }
            });
          }

          loading.close();
        }
      });
    },
  },
  created() {
    this.getdata();
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
<style scoped>