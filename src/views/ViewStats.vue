<script setup>
	import { useNotesStore } from '../stores/storeNotes';

	const notesStore = useNotesStore();
</script>

<template>
	<div class="stats">
		<table class="table is-fullwidth">
			<thead>
				<tr>
					<th>Stat</th>
					<th>Value</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Number of Notes</td>
					<td>{{ notesStore.totalNotesCount }}</td>
				</tr>
				<tr>
					<td>Number of Characters (of all Notes)</td>
					<td>{{ notesStore.totalCharacterCount }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
