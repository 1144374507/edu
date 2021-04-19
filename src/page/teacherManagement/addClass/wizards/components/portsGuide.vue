<template>
    <div>
        <div class="__p_12O_u_2">
            <span class="__p_12O_u_3">查看设备型号端口数</span>
            <div class="__p_12O_u_4" style="max-height: 290px; overflow-y: auto">
                <div class="__p_12O_u_5" v-for="item, $index in list" :key="$index">
                    <div class="__p_12O_u_6">
                        <span>{{item.model}}</span>
                    </div>
                    <div class="__p_12O_u_7">
                        <span class="__p_12O_u_11">{{item.portNum}}口</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            list: [
                { model: "RG-SF2900-8GT2SFP-S", portNum: 8 },
                { model: "RG-SF2900-8GT2SFP-P-S", portNum: 8 },
                { model: "RG-SF2900-16GT2SFP", portNum: 16 },
                { model: "RG-SF2900-16GT2SFP-P", portNum: 16 },
                { model: "RG-SF2910-4GT2XS-P", portNum: 4 },
                { model: "RG-SF2910-8GT2MG2XS", portNum: 10 },
                { model: "RG-SF2910-8GT2MG2XS-P", portNum: 10 },
                { model: "RG-SF2910-16GT2MG2XS", portNum: 18 },
                { model: "RG-SF2910-16GT2MG2XS-P", portNum: 18 },
                { model: "RG-SF2910-24GT4XS-UP", portNum: 24 },
                { model: "RG-S2900-8GT2SFP-L", portNum: 8 },
                { model: "RG-S2900-8GT2SFP-P-L", portNum: 8 },
                { model: "RG-S2900-18GT2SFP-L", portNum: 18 },
                { model: "RG-S2900-24GT4SFP/2GT-L", portNum: 26 },
                { model: "RG-S2900-24GT4SFP/2GT-P-L", portNum: 26 },
                { model: "RG-S2910-24GT4SFP-L", portNum: 24 },
                { model: "RG-S2910-24GT4SFP-P-L", portNum: 24 },
                { model: "RG-S2910-24GT4XS-L", portNum: 24 },
                { model: "RG-S2910-24GT4XS-P-L", portNum: 24 },
                { model: "RG-S2910-48GT4SFP-L", portNum: 48 },
                { model: "RG-S2910-48GT4XS-L", portNum: 48 },
                { model: "RG-S2910C-48GT2XS-P-L", portNum: 48 },
            ],
        };
    },
};
</script>

<style scoped>
.__p_12O_u_3 {
    font-size: 16px;
    font-weight: bold;
    color: #212527;
}

.__p_12O_u_6 {
    flex: 1;
}

.__p_12O_u_11 {
    font-size: 12px;
    color: #026df7;
    background: rgba(2, 109, 247, 0.1);
    border-radius: 8px;
    border: 1px solid rgba(2, 109, 247, 0.4);
    padding-left: 4px;
    padding-right: 4px;
    line-height: 16px;
}

.__p_12O_u_7 {
    flex: 0.3;
}

.__p_12O_u_5 {
    display: flex;
    line-height: 32px;
}

.__p_12O_u_14 {
    flex: 1;
}

.__p_12O_u_17 {
    font-size: 12px;
    color: #026df7;
    background: rgba(2, 109, 247, 0.1);
    border-radius: 8px;
    border: 1px solid rgba(2, 109, 247, 0.4);
    padding-left: 4px;
    padding-right: 4px;
    line-height: 16px;
}

.__p_12O_u_16 {
    flex: 0.3;
}

.__p_12O_u_13 {
    display: flex;
    line-height: 32px;
}

.__p_12O_u_19 {
    flex: 1;
}

.__p_12O_u_22 {
    font-size: 12px;
    color: #026df7;
    background: rgba(2, 109, 247, 0.1);
    border-radius: 8px;
    border: 1px solid rgba(2, 109, 247, 0.4);
    padding-left: 4px;
    padding-right: 4px;
    line-height: 16px;
}

.__p_12O_u_21 {
    flex: 0.3;
}

.__p_12O_u_18 {
    display: flex;
    line-height: 32px;
}

.__p_12O_u_24 {
    flex: 1;
}

.__p_12O_u_27 {
    font-size: 12px;
    color: #026df7;
    background: rgba(2, 109, 247, 0.1);
    border-radius: 8px;
    border: 1px solid rgba(2, 109, 247, 0.4);
    padding-left: 4px;
    padding-right: 4px;
    line-height: 16px;
}

.__p_12O_u_26 {
    flex: 0.3;
}

.__p_12O_u_23 {
    display: flex;
    line-height: 32px;
}

.__p_12O_u_29 {
    flex: 1;
}

.__p_12O_u_32 {
    font-size: 12px;
    color: #026df7;
    background: rgba(2, 109, 247, 0.1);
    border-radius: 8px;
    border: 1px solid rgba(2, 109, 247, 0.4);
    padding-left: 4px;
    padding-right: 4px;
    line-height: 16px;
}

.__p_12O_u_31 {
    flex: 0.3;
}

.__p_12O_u_28 {
    display: flex;
    line-height: 32px;
}

.__p_12O_u_4 {
    margin-top: 24px;
}

.__p_12O_u_2 {
    min-width: 256px;
    background: #ffffff;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 12px;
    padding-right: 12px;
}
</style>

<style scoped lang="scss">
.theme-18edd0{
    .__p_12O_u_2{
      background-color: transparent;
    }
    .__p_12O_u_3{
        color: #fff;
    }
    .__p_12O_u_11{
        color: #1ce8cc;
        border-color: rgba(50, 118, 117, 1);
    }
}
</style>