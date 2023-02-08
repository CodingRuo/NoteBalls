<script setup>
	import { ref } from 'vue';

	const props = defineProps({
		modelValue: {
			type: String,
			required: true,
		},
		bgColor: {
			type: String,
			default: 'success',
		},
	});

	const textAreaRef = ref(null);

	const focusTextArea = () => {
		textAreaRef.value.focus();
	};

	defineExpose({
		focusTextArea,
	});

	const vAutofocus = {
		mounted: (el) => {
			el.focus();
		},
	};
</script>

<template>
	<div class="card p-4 mb-4" :class="`has-background-${bgColor}-dark`">
		<div class="field">
			<div class="control">
				<textarea
					:value="modelValue"
					@input="$emit('update:modelValue', $event.target.value)"
					class="textarea"
					v-bind="$attrs"
					ref="textAreaRef"
					maxlength="100"
					v-autofocus />
			</div>
		</div>

		<div class="field is-grouped is-grouped-right">
			<div class="control">
				<slot name="buttons" />
			</div>
		</div>
	</div>
</template>
