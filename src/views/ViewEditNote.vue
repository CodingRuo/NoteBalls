<script setup>
	import AddEditNote from '@/components/Notes/AddEditNote.vue';
	import { ref } from 'vue';
	import { useNotesStore } from '@/stores/storeNotes';
	import { useRoute, useRouter } from 'vue-router';

	const notesStore = useNotesStore();
	const noteContent = ref('');
	const route = useRoute();
	const router = useRouter();
	const handleSaveClicked = () => {
		notesStore.updateNote(route.params.id, noteContent.value);
		router.push('/');
	};

	noteContent.value = notesStore.getNoteContent(route.params.id);
</script>

<template>
	<div class="edit-note">
		<AddEditNote
			ref="addEditNoteRef"
			v-model="noteContent"
			bgColor="link"
			placeholder="Type Something...">
			<template #buttons>
				<button
					@click="$router.back()"
					class="button is-success is-light mr-4">
					Cancel
				</button>
				<button
					@click="handleSaveClicked"
					:disabled="!noteContent"
					class="button is-link has-background-success">
					Save Note
				</button>
			</template>
		</AddEditNote>
	</div>
</template>
