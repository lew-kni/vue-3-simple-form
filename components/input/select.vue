<template>
	<div class="input-component">
		<label
			v-if="label"
			:for="name"
			class="block mb-1 font-medium text-gray-700"
		>
			{{ label }}
		</label>
		<select
			:id="name"
			:name="name"
			:placeholder="placeholder"
			v-model="value"
			class="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
		>
			<option v-if="placeholder" value="" disabled hidden>
				{{ placeholder }}
			</option>
			<option
				v-for="option in options"
				:key="option.value"
				:value="option.value"
			>
				{{ option.text }}
			</option>
		</select>
	</div>
</template>

<script setup lang="ts">
	const props = defineProps({
		name: {
			type: String,
			required: true,
		},
		label: {
			type: String,
			default: '',
		},
		options: {
			type: Array as () => { value: string | number; text: string }[],
			default: () => [],
		},
		placeholder: {
			type: String,
			default: '',
		},
	});

	const value = ref('');

	onMounted(() => {
		if (!props.placeholder && props.options.length > 0) {
			value.value = String(props.options[0].value);
		}
	});

	const emit = defineEmits<{
		(e: 'update:value', value: string | number | boolean): void;
	}>();

	watch(value, (newValue) => {
		emit('update:value', newValue);
	});
</script>
<style scoped lang="scss"></style>
