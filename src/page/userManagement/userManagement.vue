<template>
  <div class="__eid__el-main__">
    <el-container style="height: 94vh; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1']" default-active="1-1">
          <el-submenu index="1">
            <template slot="title"
              ><i class="el-icon-message"></i>个人管理</template
            >
            <el-menu-item index="1-1">学生学籍信息</el-menu-item>
            <!-- <el-menu-item index="1-2">个人信息修改</el-menu-item> -->
            <el-menu-item index="1-3">奖惩信息</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <!-- 头像 -->
        <el-header style="text-align: left; font-size: 12px; height: 155px">
          <div>
            <div>
              <img
                src="http://vve.qiniu.qjzd.net/FhoxiAgrwxt4pfXTbbMTgB9j7hpy"
                class="__p_137_u_4"
              />
            </div>
            <div><span>我是文本</span></div>
          </div>
        </el-header>

        <el-main>
          <div>
            <div class="__p_137_u_137">
              <el-row
                type="flex"
                justify="start"
                align="top"
                :gutter="0"
                class="__p_137_u_138"
              >
                <!-- 基础信息 -->
                <el-col
                  :span="12"
                  :offset="0"
                  :push="0"
                  :pull="0"
                  class="__p_137_u_139"
                >
                  <el-row
                    type="flex"
                    justify="start"
                    align="top"
                    :gutter="0"
                    class="__p_137_u_141"
                  >
                    <el-col
                      :span="12"
                      :offset="0"
                      :push="0"
                      :pull="0"
                      class="__p_137_u_142"
                      ><span class="__p_137_u_144">身 高：</span></el-col
                    >
                    <el-col
                      :span="12"
                      :offset="0"
                      :push="0"
                      :pull="0"
                      class="__p_137_u_151"
                      ><span class="__p_137_u_152">
                        {{ personMessage[0].height }}</span
                      ></el-col
                    >
                  </el-row>
                  <el-row
                    type="flex"
                    justify="start"
                    align="top"
                    :gutter="0"
                    class="__p_137_u_141"
                  >
                    <el-col
                      :span="12"
                      :offset="0"
                      :push="0"
                      :pull="0"
                      class="__p_137_u_142"
                      ><span class="__p_137_u_144">体 重：</span></el-col
                    >
                    <el-col
                      :span="12"
                      :offset="0"
                      :push="0"
                      :pull="0"
                      class="__p_137_u_151"
                      ><span class="__p_137_u_152">
                        {{ personMessage[0].weight }}</span
                      ></el-col
                    >
                  </el-row>
                  <el-row
                    type="flex"
                    justify="start"
                    align="top"
                    :gutter="0"
                    class="__p_137_u_141"
                  >
                    <el-col
                      :span="12"
                      :offset="0"
                      :push="0"
                      :pull="0"
                      class="__p_137_u_142"
                      ><span class="__p_137_u_144">电 话：</span></el-col
                    >
                    <el-col
                      :span="12"
                      :offset="0"
                      :push="0"
                      :pull="0"
                      class="__p_137_u_151"
                      ><span class="__p_137_u_152">
                        {{ personMessage[0].tel }}</span
                      ></el-col
                    >
                  </el-row>
                  <el-row
                    type="flex"
                    justify="start"
                    align="top"
                    :gutter="0"
                    class="__p_137_u_141"
                  >
                    <el-col
                      :span="12"
                      :offset="0"
                      :push="0"
                      :pull="0"
                      class="__p_137_u_142"
                      ><span class="__p_137_u_144">个人主页：</span></el-col
                    >
                    <el-col
                      :span="12"
                      :offset="0"
                      :push="0"
                      :pull="0"
                      class="__p_137_u_151"
                      ><span class="__p_137_u_152">
                        {{ personMessage[0].homepage }}</span
                      ></el-col
                    >
                  </el-row>
                  <el-row
                    type="flex"
                    justify="start"
                    align="top"
                    :gutter="0"
                    class="__p_137_u_141"
                  >
                    <el-col
                      :span="12"
                      :offset="0"
                      :push="0"
                      :pull="0"
                      class="__p_137_u_142"
                      ><span class="__p_137_u_144">个人简介：</span></el-col
                    >
                    <el-col
                      :span="12"
                      :offset="0"
                      :push="0"
                      :pull="0"
                      class="__p_137_u_151"
                      ><span class="__p_137_u_152">
                        {{ personMessage[0].profile }}</span
                      ></el-col
                    >
                  </el-row>
                  <el-row
                    type="flex"
                    justify="start"
                    align="top"
                    :gutter="0"
                    class="__p_137_u_141"
                  >
                    <el-col
                      :span="12"
                      :offset="0"
                      :push="0"
                      :pull="0"
                      class="__p_137_u_142"
                      ><span class="__p_137_u_144">Q Q：</span></el-col
                    >
                    <el-col
                      :span="12"
                      :offset="0"
                      :push="0"
                      :pull="0"
                      class="__p_137_u_151"
                      ><span class="__p_137_u_152">
                        {{ personMessage[0].qq }}</span
                      ></el-col
                    >
                  </el-row>
                  <el-row
                    type="flex"
                    justify="start"
                    align="top"
                    :gutter="0"
                    class="__p_137_u_141"
                  >
                    <el-col
                      :span="12"
                      :offset="0"
                      :push="0"
                      :pull="0"
                      class="__p_137_u_142"
                      ><span class="__p_137_u_144">邮 箱 ：</span></el-col
                    >
                    <el-col
                      :span="12"
                      :offset="0"
                      :push="0"
                      :pull="0"
                      class="__p_137_u_151"
                      ><span class="__p_137_u_152">
                        {{ personMessage[0].email }}</span
                      ></el-col
                    >
                  </el-row>
                  <el-row
                    type="flex"
                    justify="start"
                    align="top"
                    :gutter="0"
                    class="__p_137_u_141"
                  >
                    <el-col
                      :span="12"
                      :offset="0"
                      :push="0"
                      :pull="0"
                      class="__p_137_u_142"
                      ><span class="__p_137_u_144">邮 编 ：</span></el-col
                    >
                    <el-col
                      :span="12"
                      :offset="0"
                      :push="0"
                      :pull="0"
                      class="__p_137_u_151"
                      ><span class="__p_137_u_152">
                        {{ personMessage[0].postcode }}</span
                      ></el-col
                    >
                  </el-row>
                  <el-row
                    type="flex"
                    justify="start"
                    align="top"
                    :gutter="0"
                    class="__p_137_u_141"
                  >
                    <el-col
                      :span="12"
                      :offset="0"
                      :push="0"
                      :pull="0"
                      class="__p_137_u_142"
                      ><span class="__p_137_u_144">家长信息 ：</span></el-col
                    >
                    <el-col
                      :span="12"
                      :offset="0"
                      :push="0"
                      :pull="0"
                      class="__p_137_u_151"
                      ><span class="__p_137_u_152">
                        {{ personMessage[0].parents }}</span
                      ></el-col
                    >
                  </el-row>
                  <el-button
                    style="margin-left: 16px; margin-top: 26px"
                    @click="goQuickConfig"
                  >
                    修改个人信息
                  </el-button>
                </el-col>

                <el-col
                  :span="12"
                  :offset="0"
                  :push="0"
                  :pull="0"
                  class="__p_137_u_1402"
                >
                  <!-- 学籍信息 -->
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
                          ><span class="__p_137_u_274">学籍信息</span></el-col
                        >
                      </el-row>
                    </el-col>
                  </el-row>

                  <el-collapse accordion>
                    <el-collapse-item title="查看详情">
                      <el-row
                        type="flex"
                        justify="start"
                        align="top"
                        :gutter="0"
                        class="__p_137_u_138"
                      >
                        <el-col
                          :span="12"
                          :offset="0"
                          :push="0"
                          :pull="0"
                          class="__p_137_u_140"
                        >
                          <el-row
                            type="flex"
                            justify="start"
                            align="top"
                            :gutter="0"
                            class="__p_137_u_360"
                          >
                            <el-col
                              :span="12"
                              :offset="0"
                              :push="0"
                              :pull="0"
                              class="__p_137_u_361"
                            >
                              <el-row
                                type="flex"
                                justify="start"
                                align="top"
                                :gutter="0"
                                class="__p_137_u_362"
                              >
                                <el-col
                                  :span="12"
                                  :offset="0"
                                  :push="0"
                                  :pull="0"
                                  class="__p_137_u_363"
                                  ><span class="__p_137_u_364">
                                    姓名
                                  </span></el-col
                                >
                                <el-col
                                  :span="12"
                                  :offset="0"
                                  :push="0"
                                  :pull="0"
                                  class="__p_137_u_365"
                                  ><span class="__p_137_u_366">{{
                                    personMessage[0].name
                                  }}</span></el-col
                                >
                              </el-row>
                            </el-col>
                          </el-row>

                          <el-row
                            type="flex"
                            justify="start"
                            align="top"
                            :gutter="0"
                            class="__p_137_u_360"
                          >
                            <el-col
                              :span="12"
                              :offset="0"
                              :push="0"
                              :pull="0"
                              class="__p_137_u_361"
                            >
                              <el-row
                                type="flex"
                                justify="start"
                                align="top"
                                :gutter="0"
                                class="__p_137_u_362"
                              >
                                <el-col
                                  :span="12"
                                  :offset="0"
                                  :push="0"
                                  :pull="0"
                                  class="__p_137_u_363"
                                  ><span class="__p_137_u_364">
                                    英文姓名 :</span
                                  ></el-col
                                >
                                <el-col
                                  :span="12"
                                  :offset="0"
                                  :push="0"
                                  :pull="0"
                                  class="__p_137_u_365"
                                  ><span class="__p_137_u_366">{{
                                    personMessage[0].englishName
                                  }}</span></el-col
                                >
                              </el-row>
                            </el-col>
                          </el-row>

                          <el-row
                            type="flex"
                            justify="start"
                            align="top"
                            :gutter="0"
                            class="__p_137_u_360"
                          >
                            <el-col
                              :span="12"
                              :offset="0"
                              :push="0"
                              :pull="0"
                              class="__p_137_u_361"
                            >
                              <el-row
                                type="flex"
                                justify="start"
                                align="top"
                                :gutter="0"
                                class="__p_137_u_362"
                              >
                                <el-col
                                  :span="12"
                                  :offset="0"
                                  :push="0"
                                  :pull="0"
                                  class="__p_137_u_363"
                                  ><span class="__p_137_u_364">
                                    身份证号码
                                  </span></el-col
                                >
                                <el-col
                                  :span="12"
                                  :offset="0"
                                  :push="0"
                                  :pull="0"
                                  class="__p_137_u_365"
                                  ><span class="__p_137_u_366">{{
                                    personMessage[0].idCardNum
                                  }}</span></el-col
                                >
                              </el-row>
                            </el-col>
                          </el-row>
                          <el-row
                            type="flex"
                            justify="start"
                            align="top"
                            :gutter="0"
                            class="__p_137_u_360"
                          >
                            <el-col
                              :span="12"
                              :offset="0"
                              :push="0"
                              :pull="0"
                              class="__p_137_u_361"
                            >
                              <el-row
                                type="flex"
                                justify="start"
                                align="top"
                                :gutter="0"
                                class="__p_137_u_362"
                              >
                                <el-col
                                  :span="12"
                                  :offset="0"
                                  :push="0"
                                  :pull="0"
                                  class="__p_137_u_363"
                                  ><span class="__p_137_u_364">
                                    学号
                                  </span></el-col
                                >
                                <el-col
                                  :span="12"
                                  :offset="0"
                                  :push="0"
                                  :pull="0"
                                  class="__p_137_u_365"
                                  ><span class="__p_137_u_366">{{
                                    personMessage[0].schoolNumber
                                  }}</span></el-col
                                >
                              </el-row>
                            </el-col>
                          </el-row>
                          
                          <el-row
                            type="flex"
                            justify="start"
                            align="top"
                            :gutter="0"
                            class="__p_137_u_360"
                          >
                            <el-col
                              :span="12"
                              :offset="0"
                              :push="0"
                              :pull="0"
                              class="__p_137_u_361"
                            >
                              <el-row
                                type="flex"
                                justify="start"
                                align="top"
                                :gutter="0"
                                class="__p_137_u_362"
                              >
                                <el-col
                                  :span="12"
                                  :offset="0"
                                  :push="0"
                                  :pull="0"
                                  class="__p_137_u_363"
                                  ><span class="__p_137_u_364">
                                    年级
                                  </span></el-col
                                >
                                <el-col
                                  :span="12"
                                  :offset="0"
                                  :push="0"
                                  :pull="0"
                                  class="__p_137_u_365"
                                  ><span class="__p_137_u_366">{{
                                    personMessage[0].grades
                                  }}</span></el-col
                                >
                              </el-row>
                            </el-col>
                          </el-row>

                          <el-row
                            type="flex"
                            justify="start"
                            align="top"
                            :gutter="0"
                            class="__p_137_u_360"
                          >
                            <el-col
                              :span="12"
                              :offset="0"
                              :push="0"
                              :pull="0"
                              class="__p_137_u_361"
                            >
                              <el-row
                                type="flex"
                                justify="start"
                                align="top"
                                :gutter="0"
                                class="__p_137_u_362"
                              >
                                <el-col
                                  :span="12"
                                  :offset="0"
                                  :push="0"
                                  :pull="0"
                                  class="__p_137_u_363"
                                  ><span class="__p_137_u_364">
                                    入学日期：
                                  </span></el-col
                                >
                                <el-col
                                  :span="12"
                                  :offset="0"
                                  :push="0"
                                  :pull="0"
                                  class="__p_137_u_365"
                                  ><span class="__p_137_u_366">{{
                                    personMessage[0].admissionDate
                                  }}</span></el-col
                                >
                              </el-row>
                            </el-col>
                          </el-row>

                          <el-row
                            type="flex"
                            justify="start"
                            align="top"
                            :gutter="0"
                            class="__p_137_u_360"
                          >
                            <el-col
                              :span="12"
                              :offset="0"
                              :push="0"
                              :pull="0"
                              class="__p_137_u_361"
                            >
                              <el-row
                                type="flex"
                                justify="start"
                                align="top"
                                :gutter="0"
                                class="__p_137_u_362"
                              >
                                <el-col
                                  :span="12"
                                  :offset="0"
                                  :push="0"
                                  :pull="0"
                                  class="__p_137_u_363"
                                  ><span class="__p_137_u_364">
                                    入学年级
                                  </span></el-col
                                >
                                <el-col
                                  :span="12"
                                  :offset="0"
                                  :push="0"
                                  :pull="0"
                                  class="__p_137_u_365"
                                  ><span class="__p_137_u_366">{{
                                    personMessage[0].admissionGrade
                                  }}</span></el-col
                                >
                              </el-row>
                            </el-col>
                          </el-row>

                          <el-row
                            type="flex"
                            justify="start"
                            align="top"
                            :gutter="0"
                            class="__p_137_u_360"
                          >
                            <el-col
                              :span="12"
                              :offset="0"
                              :push="0"
                              :pull="0"
                              class="__p_137_u_361"
                            >
                              <el-row
                                type="flex"
                                justify="start"
                                align="top"
                                :gutter="0"
                                class="__p_137_u_362"
                              >
                                <el-col
                                  :span="12"
                                  :offset="0"
                                  :push="0"
                                  :pull="0"
                                  class="__p_137_u_363"
                                  ><span class="__p_137_u_364">
                                    是否留学生：
                                  </span></el-col
                                >
                                <el-col
                                  :span="12"
                                  :offset="0"
                                  :push="0"
                                  :pull="0"
                                  class="__p_137_u_365"
                                  ><span class="__p_137_u_366">{{
                                    personMessage[0].overseas
                                  }}</span></el-col
                                >
                              </el-row>
                            </el-col>
                          </el-row>
                        </el-col>
                      </el-row>
                    </el-collapse-item>
                  </el-collapse>

                  <!-- 招生信息 -->
               

                  
                </el-col>
              </el-row>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
    <rjDialog></rjDialog>
  </div>
