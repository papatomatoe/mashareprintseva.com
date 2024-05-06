<script lang="ts">
	import ProjectForm from '$lib/components/ProjectForm.svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<ProjectForm {form} />
