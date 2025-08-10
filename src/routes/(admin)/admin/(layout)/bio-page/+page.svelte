<script lang="ts">
	import BioPageForm from '$/lib/components/admin/forms/BioPageForm.svelte';
	import type { PageData } from './$types.js';

	type Props = {
		data: PageData;
	};

	let { data }: Props = $props();
</script>

<BioPageForm form={data.form} />
