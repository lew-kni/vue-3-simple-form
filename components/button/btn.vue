<template>
	<input
		:type="type"
		:disabled="disabled"
		:value="text"
		class="inline-flex items-center px-5 py-3 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none transition-all"
		:class="{
			'bg-blue-700 hover:bg-blue-800 focus:ring-blue-300': isBlue,
			'bg-red-700 hover:bg-red-800 focus:ring-red-300': isRed,
			'bg-gray-700 hover:bg-gray-800 focus:ring-gray-300': !isBlue,
			'opacity-50 cursor-not-allowed': disabled,
		}"
	/>
</template>

<script setup lang="ts">
	const props = defineProps({
		text: {
			type: String,
			default: 'More Info',
		},
		isBlue: {
			type: Boolean,
			default: false,
		},
		isRed: {
			type: Boolean,
			default: false,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		isSmall: {
			type: Boolean,
			default: false,
		},
		type: {
			type: String,
			default: 'button',
		},
	});
</script>
<style scoped lang="scss"></style>
