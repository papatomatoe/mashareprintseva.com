<script lang="ts">
	import SectionForm, { type ISection } from '$lib/components/SectionForm.svelte';
	import type { ActionData, PageData } from './$types.js';

	export let data: PageData;
	export let form: ActionData;

	$: section = data.section as ISection;
	$: projects = data.projects;
</script>

<SectionForm {section} {projects} {form} />
