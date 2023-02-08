<script setup>
	import { useNotesStore } from '@/stores/storeNotes';
	import ModalDeleteNote from './ModalDeleteNote.vue';
	import { reactive, computed } from 'vue';
	import { useDateFormat } from '@vueuse/shared';

	const notesStore = useNotesStore();
	const props = defineProps({
		note: {
			type: Array,
			default: [],
		},
	});

	const emit = defineEmits(['deleteClicked']);

	const characterLength = (note) => {
		let length = note.content.length;
		let description = length > 1 ? 'characters' : 'character';
		return `${length} ${description}`;
	};

	const modals = reactive({
		deleteNote: false,
	});

	const dateFormatted = computed(() => {
		let date = new Date(parseInt(props.note.date));
		return useDateFormat(date, 'DD-MM-YY @ HH:mm');
	});
</script>

<template>
	<div class="card mb-4">
		<div class="card-content">
			<div class="content">
				{{ note.content }}
				<div class="columns is-mobile has-text-grey-light mt-2">
					<small class="column">{{ dateFormatted }}</small>
					<small class="column has-text-right">{{
						characterLength(note)
					}}</small>
				</div>
			</div>
		</div>
		<footer class="card-footer">
			<router-link :to="`/edit-note/${note.id}`" class="card-footer-item"
				>Edit</router-link
			>
			<a
				href="#"
				class="card-footer-item"
				@click.prevent="modals.deleteNote = true"
				>Delete</a
			>
		</footer>
		<ModalDeleteNote
			v-if="modals.deleteNote"
			v-model="modals.deleteNote"
			:noteId="note.id" />
	</div>
</template>
