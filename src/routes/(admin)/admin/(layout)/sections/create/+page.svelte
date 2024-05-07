<script lang="ts">
	import SectionForm from '$lib/components/SectionForm.svelte';
	import type { ActionData, PageData } from './$types';
	export let form: ActionData;
	export let data: PageData;

	$: projects = data.projects;
</script>

<SectionForm {form} {projects} />
