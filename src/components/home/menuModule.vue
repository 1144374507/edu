<template>
  <div>
    <div v-for="(m, row) in menuLs" class="denyMenuCls" :key="row">
      <div v-for="(m, cell) in menuLs" class="denyMenuCls-item" :key="cell">
        <div v-if="menuLs[row][cell].length == 1" class="deny-menu-item">
          <div class="menu-title">{{ menuLs[row][cell][0].name }}</div>
          <div
            class="menu-item"
            v-for="(s, index) in menuLs[row][cell][0].subLs"
            :key="index"
            @click="handleSelect(s.url, s.subLs)"
          >
            <el-menu-item :id="s.labelName" :index="s.labelName">
              {{ s.name }}
            </el-menu-item>
          </div>
        </div>
        <div v-if="menuLs[row][cell].length > 1" class="deny-menu-item">
          <div
            class="deny-menu-item"
            v-for="(ms, index) in menuLs[row][cell]"
            :key="index"
          >
            <div class="menu-title"><!-- {{ms.name}} --></div>
            <div
              class="menu-item"
              v-for="(s, sIndex) in ms.subLs"
              :key="sIndex"
              @click="handleSelect(s.url, s.subLs)"
            >
              <el-menu-item :id="s.labelName" :index="s.labelName">
                {{ s.name }}
              </el-menu-item>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  props: ["subMenuLs", "handleSelect"],
  data() {
    return {
      menuLs: null,
      maxRow: 5,
      maxCell: 10,
    };
  },
  mounted() {
    this.initMenuModules();
  },
  methods: {
    initMenuModules() {
      if (this.subMenuLs.length == 0) return;
      this.menuLs = new Array(this.maxRow);
      for (let i = 0; i < this.maxRow; i++) {
        this.menuLs[i] = new Array(this.maxCell);
        for (let j = 0; j < this.maxCell; j++) {
          this.menuLs[i][j] = [];
        }
      }
      for (let m of this.subMenuLs) {
        if (!m || m.isDisabled) continue;
        if (m.rowIndex && m.cellIndex) {
          console.info(m);
          this.menuLs[m.cellIndex][m.rowIndex].push(m);
        }
      }
    },
  },
};
</script>

