<script lang="ts">
	import { onMount, type SvelteComponent } from 'svelte';
	import { Editor } from '@tiptap/core';

	import Input from '$lib/components/Input.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import Popover from '$lib/components/admin/Popover.svelte';

	import {
		Undo,
		Redo,
		ListOrdered,
		List,
		Link,
		Image,
		CodeXml,
		Expand,
		AlignCenter,
		AlignLeft,
		AlignRight,
		Upload,
		IndentDecrease,
		IndentIncrease
	} from '@lucide/svelte';

	import { CUSTOM_EXTENSIONS } from './config';
	import Label from '$/lib/components/ui/label/label.svelte';
	import { cn } from '$/lib/utils';
	// import UploadWidget from '$/lib/components/ui/UploadWidget/UploadWidget.svelte';

	type Props = {
		label?: string;
		name: string;
		value?: string;
		errors?: string[] | null;
		required?: boolean;
	};

	type URLType = 'link' | 'image';

	let { name, label = '', value = $bindable(''), required = false, errors }: Props = $props();

	let element = $state<HTMLDivElement>();
	let editor = $state<Editor>();
	let modalHTMLEditor = $state<SvelteComponent>();
	let showLinkPopover = $state(false);
	let showImagePopover = $state(false);
	let popoverUrlType = $state<URLType | null>(null); //NOTE: ???
	let linkUrl = $state('');
	let imageUrl = $state('');
	let imageAlt = $state('');
	let sourceHTML = $state('');
	let isDisabledSelectButton = $state(false); //NOTE: ???
	let isFullscreenMode = $state(false);

	let derivedValue = $derived(value === '<p></p>' ? '' : value);

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: CUSTOM_EXTENSIONS,
			content: value,
			onTransaction: ({ editor: newEditor }) => {
				editor = undefined;
				editor = newEditor;
			},
			onUpdate: ({ editor }) => {
				value = editor.getHTML();
			}
		});

		return () => {
			if (editor) editor.destroy();
		};
	});

	const handleSetLink = () => {
		if (linkUrl === '') {
			editor?.chain().focus().extendMarkRange('link').unsetLink().run();
			return;
		}

		editor?.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run();
	};

	const handleCloseLinkPopover = () => {
		showLinkPopover = false;
		linkUrl = '';
	};

	const handleConfirmAddLink = () => {
		handleSetLink();
		handleCloseLinkPopover();
	};

	const handleAddImages = () => {
		if (imageUrl) {
			editor?.chain().focus().setImage({ src: imageUrl, alt: imageAlt }).run();
		}
	};

	const handleCloseImagePopover = () => {
		showImagePopover = false;
		imageUrl = '';
		imageAlt = '';
	};

	const handleConfirmAddImage = () => {
		handleAddImages();
		handleCloseImagePopover();
	};

	const handleOpenHTMLEditorModal = () => {
		sourceHTML = editor?.getHTML() ?? '';
		modalHTMLEditor?.open();
	};

	const handleCancelEditHTML = () => {
		modalHTMLEditor?.close();
	};

	const handleConfirmEditHTML = () => {
		editor?.commands.setContent(sourceHTML);
		modalHTMLEditor?.close();
	};

	const handleFullscreenMode = () => {
		isFullscreenMode = !isFullscreenMode;
	};
</script>

