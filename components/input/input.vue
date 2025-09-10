<template>
	<div class="input-component">
		<label
			v-if="label"
			:for="name"
			class="block mb-1 font-medium text-gray-700"
		>
			{{ label }}
		</label>
		<input
			:type="type"
			:id="name"
			:name="name"
			:placeholder="placeholder"
			:v-model="value"
			:class="{
				'w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500': true,
				'rounded-md': borderRadius === '6px',
			}"
			:style="{
				borderRadius: borderRadius !== '6px' ? borderRadius : undefined,
			}"
			@input="$emit('update:value', $event.target.value)"
		/>
	</div>
</template>
<script setup lang="ts">
	import { Field } from 'vee-validate';

	const props = defineProps({
		required: {
			type: Boolean,
			default: true,
		},
		type: {
			type: String,
			default: 'text',
		},
		name: {
			type: String,
			default: '',
			required: true,
		},
		label: {
			type: String,
			default: '',
		},
		value: {
			type: String,
			default: '',
		},
		placeholder: {
			type: String,
			default: '',
		},
		borderRadius: {
			type: String,
			default: '6px',
		},
	});
</script>
<style scoped lang="scss"></style>
