<template>
	<div class="radio-component">
		<label
			v-if="label"
			:for="name"
			class="block mb-1 font-medium text-gray-700"
		>
			{{ label }}
		</label>
		<div class="flex flex-row gap-4">
			<label
				v-for="option in options"
				:key="option.value"
				:class="{
					'inline-flex items-center hover:opacity-100': true,
					'opacity-30':
						selectedValue !== '' &&
						String(option.value) !== String(selectedValue),
				}"
			>
				<input
					type="radio"
					:name="name"
					:value="option.value"
					class="form-radio text-blue-600"
					:class="isButtons ? 'invisible w-0 h-0' : ''"
					@change="handleValueChange"
				/>
				<span :class="buttonClass">{{ option.text }}</span>
			</label>
		</div>
	</div>
</template>
<script setup lang="ts">
	type Option = {
		value: string | number | boolean;
		text: string;
	};

	interface Props {
		name: string;
		label?: string;
		options: Option[];
		placeholder?: string;
		isButtons?: boolean;
	}

	const props = defineProps<Props>();

	const buttonClass = computed(() => ({
		'text-black': true,
		'buttonRadio cursor-pointer ml-0 px-4 py-2 rounded border border-black bg-white hover:bg-blue-100 transition':
			props.isButtons,
		'ml-2': !props.isButtons,
	}));

	const emit = defineEmits<{
		(e: 'update:value', value: string | number | boolean): void;
	}>();

	let selectedValue = ref('');

	function handleValueChange(event: Event) {
		const target = event.target as HTMLInputElement;
		selectedValue.value = target.value;
		emit('update:value', target.value);
	}
</script>
<style scoped lang="scss"></style>
