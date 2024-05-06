<script lang="ts">
	import ProjectForm from '$lib/components/ProjectForm.svelte';
	import type { ActionData, PageData } from './$types';

	export let form: ActionData;
	export let data: PageData;

	const sections = data.sections;
</script>

<ProjectForm {form} {sections} />
