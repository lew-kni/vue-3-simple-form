<template>
	<Form
		class="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto"
		@submit="onSubmit"
	>
		<pre class="text-black">
			{{ formValues }}
		</pre
		>

		<FieldSet>
			<FormTitle>Customer</FormTitle>
			<Field name="name" rules="required" v-slot="{ field, errors }">
				<Input
					v-bind="field"
					label="Name"
					placeholder="My name is..."
					@update:value="handleInputValue('name', $event)"
				/>
				<ErrorMessage name="name" class="text-red-500 text-xs" />
			</Field>
		</FieldSet>
		<FieldSet class="mt-6">
			<FormTitle>Items</FormTitle>
			<Field name="insureItems" rules="required" v-slot="{ field, errors }">
				<Radio
					v-bind="field"
					label="Do you want to insure items?"
					:options="insureItemsOptions"
					isButtons
					@update:value="handleInputValue('insureItems', $event)"
				/>
				<ErrorMessage name="insureItems" class="text-red-500 text-xs" />
			</Field>
			<FieldSet
				v-if="formValues.insureItems === true"
				class="mt-4 border-1-gray-300 border p-4 rounded"
			>
				<div
					class="flex flex-row gap-0 items-end flex-flow-wrap"
					v-for="(item, index) in itemsToInsure"
					:key="index"
				>
					<Field
						:name="`insureItem${index + 1}`"
						rules="required"
						v-slot="{ field, errors }"
					>
						<Input
							v-bind="field"
							:index="index"
							:label="`Item ${index + 1}`"
							:class="{ 'flex-grow': true, 'mt-4': index > 0 }"
							@update:value="handleInputValue('itemsToInsure', $event, index)"
							:borderRadius="
								itemsToInsure.length > 1 ? '6px 0px 0px 6px' : undefined
							"
						/>
						<Btn
							v-if="formValues.itemsToInsure.length > 1"
							class="px-0 !ml-0 h-[42px] rounded-tl-none rounded-bl-none"
							:style="{
								lineHeight: '100%',
							}"
							text="Delete"
							@click="deleteItemToInsure(index)"
							isRed
						/>
						<ErrorMessage
							:name="`insureItem${index + 1}`"
							class="text-red-500 text-xs w-full"
						/>
					</Field>
				</div>
				<Btn
					class="mt-6 text-right cursor-pointer"
					text="Add another"
					@click="addItemToInsure"
				/>
			</FieldSet>
		</FieldSet>
		<FieldSet class="mt-6">
			<FormTitle>Policy</FormTitle>
			<Field name="startDate" rules="required" v-slot="{ field, errors }">
				<Date
					v-bind="field"
					label="Start Date"
					placeholder="Select a date"
					:min-date="minDate"
					:max-date="maxDate"
					:value="formValues.startDate"
					@update:value="handleInputValue('startDate', $event)"
				/>
				<ErrorMessage name="startDate" class="text-red-500 text-xs" />
			</Field>
			<Field name="indemnityLimit" rules="required" v-slot="{ field, errors }">
				<Select
					v-bind="field"
					class="mt-4"
					label="Limit of indemnity"
					:options="indemnityOptions"
					placeholder="Please select"
					:value="formValues.indemnityLimit"
					@update:value="handleInputValue('indemnityLimit', $event)"
				/>
				<ErrorMessage name="indemnityLimit" class="text-red-500 text-xs" />
			</Field>
			<Field name="excess" rules="required" v-slot="{ field, errors }">
				<Radio
					v-bind="field"
					class="mt-4"
					label="Excess"
					:options="excessOptions"
					:value="formValues.excess"
					@update:value="handleInputValue('excess', $event)"
				/>
				<ErrorMessage name="excess" class="text-red-500 text-xs" />
			</Field>
		</FieldSet>
		<FieldSet class="mt-6 text-right">
			<Btn text="Submit" isBlue type="submit" />
		</FieldSet>
	</Form>
</template>
<script setup lang="ts">
	import {
		Form,
		Field,
		ErrorMessage,
		defineRule,
		configure,
	} from 'vee-validate';
	import { required } from '@vee-validate/rules';
	// ...your existing imports and code...

	defineRule('required', required);
	configure({
		generateMessage: (ctx) => `${ctx.field} is required`,
	});

	interface FormValues {
		name: string;
		insureItems: boolean | string;
		itemsToInsure: { value: string }[];
		startDate: string;
		indemnityLimit: string;
		excess: string;
	}

	const formValues = reactive<FormValues>({
		name: '',
		insureItems: '',
		itemsToInsure: [{ value: '' }],
		startDate: '',
		indemnityLimit: '',
		excess: '',
	});

	const insureItemsOptions = [
		{ value: true, text: 'Yes' },
		{ value: false, text: 'No' },
	];
	const itemsToInsure = ref([{ value: '' }]);
	const indemnityOptions = [
		{ value: '1000000', text: '£1,000,000' },
		{ value: '2000000', text: '£2,000,000' },
		{ value: '5000000', text: '£5,000,000' },
	];
	const excessOptions = [
		{ value: '250', text: '£250' },
		{ value: '500', text: '£500' },
		{ value: '1000', text: '£1,000' },
	];

	function addItemToInsure() {
		itemsToInsure.value.push({ value: '' });
		formValues.itemsToInsure.push({ value: '' });
	}

	const toDateString = (date: Date) => date.toISOString().split('T')[0];

	const minDate = toDateString(new Date());
	const maxDateObj = new Date();
	maxDateObj.setDate(maxDateObj.getDate() + 15); // 15 days from now
	const maxDate = toDateString(maxDateObj);

	function deleteItemToInsure(index: number) {
		itemsToInsure.value.splice(index, 1);
		formValues.itemsToInsure.splice(index, 1);
	}

	function handleInputValue(
		field: keyof FormValues,
		value: any,
		index: number | null = null
	) {
		if (field === 'itemsToInsure') {
			formValues.itemsToInsure[index!] = { value };
		} else if (field === 'insureItems') {
			formValues.insureItems = value === true || value === 'true';
		} else {
			(formValues as any)[field] = value;
		}
	}

	// const isFormComplete = computed(() => {
	// 	console.log('Checking form completeness...', formValues);
	// 	const mainFieldsFilled =
	// 		!!formValues.name &&
	// 		formValues.insureItems !== '' &&
	// 		!!formValues.startDate &&
	// 		!!formValues.indemnityLimit &&
	// 		!!formValues.excess;

	// 	// If insureItems is true
	// 	let itemsFilled = true;
	// 	if (formValues.insureItems === true) {
	// 		itemsFilled =
	// 			formValues.itemsToInsure.length > 0 &&
	// 			formValues.itemsToInsure.every((item) => !!item.value);
	// 	}

	// 	return mainFieldsFilled && itemsFilled;
	// });

	function onSubmit(values: any) {
		// values contains all validated form data
		console.log('Form submitted!', values);
	}
</script>
<style scoped lang="scss"></style>
