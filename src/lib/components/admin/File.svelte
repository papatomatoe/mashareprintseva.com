<script lang="ts">
	import { FILE } from '$lib/constants/files';
	import { X, LoaderCircle } from '@lucide/svelte';
	import { cn } from '$lib/utils';

	type Props = {
		placeholder?: string;
		fileUrl?: string;
		fileType?: string;
		name: string;
	};

	let { placeholder, fileUrl = '', fileType = '', name, ...restProps }: Props = $props();

	// export let thumbnail = '';
	// export let thumbnailName = 'thumbnail';

	let loading = $state(false);
	let isDisabledSelectButton = $state(true);
	let alt = $state('thumbnail');

	// let modal: SvelteComponent;
	// let filemanager: SvelteComponent;

	const handleClear = () => {
		fileUrl = '';
	};

	const handleDrop = async (e: DragEvent) => {
		e.preventDefault();
		if (e.dataTransfer?.items) {
			[...e.dataTransfer.items].forEach((item, i) => {
				if (item.kind === 'file') {
					const file = item.getAsFile();
					file && uploadFile(file);
				}
			});
		} else {
			[...(e.dataTransfer?.files || [])].forEach((file, i) => {
				uploadFile(file);
			});
		}
	};

	const uploadFile = async (file: File) => {
		loading = true;
		try {
			const formData = new FormData();
			formData.append('files', file, file.name);

			// const response = await fetch('/api/v2/files/upload', {
			// 	method: 'POST',
			// 	body: formData
			// });

			// const [savedFile] = await response.json();
			// thumbnail = savedFile.thumbnail;
			// fileUrl = savedFile.url;
		} catch (e) {
			console.error(e);
		} finally {
			loading = false;
		}
	};

	const handleAddFiles = () => {
		// const [file] = filemanager.getFiles();
		// fileUrl = file.url;
		// fileType = file.fileType;
		// alt = file.name;
		// filemanager.resetSelection();
	};

	const handleCheckFiles = (e) => {
		// isDisabledSelectButton = e.detail.ids.length !== 1;
	};

	const handleOpenFilemanager = () => {};
</script>

<!-- <Modal bind:this={modal}>
	<Filemanager bind:this={filemanager} on:check={handleCheckFiles} />
	<div slot="bottom">
		<ConfirmPanel
			disabled={isDisabledSelectButton}
			on:cancel={handleCancel}
			on:confirm={handleAddFiles}
		/>
	</div>
</Modal> -->

<div class="relative">
	<div class="relative grid">
		<button
			type="button"
			class="relative border-0 bg-transparent p-0"
			onclick={handleOpenFilemanager}
		>
			<input type="hidden" {name} bind:value={fileUrl} />
			<div
				tabindex="0"
				role="button"
				class={cn(
					'border-1 w-fill grid h-[120px] place-items-center rounded-md px-5 py-2',
					restProps['aria-invalid'] ? 'border-red-500' : ''
				)}
				ondrop={handleDrop}
				ondragover={(e) => e.preventDefault()}
			>
				{#if loading}
					<div class="field__spinner"><LoaderCircle /></div>
				{:else if fileUrl}
					<div
						class={cn(
							'relative grid size-[100px] grid-cols-[100px] grid-rows-[100px] place-items-center',
							fileType === FILE.svg ? 'size-[30px] grid-cols-[30px] grid-rows-[30px]' : ''
						)}
					>
						<img class="h-full object-contain" src={fileUrl} {alt} />
					</div>
				{:else}
					<p class="text-sm text-neutral-400">{placeholder}</p>
				{/if}
			</div>
		</button>
	</div>

	{#if fileUrl}
		<button class="field__button" type="button" onclick={handleClear}>
			<X />
		</button>
	{/if}
</div>

<style>
	.field__button {
		display: grid;
		position: absolute;
		top: 43px;
		right: 5px;
		place-items: center;
		transform: translateY(-50%);
		cursor: pointer;
		border: none;
		background-color: transparent;
		padding: 0;
		width: 30px;
		height: 30px;
		--color--icon: var(--color--gray-85);
		z-index: 1;
	}

	.field__button:hover,
	.field__button:focus-visible {
		--color--icon: var(--color--primary);
	}

	.field__button:active {
		--color--icon: var(--color--gray-15);
	}

	.field__spinner {
		position: relative;
		left: 15px;
		--color--icon: var(--color--gray-85);
	}
</style>
