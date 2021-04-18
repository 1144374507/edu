<template>
	<div>
		<p class="th-errorTip" v-for="p in params">{{p}}</p>
	</div>
</template>

<script type="text/javascript">
	export default {
		data() {
			return {
				params:""
			}
		},
		mounted: function() {
			this.params = this.$route.params
		},
		updated: function() {
			this.params = this.$route.params
		}
	}
</script>

<style lang="scss" scoped>
    .th-errorTip {
        font-size: 20px;
        text-align: center;
        color: rgb(192, 204, 218);
    }
</style>