{#snippet sourceHTMLButtons()}
	<div class="html__controls">
		<button type="button" class="button button--black" onclick={handleConfirmEditHTML}>Save</button>
		<button type="button" class="button button--black" onclick={handleCancelEditHTML}>Cancel</button
		>
	</div>
{/snippet}

<Modal bind:this={modalHTMLEditor}>
	<div class="html__field">
		<Input type="textarea" name="sourceHTML" label="" placeholder="" bind:value={sourceHTML} />
	</div>
</Modal>

<div class="col-span-2">
	<div>
		{#if label}
			<Label for="content-{name}" class="mb-2">
				{label}
				{#if required}
					<sup class="text-red-500">*</sup>
				{/if}
			</Label>
		{/if}
		<div
			class={cn(
				'border-1 shadow-xs rounded-md',
				errors ? 'border-red-500' : '',
				isFullscreenMode ? 'z-99 fixed left-0 top-0 h-[100vh] w-[100vw] rounded-none bg-white' : ''
			)}
		>
			{#if editor}
				<div class="border-b-1 flex flex-wrap">
					<div class="editor__buttons">
						<button
							class="button editor__button"
							type="button"
							onclick={() => editor?.chain().focus().undo().run()}
							disabled={!editor.can().chain().focus().undo().run()}
							aria-label="undo"
						>
							<Undo />
						</button>
						<button
							class="button editor__button"
							type="button"
							onclick={() => editor?.chain().focus().redo().run()}
							disabled={!editor.can().chain().focus().redo().run()}
							aria-label="redo"
						>
							<Redo />
						</button>
					</div>
					<div class="editor__buttons text-buttons">
						<Popover class="w-fit p-2" align="start">
							{#snippet trigger()}
								<button class="button editor__button" type="button">text</button>
							{/snippet}

							<div class="editor__buttons editor__button--popover">
								<button
									class="button editor__button"
									type="button"
									onclick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
									class:active={editor.isActive('heading', { level: 1 })}
								>
									h1
								</button>
								<button
									class="button editor__button"
									type="button"
									onclick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
									class:active={editor.isActive('heading', { level: 2 })}
								>
									h2
								</button>
								<button
									class="button editor__button"
									type="button"
									onclick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
									class:active={editor.isActive('heading', { level: 3 })}
								>
									h3
								</button>
								<button
									class="button editor__button"
									type="button"
									onclick={() => editor?.chain().focus().toggleHeading({ level: 4 }).run()}
									class:active={editor.isActive('heading', { level: 4 })}
								>
									h4
								</button>
								<button
									class="button editor__button"
									type="button"
									onclick={() => editor?.chain().focus().toggleHeading({ level: 5 }).run()}
									class:active={editor.isActive('heading', { level: 5 })}
								>
									h5
								</button>
								<button
									class="button editor__button"
									type="button"
									onclick={() => editor?.chain().focus().toggleHeading({ level: 6 }).run()}
									class:active={editor.isActive('heading', { level: 6 })}
								>
									h6
								</button>
								<button
									class="button editor__button"
									type="button"
									onclick={() => editor?.chain().focus().setParagraph().run()}
									class:active={editor.isActive('paragraph')}
								>
									p
								</button>
								<button
									class="button editor__button"
									type="button"
									onclick={() => editor?.chain().focus().toggleBlockquote().run()}
									class:active={editor.isActive('blockquote')}
								>
									"
								</button>
								<button
									class="button editor__button"
									type="button"
									onclick={() => editor?.chain().focus().setHardBreak().run()}
								>
									br
								</button>
								<button
									class="button editor__button editor__button--bold"
									type="button"
									onclick={() => editor?.chain().focus().toggleBold().run()}
									disabled={!editor.can().chain().focus().toggleBold().run()}
									class:active={editor.isActive('bold')}
									aria-label="set bold text"
								>
									B
								</button>
								<button
									class="button editor__button editor__button--italic"
									type="button"
									onclick={() => editor?.chain().focus().toggleItalic().run()}
									disabled={!editor.can().chain().focus().toggleItalic().run()}
									class:active={editor.isActive('italic')}
									aria-label="set italic text"
								>
									I
								</button>
							</div>
						</Popover>
					</div>
					<div class="editor__buttons">
						<button
							class="button editor__button"
							class:active={editor.isActive({ textAlign: 'left' })}
							type="button"
							aria-label="align left"
							onclick={() => editor?.chain().focus().setTextAlign('left').run()}
							><AlignLeft /></button
						>
						<button
							class="button editor__button"
							class:active={editor.isActive({ textAlign: 'center' })}
							type="button"
							onclick={() => editor?.chain().focus().setTextAlign('center').run()}
							aria-label="align center"><AlignCenter /></button
						>
						<button
							class="button editor__button"
							class:active={editor.isActive({ textAlign: 'right' })}
							type="button"
							onclick={() => editor?.chain().focus().setTextAlign('right').run()}
							aria-label="align right"><AlignRight /></button
						>
					</div>
					<div class="editor__buttons">
						<button
							class="button editor__button"
							type="button"
							onclick={() => editor?.chain().focus().toggleBulletList().run()}
							class:active={editor.isActive('bulletList')}
							aria-label="unordered list"
						>
							<List />
						</button>
						<button
							class="button editor__button"
							type="button"
							onclick={() => editor?.chain().focus().toggleOrderedList().run()}
							class:active={editor.isActive('orderedList')}
							aria-label="ordered list"
						>
							<ListOrdered />
						</button>
					</div>
					<div class="editor__buttons">
						<button
							class="button editor__button"
							type="button"
							onclick={() => editor?.chain().focus().sinkListItem('listItem').run()}
							disabled={!editor.can().sinkListItem('listItem')}
							aria-label="make nested list item"
						>
							<IndentIncrease />
						</button>
						<button
							class="button editor__button"
							type="button"
							onclick={() => editor?.chain().focus().liftListItem('listItem').run()}
							disabled={!editor.can().liftListItem('listItem')}
							aria-label="undo nested list item"
						>
							<IndentDecrease />
						</button>
					</div>
					<div class="editor__buttons">
						<div class="editor__wrapper">
							{#snippet linkPopoverButton()}
								<button
									class="button editor__button"
									type="button"
									onclick={() => {
										showLinkPopover = true;
										linkUrl = editor?.getAttributes('link').href ?? '';
									}}
									class:active={editor?.isActive('link')}
									aria-label="add link"
								>
									<Link />
								</button>
							{/snippet}

							<!-- <Popover
								bind:show={showLinkPopover}
								oncancel={handleCloseLinkPopover}
								onconfirm={handleConfirmAddLink}
								disableAutoHide
								button={linkPopoverButton}
							>
								<div class="editor__popover-container">
									<Input
										name="link"
										label="URL:"
										placeholder="https://example.net"
										bind:value={linkUrl}
									/>
								</div>
							</Popover> -->
						</div>
						<div class="editor__wrapper">
							{#snippet imagePopoverButton()}
								<button
									class="button editor__button"
									type="button"
									aria-label="add image"
									onclick={() => {
										showImagePopover = true;
									}}><Image /></button
								>
							{/snippet}

							<!-- <Popover
								bind:show={showImagePopover}
								oncancel={handleCloseImagePopover}
								onconfirm={handleConfirmAddImage}
								disableAutoHide
								button={imagePopoverButton}
							>
								<div class="editor__popover-container editor__popover-container--url">
									<Input
										name="image"
										label="URL:"
										placeholder="https://example.net"
										bind:value={imageUrl}
									/>
									<UploadWidget
										onSuccess={(result) => {
											imageUrl = result;
										}}
										getFullPath
									>
										<Upload />
									</UploadWidget>
								</div>
								<Input
									name="alt"
									label="Alt attribute:"
									placeholder="Alt attribute text"
									bind:value={imageAlt}
								/>
							</Popover> -->
						</div>
					</div>
					<div class="editor__buttons">
						<button
							class="button editor__button"
							type="button"
							aria-label="open HTML source editor"
							onclick={handleOpenHTMLEditorModal}
						>
							<CodeXml />
						</button>
						<button
							class="button editor__button"
							type="button"
							aria-label="toggle fullscreen"
							onclick={handleFullscreenMode}><Expand /></button
						>
					</div>
				</div>
			{/if}

			<div class="editor__element" bind:this={element}></div>

			<input id="content-{name}" type="hidden" {name} bind:value={derivedValue} />
		</div>
	</div>
	{#if errors}
		<p class="absolute top-[calc(100%_-_22px)]">{errors[0]}</p>
	{/if}
</div>

<style lang="postcss">
	@reference "tailwindcss";

	.editor__buttons {
		@apply border-r-1 flex gap-2 p-2;
	}

	.editor__buttons:last-of-type {
		@apply border-none;
	}

	.editor__button,
	.editor :global(.cld-upload) {
		display: grid;
		place-items: center;
		border: var(--border);
		border-radius: 8px;
		background-color: transparent;
		padding: 2px;
		width: 34px;
		height: 34px;
		color: var(--color--black);
		font-weight: 400;
		--color--icon: var(--color--black);
	}

	.editor :global(.cld-upload:hover),
	.editor :global(.cld-upload:focus-visible),
	.editor__button:hover,
	.editor__button:focus-visible {
		background-color: var(--color--black);
		color: var(--color--white);
		--color--icon: var(--color--white);
	}

	.editor__button:disabled {
		@apply text-neutral-300;

		& :global(svg) {
			--color--icon: var(--color--black-15);
		}
	}
	.editor__button:disabled:hover {
		background-color: var(--color--white);
	}

	.editor__button--bold {
		font-weight: 700;
		font-size: 18px;
	}

	.editor__button--italic {
		font-style: italic;
		font-size: 18px;
		font-family: 'Times New Roman', Times, serif;
	}

	.active,
	.active:hover,
	.active:focus-visible {
		@apply bg-black text-white;
	}

	.editor__element {
		padding: 20px;
		min-height: 200px;
		max-height: 600px;
		overflow-y: auto;
	}

	.editor__popover-container--url {
		display: grid;
		grid-template-columns: 1fr 36px;
		align-items: center;
		gap: 10px;
	}

	.html__field,
	:global(.html__field .input),
	:global(.html__field .input .input__field),
	:global(.html__field .input .field__input) {
		height: 100% !important;
	}

	:global(.html__field .input .field__input) {
		resize: none;
	}

	.html__controls {
		display: flex;
		justify-content: flex-end;
		gap: 10px;
	}

	:global(.editor__element > div) {
		outline: 0;
		height: 100%;
		min-height: inherit;
	}

	:global(.editor__element h1),
	:global(.editor__element h2),
	:global(.editor__element h3),
	:global(.editor__element h4),
	:global(.editor__element h5),
	:global(.editor__element h6),
	:global(.editor__element p) {
		padding: 10px 0;
	}

	:global(.editor__element h1) {
		@apply text-3xl font-semibold;
	}

	:global(.editor__element h2) {
		@apply text-2xl font-semibold;
	}

	:global(.editor__element h3) {
		@apply text-xl font-semibold;
	}

	:global(.editor__element h4) {
		@apply text-lg font-semibold;
	}

	:global(.editor__element h5) {
		@apply text-base font-semibold;
	}

	:global(.editor__element h6) {
		@apply text-sm font-semibold;
	}

	:global(.editor__element blockquote) {
		margin: 20px 20px 20px 40px;
		border-left: 2px solid var(--color--gray-85);
		padding: 20px 0 20px 20px;
	}

	:global(.editor__element blockquote > p) {
		padding: 5px 0;
	}
	:global(.editor__element ul) {
		margin: 20px 0 20px 40px;
	}

	:global(.editor__element ol) {
		margin: 20px 0;
	}
	:global(.editor__element ul li) {
		margin: 10px 0;
		list-style-type: disc;
	}

	:global(.editor__element ol li) {
		margin: 10px 0;
		list-style-type: decimal;
	}

	:global(.editor__element img) {
		display: block;
		padding: 20px 0;
		width: 500px;
	}

	:global(.editor__element a) {
		color: var(--color--primary);
	}

	.editor__container--fullscreen .editor__element {
		max-height: calc(100% - 39px);
	}

	.editor :global(.popover) {
		top: 75px;
		left: 50%;
		translate: -50% 0;
		width: 85vw;
	}

	.editor__popover-container {
		display: grid;
		gap: 10px;
	}

	.editor__button--popover {
		flex-wrap: wrap;
	}

	@media (min-width: 1360px) {
		.editor__wrapper {
			position: relative;
		}
		.editor__buttons {
			border-right: var(--border);
		}
		.editor__button--popover {
			flex-wrap: nowrap;
		}
		.editor :global(.popover) {
			top: 110%;
			left: -14px;
			translate: 0;
			width: 500px;
		}
	}
</style>
