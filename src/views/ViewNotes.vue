<script setup>
	import Note from '@/components/Notes/Note.vue';
	import AddEditNote from '@/components/Notes/AddEditNote.vue';
	import { useNotesStore } from '@/stores/storeNotes';
	import { ref } from 'vue';
	import { useWatchCharacters } from '@/utils/useWatchCharacters';

	const newNote = ref('');
	const notesStore = useNotesStore();
	const addEditNoteRef = ref(null);

	const addNote = () => {
		notesStore.addNote(newNote.value);
		newNote.value = '';
		addEditNoteRef.value.focusTextArea();
	};
	useWatchCharacters(newNote);
</script>

<template>
	<div class="notes">
		<AddEditNote
			v-model="newNote"
			ref="addEditNoteRef"
			placeholder="Add new Note">
			<template #buttons>
				<button
					@click="addNote"
					:disabled="!newNote"
					class="button is-link has-background-success">
					Add new Note
				</button>
			</template>
		</AddEditNote>
		<progress
			v-if="notesStore.isPending"
			class="progress is-small is-success"
			max="100" />
		<template v-else>
			<Note
				v-for="note in notesStore.notes"
				:note="note"
				:key="note.id" />

			<div
				v-if="!notesStore.notes.length"
				class="is-size-4 has-text-centered has-text-grey-light is-family-monospace py-6">
				No notes here yet ...
			</div>
		</template>
	</div>
</template>
