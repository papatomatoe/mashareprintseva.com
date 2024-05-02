<script lang="ts">
	import SectionForm from '$lib/components/SectionForm.svelte';
	import type { ActionData } from './$types';
	export let form: ActionData;
</script>

<SectionForm {form} />
