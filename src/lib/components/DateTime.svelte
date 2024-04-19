<script lang="ts">
	$: datetime = Intl.DateTimeFormat('ru-RU', {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric',
		hour12: false
	}).format(new Date($$props.createdAt));
</script>

<date datetime={$$props.createdAt}>{datetime}</date>

<style>
</style>
