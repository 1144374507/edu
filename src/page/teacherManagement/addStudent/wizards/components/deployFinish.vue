<template>
    <div>
        <div class="__p_12P_u_2">
            <img
                src="/static/vlan-img/thumb.png"
                class="__p_12P_u_3"
            />
            <div class="__p_12P_u_4">
                <span class="__p_12P_u_5">部署向导完成</span>
                <p class="__p_12P_u_6">请在 部署结果 查看部署进度</p>
            </div>
            <el-button type="default" size="small" class="__p_12P_u_8" @click="go"
                >前往部署结果</el-button
            >
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        go(){
            this.$router.push('deployLog')
        }
    }
};
</script>

<style scoped>
.__p_12P_u_3 {
    vertical-align: bottom;
}

.__p_12P_u_5 {
    font-weight: bold;
    font-size: 16px;
    color: #212527;
}

.__p_12P_u_6 {
    font-size: 14px;
    margin-top: 16px;
}

.__p_12P_u_4 {
    margin-top: 36px;
}

.__p_12P_u_8 {
    margin-top: 40px;
    padding-left: 52px;
    padding-right: 52px;
    border-radius: 161px;
    margin-bottom: 78px;
}

.__p_12P_u_2 {
    width: 578px;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    display: block;
}
</style>
<style scoped lang="scss">
.theme-18edd0{
    .__p_12P_u_5{
        color: #a6bbd7;
    }
}
</style>