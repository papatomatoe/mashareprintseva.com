<script lang="ts">
	import ProjectForm, { type IProject } from '$lib/components/ProjectForm.svelte';
	import type { ActionData, PageData } from './$types';

	export let form: ActionData;
	export let data: PageData;

	$: project = data.project as IProject;
	$: sections = data.sections;
</script>

<ProjectForm {form} {project} {sections} />
