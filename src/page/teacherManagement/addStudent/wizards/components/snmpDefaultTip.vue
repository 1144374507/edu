<template>
  <div>
    <p class="tp-title">缺省SNMP模板</p>
    <div class="tp-item">
      <span class="label-item">SNMP版本号：</span><span>v2c</span>
    </div>
    <div class="tp-item">
      <span class="label-item">读团体字：</span><span>public</span>
    </div>
    <div class="tp-item">
      <span class="label-item">写团体字：</span><span>public</span>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.tp-title {
  font-weight: bold;
}
.tp-item {
  padding: 5px 0;
  display: flex;
  align-items: center;
}
.label-item {
  display: inline-block;
  width: 120px;
}
</style>
