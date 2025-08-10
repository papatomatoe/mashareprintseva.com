<script lang="ts">
	import { onMount, type SvelteComponent } from 'svelte';
	import { Editor } from '@tiptap/core';

	import Popover from '$lib/components/admin/Popover.svelte';
	import Dialog from '$/lib/components/admin/Dialog.svelte';

	import {
		Undo,
		Redo,
		ListOrdered,
		List,
		Link,
		Image,
		CodeXml,
		Expand,
		Shrink,
		AlignCenter,
		AlignLeft,
		AlignRight,
		Upload,
		IndentDecrease,
		IndentIncrease,
		Heading1,
		Heading2,
		Heading3,
		Heading4,
		Heading5,
		Heading6,
		Pilcrow,
		Type,
		Bold,
		Italic,
		Quote,
		WrapText
	} from '@lucide/svelte';

	import { CUSTOM_EXTENSIONS } from './config';
	import { Label } from '$/lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { Textarea } from '$lib/components/ui/textarea';

	import { cn } from '$/lib/utils';

	// import UploadWidget from '$/lib/components/ui/UploadWidget/UploadWidget.svelte';

	type Props = {
		label?: string;
		name: string;
		value?: string;
		required?: boolean;
	};

	const size = 18;

	let { name, label = '', value = $bindable(''), required = false, ...restProps }: Props = $props();

	let element = $state<HTMLDivElement>();
	let editor = $state<Editor>();
	let linkUrl = $state('');
	let imageUrl = $state('');
	let imageAlt = $state('');
	let sourceHTML = $state('');
	let isFullscreenMode = $state(false);

	let addLinkOpen = $state(false);
	let codeEditorOpen = $state(false);
	let addImageOpen = $state(false);

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

	const handleAddImages = () => {
		if (imageUrl) {
			editor?.chain().focus().setImage({ src: imageUrl, alt: imageAlt }).run();
		}
	};

	const handleConfirmEditHTML = () => {
		editor?.commands.setContent(sourceHTML);
		codeEditorOpen = false;
	};

	const handleFullscreenMode = () => {
		isFullscreenMode = !isFullscreenMode;
	};