</template>

<script>
import personMessage from "./personMessage/personMessage";
import rjDialog from "@/common/dialog";
export default {
  components: {
    rjDialog,
  },
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄",
    };
    return {
      tableData: Array(20).fill(item),
      fits: ["fill"],
      url:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      personMessage: [
        {
          height: "178",
          weight: "65kg",
          tel: "18045207896",
          homepage: "",
          profile: "", //简介
          qq: "1144374507",
          email: "1144374507@qq.com",
          postcode: "366201", //邮编
          parents: "", //家长信息
          name: "江盛锋",
          englishName: "jiangshengfeng",
          schoolNumber: "2017021065",
          idCardNum: "350825199803121116",
          grades: "2017级",
          admissionDate: "20170901", //入学日期
          admissionGrade: "2017级", //入学年级
          overseas: "", //留学生
        },
      ],
      studentStatusInformation: [
        {
          nodeName: "身高",
          nodeValue: "178",
        },
        {
          nodeName: "体重",
          nodeValue: "178",
        },
        {
          nodeName: "手机",
          nodeValue: "16712318899",
        },
        {
          nodeName: "个人主页",
          nodeValue: "178",
        },
        {
          nodeName: "个人简介",
          nodeValue: "178",
        },
        {
          nodeName: "QQ号",
          nodeValue: "1144374507",
        },
        {
          nodeName: "电子邮件",
          nodeValue: "1144374507@qq.com",
        },

        {
          nodeName: "备注",
          nodeValue: "178",
        },
        {
          nodeName: "家长信息",
          nodeValue: "178",
        },
        {
          nodeName: "宿舍地址",
          nodeValue: "178",
        },
        {
          nodeName: "邮编",
          nodeValue: "178",
        },
        {
          nodeName: "宿舍电话",
          nodeValue: "178",
        },
      ],
      admissionsInformation: [
        {
          nodeName: "身高",
          nodeValue: "178",
        },
        {
          nodeName: "体重",
          nodeValue: "178",
        },
        {
          nodeName: "手机",
          nodeValue: "16712318899",
        },
        {
          nodeName: "个人主页",
          nodeValue: "178",
        },
        {
          nodeName: "个人简介",
          nodeValue: "178",
        },
        {
          nodeName: "QQ号",
          nodeValue: "1144374507",
        },
        {
          nodeName: "电子邮件",
          nodeValue: "1144374507@qq.com",
        },

        {
          nodeName: "备注",
          nodeValue: "178",
        },
        {
          nodeName: "家长信息",
          nodeValue: "178",
        },
        {
          nodeName: "宿舍地址",
          nodeValue: "178",
        },
        {
          nodeName: "邮编",
          nodeValue: "178",
        },
        {
          nodeName: "宿舍电话",
          nodeValue: "178",
        },
      ],

      graduationInformation: [
        {
          nodeName: "身高",
          nodeValue: "178",
        },
        {
          nodeName: "体重",
          nodeValue: "178",
        },
        {
          nodeName: "手机",
          nodeValue: "16712318899",
        },
        {
          nodeName: "个人主页",
          nodeValue: "178",
        },
        {
          nodeName: "个人简介",
          nodeValue: "178",
        },
        {
          nodeName: "QQ号",
          nodeValue: "1144374507",
        },
        {
          nodeName: "电子邮件",
          nodeValue: "1144374507@qq.com",
        },

        {
          nodeName: "备注",
          nodeValue: "178",
        },
        {
          nodeName: "家长信息",
          nodeValue: "178",
        },
        {
          nodeName: "宿舍地址",
          nodeValue: "178",
        },
        {
          nodeName: "邮编",
          nodeValue: "178",
        },
        {
          nodeName: "宿舍电话",
          nodeValue: "178",
        },
      ],
    };
  },
  methods: {
    goQuickConfig() {
      this.rjDialog
        .title("快速配置")
        .width("1100px")
        .currentView(personMessage, { routeType: "static" })
        .showClose(true)
        .sizeTiny()
        .closeOnClickModal(false)
        .then((opt) => {})
        .show();
    },
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