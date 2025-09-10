<template>
	<div class="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto text-black">
		<div v-if="completed">
			<h2 class="text-2xl font-bold mb-4">Thank you!</h2>
			<p>Your form has been submitted successfully.</p>
		</div>
		<Form v-else @submit="onSubmit">
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
				<Field
					name="insureItems"
					:rules="formValues.insureItems === null ? 'required' : ''"
					v-slot="{ field, errors }"
				>
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
						v-for="(item, index) in formValues.itemsToInsure"
						:key="item.id"
					>
						<Field
							:name="`insureItem${index + 1}`"
							:rules="formValues.insureItems === true ? 'required' : ''"
							v-slot="{ field, errors }"
						>
							<Input
								v-bind="field"
								:index="item.id"
								:label="`Item ${index + 1}`"
								:class="{ 'flex-grow': true, 'mt-4': index > 0 }"
								@update:value="
									handleInputValue('itemsToInsure', $event, item.id)
								"
								:borderRadius="
									formValues.itemsToInsure.length > 1
										? '6px 0px 0px 6px'
										: undefined
								"
							/>
							<Btn
								v-if="formValues.itemsToInsure.length > 1"
								class="px-0 !ml-0 h-[42px] rounded-tl-none rounded-bl-none"
								:style="{
									lineHeight: '100%',
								}"
								text="Delete"
								@click="deleteItemToInsure(item.id)"
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
						@update:modelValue="handleInputValue('startDate', $event)"
					/>
					<ErrorMessage name="startDate" class="text-red-500 text-xs" />
				</Field>
				<Field
					name="indemnityLimit"
					rules="required"
					v-slot="{ field, errors }"
				>
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
	</div>
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
		insureItems: boolean | string | null;
		itemsToInsure: { id: number; value: string }[];
		startDate: string;
		indemnityLimit: string;
		excess: string;
	}

	const formValues = reactive<FormValues>({
		name: '',
		insureItems: null,
		itemsToInsure: [{ id: Date.now() + Math.random(), value: '' }],
		startDate: '',
		indemnityLimit: '',
		excess: '',
	});

	const insureItemsOptions = [
		{ value: true, text: 'Yes' },
		{ value: false, text: 'No' },
	];
	const itemsToInsure = ref([{ id: Date.now() + Math.random(), value: '' }]);
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

	const completed = ref(false);

	function addItemToInsure() {
		const newId = Date.now() + Math.random();
		formValues.itemsToInsure.push({ id: newId, value: '' });
	}

	const toDateString = (date: Date) => date.toISOString().split('T')[0];

	const minDate = toDateString(new Date());
	const maxDateObj = new Date();
	maxDateObj.setDate(maxDateObj.getDate() + 15); // 15 days from now
	const maxDate = toDateString(maxDateObj);

	function deleteItemToInsure(id: number) {
		const idx = formValues.itemsToInsure.findIndex((item) => item.id === id);
		if (idx !== -1 && formValues.itemsToInsure.length > 1) {
			formValues.itemsToInsure.splice(idx, 1);
		}
	}

	function handleInputValue(
		field: keyof FormValues,
		value: any,
		id: number | null = null
	) {
		if (field === 'itemsToInsure' && id !== null) {
			const idx = formValues.itemsToInsure.findIndex((item) => item.id === id);
			if (idx !== -1) {
				formValues.itemsToInsure[idx].value = value;
			}
		} else if (field === 'insureItems') {
			formValues.insureItems = value === true || value === 'true';
		} else {
			(formValues as any)[field] = value;
		}
	}

	function onSubmit(values: any) {
		// values contains all validated form data
		console.log('Form submitted!', toRaw(formValues));

		completed.value = true;
	}
</script>
<style scoped lang="scss"></style>
