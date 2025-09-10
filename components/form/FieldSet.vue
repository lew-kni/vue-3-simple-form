<template>
	<fieldset class="fieldset" :class="{ 'w-full': isFullWidth }">
		<slot />
	</fieldset>
</template>
<script setup lang="ts">
	const props = defineProps({
		isFullWidth: {
			type: Boolean,
			default: false,
		},
	});
</script>
<style scoped lang="scss"></style>