</script>

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
				restProps['aria-invalid'] ? 'border-red-500' : '',
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
							<Undo {size} />
						</button>
						<button
							class="button editor__button"
							type="button"
							onclick={() => editor?.chain().focus().redo().run()}
							disabled={!editor.can().chain().focus().redo().run()}
							aria-label="redo"
						>
							<Redo {size} />
						</button>
					</div>
					<div class="editor__buttons text-buttons">
						<Popover class="w-fit p-2" align="start">
							{#snippet trigger({ props, setOpen })}
								<button
									{...props}
									class="button editor__button"
									type="button"
									onclick={() => {
										setOpen(true);
									}}><Type {size} /></button
								>
							{/snippet}

							<div class="editor__buttons editor__button--popover">
								<button
									class="button editor__button"
									type="button"
									onclick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
									class:active={editor.isActive('heading', { level: 1 })}
								>
									<Heading1 {size} />
								</button>
								<button
									class="button editor__button"
									type="button"
									onclick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
									class:active={editor.isActive('heading', { level: 2 })}
								>
									<Heading2 {size} />
								</button>
								<button
									class="button editor__button"
									type="button"
									onclick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
									class:active={editor.isActive('heading', { level: 3 })}
								>
									<Heading3 {size} />
								</button>
								<button
									class="button editor__button"
									type="button"
									onclick={() => editor?.chain().focus().toggleHeading({ level: 4 }).run()}
									class:active={editor.isActive('heading', { level: 4 })}
								>
									<Heading4 {size} />
								</button>
								<button
									class="button editor__button"
									type="button"
									onclick={() => editor?.chain().focus().toggleHeading({ level: 5 }).run()}
									class:active={editor.isActive('heading', { level: 5 })}
								>
									<Heading5 {size} />
								</button>
								<button
									class="button editor__button"
									type="button"
									onclick={() => editor?.chain().focus().toggleHeading({ level: 6 }).run()}
									class:active={editor.isActive('heading', { level: 6 })}
								>
									<Heading6 {size} />
								</button>
								<button
									class="button editor__button"
									type="button"
									onclick={() => editor?.chain().focus().setParagraph().run()}
									class:active={editor.isActive('paragraph')}
								>
									<Pilcrow {size} />
								</button>

								<button
									class="button editor__button"
									type="button"
									onclick={() => editor?.chain().focus().toggleBold().run()}
									disabled={!editor.can().chain().focus().toggleBold().run()}
									class:active={editor.isActive('bold')}
									aria-label="set bold text"
								>
									<Bold {size} />
								</button>
								<button
									class="button editor__button editor__button--italic"
									type="button"
									onclick={() => editor?.chain().focus().toggleItalic().run()}
									disabled={!editor.can().chain().focus().toggleItalic().run()}
									class:active={editor.isActive('italic')}
									aria-label="set italic text"
								>
									<Italic {size} />
								</button>
								<button
									class="button editor__button"
									type="button"
									onclick={() => editor?.chain().focus().toggleBlockquote().run()}
									class:active={editor.isActive('blockquote')}
								>
									<Quote {size} />
								</button>
								<button
									class="button editor__button"
									type="button"
									onclick={() => editor?.chain().focus().setHardBreak().run()}
								>
									<WrapText {size} />
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
							><AlignLeft {size} /></button
						>
						<button
							class="button editor__button"
							class:active={editor.isActive({ textAlign: 'center' })}
							type="button"
							onclick={() => editor?.chain().focus().setTextAlign('center').run()}
							aria-label="align center"><AlignCenter {size} /></button
						>
						<button
							class="button editor__button"
							class:active={editor.isActive({ textAlign: 'right' })}
							type="button"
							onclick={() => editor?.chain().focus().setTextAlign('right').run()}
							aria-label="align right"><AlignRight {size} /></button
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
							<List {size} />
						</button>
						<button
							class="button editor__button"
							type="button"
							onclick={() => editor?.chain().focus().toggleOrderedList().run()}
							class:active={editor.isActive('orderedList')}
							aria-label="ordered list"
						>
							<ListOrdered {size} />
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
							<IndentIncrease {size} />
						</button>
						<button
							class="button editor__button"
							type="button"
							onclick={() => editor?.chain().focus().liftListItem('listItem').run()}
							disabled={!editor.can().liftListItem('listItem')}
							aria-label="undo nested list item"
						>
							<IndentDecrease {size} />
						</button>
					</div>
					<div class="editor__buttons">
						<div class="editor__wrapper">
							<Popover bind:open={addLinkOpen}>
								{#snippet trigger({ props })}
									<button
										{...props}
										class="button editor__button"
										type="button"
										onclick={() => {
											linkUrl = editor?.getAttributes('link').href ?? '';
											addLinkOpen = true;
										}}
										class:active={editor?.isActive('link')}
										aria-label="add link"
									>
										<Link {size} />
									</button>
								{/snippet}
								<div class="grid gap-5">
									<div class="grid gap-2">
										<Label for="inputLinkUrl">URL:</Label>
										<Input
											id="inputLinkUrl"
											type="text"
											name="link"
											placeholder="https://example.net"
											bind:value={linkUrl}
										/>
									</div>
									<Button
										class="w-fit justify-self-end"
										type="button"
										onclick={() => {
											handleSetLink();
											addLinkOpen = false;
										}}
									>
										Add Link
									</Button>
								</div>
							</Popover>
						</div>
						<div class="editor__wrapper">
							<Popover bind:open={addImageOpen}>
								{#snippet trigger({ props })}
									<button
										{...props}
										class="button editor__button"
										type="button"
										aria-label="add image"
										onclick={() => {
											addImageOpen = true;
										}}
									>
										<Image {size} />
									</button>
								{/snippet}

								<div class="grid gap-5">
									<div class="grid gap-2">
										<Label for="imageUrl">URL:</Label>
										<Input
											id="imageUrl"
											name="image"
											placeholder="https://example.net"
											bind:value={imageUrl}
										/>
									</div>
									<!-- <UploadWidget
										onSuccess={(result) => {
											imageUrl = result;
										}}
										getFullPath
									>
										<Upload {size} />
									</UploadWidget> -->
									<div class="grid gap-2">
										<Label for="imageAlt">Alt attribute</Label>
										<Input
											id="ImageTrackList"
											name="alt"
											placeholder="Alt attribute text"
											bind:value={imageAlt}
										/>
									</div>
									<Button
										class="w-fit justify-self-end"
										type="button"
										onclick={() => {
											handleAddImages();
											addImageOpen = false;
											imageUrl = '';
											imageAlt = '';
										}}
									>
										Add Image
									</Button>
								</div>
							</Popover>
						</div>
					</div>
					<div class="editor__buttons">
						<Dialog
							class="flex h-[80%] w-[80%] flex-col p-10 pb-5 sm:max-w-[80%]"
							bind:open={codeEditorOpen}
						>
							{#snippet trigger({ props })}
								<button
									{...props}
									class="button editor__button"
									type="button"
									aria-label="open HTML source editor"
									onclick={() => {
										sourceHTML = editor?.getHTML() ?? '';
										codeEditorOpen = true;
									}}
								>
									<CodeXml {size} />
								</button>
							{/snippet}

							<div class="html__field">
								<Textarea
									class="h-full resize-none"
									name="sourceHTML"
									placeholder=""
									bind:value={sourceHTML}
								/>
							</div>

							{#snippet footer()}
								<div class="flex gap-5">
									<Button
										type="button"
										class={cn(buttonVariants({ variant: 'outline' }), 'text-black')}
										onclick={() => {
											codeEditorOpen = false;
										}}>Cancel</Button
									>
									<Button type="button" onclick={handleConfirmEditHTML}>Save</Button>
								</div>
							{/snippet}
						</Dialog>

						<button
							class="button editor__button"
							type="button"
							aria-label="toggle fullscreen"
							onclick={handleFullscreenMode}
						>
							{#if isFullscreenMode}
								<Shrink {size} />
							{:else}
								<Expand {size} />
							{/if}
						</button>
					</div>
				</div>
			{/if}

			<div class="editor__element" bind:this={element}></div>

			<input id="content-{name}" type="hidden" {name} bind:value={derivedValue} />
		</div>
	</div>
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
		@apply border-1 grid size-10 place-items-center rounded-md border-transparent bg-transparent p-1 text-black;
	}

	.editor :global(.cld-upload:hover),
	.editor :global(.cld-upload:focus-visible),
	.editor__button:hover,
	.editor__button:focus-visible {
		@apply border-black bg-black text-white;
	}

	.editor__button:disabled {
		@apply border-transparent bg-white text-neutral-300;
	}

	.active,
	.active:hover,
	.active:focus-visible {
		@apply bg-black text-white;
	}

	.editor__element {
		@apply max-h-[600px] min-h-[200px] overflow-y-auto p-5;
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

	:global(.editor__element > div) {
		@apply h-full min-h-full outline-0;
	}

	:global(.editor__element h1),
	:global(.editor__element h2),
	:global(.editor__element h3),
	:global(.editor__element h4),
	:global(.editor__element h5),
	:global(.editor__element h6),
	:global(.editor__element p) {
		@apply px-0 py-4;
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
		@apply m-5 ml-10 border-2 border-neutral-500 p-5 pr-0;
	}

	:global(.editor__element blockquote > p) {
		@apply px-0 py-2;
	}
	:global(.editor__element ul) {
		@apply my-5 ml-10 mr-0;
	}

	:global(.editor__element ol) {
		@apply mx-0 my-5;
	}
	:global(.editor__element ul li) {
		@apply mx-0 my-2 list-none;
	}

	:global(.editor__element ol li) {
		@apply mx-0 my-2 list-decimal;
	}

	:global(.editor__element img) {
		@apply block w-[500px] px-0 py-5;
	}

	:global(.editor__element a) {
		@apply text-[var(--color--primary)];
	}

	.editor__container--fullscreen .editor__element {
		max-height: calc(100% - 39px);
	}
</style>
