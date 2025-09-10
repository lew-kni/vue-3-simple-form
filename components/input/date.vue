<template>
	<div class="input-component">
		<label
			v-if="label"
			:for="name"
			class="block mb-1 font-medium text-gray-700"
		>
			{{ label }}
		</label>
		<VueDatePicker
			:name="name"
			v-model="date"
			:min-date="props.minDate"
			:max-date="props.maxDate"
			:enable-time-picker="false"
		/>
	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import VueDatePicker from '@vuepic/vue-datepicker';
	import '@vuepic/vue-datepicker/dist/main.css';

	const date = ref(null);

	const props = defineProps({
		label: {
			type: String,
			default: '',
		},
		name: {
			type: String,
			default: '',
		},
		minDate: {
			type: String,
			default: '',
		},
		maxDate: {
			type: String,
			default: '',
		},
	});

	const emit = defineEmits<{
		(e: 'update:value ', value: string | null): void;
	}>();

	watch(date, (newDate) => {
		emit('update:value', newDate);
	});
</script>
<style scoped lang="scss"></style>
