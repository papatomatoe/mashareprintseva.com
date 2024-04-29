<script lang="ts">
	import { SvelteComponent, onMount, type ComponentEvents } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Link from '@tiptap/extension-link';
	import TextAlign from '@tiptap/extension-text-align';
	import ImageExtension from '@tiptap/extension-image';
	import UndoLink from '$lib/icons/Undo.svelte';
	import RedoLink from '$lib/icons/Redo.svelte';
	import BulletListLink from '$lib/icons/BulletList.svelte';
	import OrderedListLink from '$lib/icons/OrderedList.svelte';
	import LinkIcon from '$lib/icons/Link.svelte';
	import Input from '$lib/components/Input.svelte';
	import ImageIcon from '$lib/icons/Image.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import Filemanager from '$lib/components/Filemanager.svelte';
	import ConfirmPanel from '$lib/components/ConfirmPanel.svelte';
	import Popover from '$lib/components/Popover.svelte';
	import Upload from '$lib/icons/Upload.svelte';
	import Textarea from '$lib/components/Textarea.svelte';
	import Source from '$lib/icons/Source.svelte';
	import Fullscreen from '$lib/icons/Fullscreen.svelte';
	import AlignLeft from '$lib/icons/AlignLeft.svelte';
	import AlignCenter from '$lib/icons/AlignCenter.svelte';
	import AlignRight from '$lib/icons/AlignRight.svelte';

	export let label = '';
	export let name = '';
	export let value = '';

	let element: HTMLDivElement;
	let editor: Editor;
	let modalFileManager: SvelteComponent;
	let modalHTMLEditor: SvelteComponent;
	let filemanager: SvelteComponent;
	let linkPopover: SvelteComponent;
	let imagePopover: SvelteComponent;

	let url = '';

	let imageUrl = '';
	let imageAlt = '';

	let sourceHTML = '';

	let isDisabledSelectButton = false;
	let isFullscreenMode = false;

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [
				StarterKit,
				TextAlign.configure({
					types: ['heading', 'paragraph']
				}),
				ImageExtension,
				Link.configure({
					openOnClick: false,
					autolink: true
				})
			],
			content: value,
			onTransaction: () => {
				editor = editor;
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
		if (url === '') {
			editor.chain().focus().extendMarkRange('link').unsetLink().run();
			return;
		}

		editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
	};

	const handleCloseLinkPopover = () => {
		linkPopover.close();
		url = '';
	};

	const handleConfirmAddLink = () => {
		handleSetLink();
		handleCloseLinkPopover();
	};

	const handleAddImages = () => {
		if (imageUrl) {
			editor.chain().focus().setImage({ src: imageUrl, alt: imageAlt }).run();
		}
	};

	const handleCloseImagePopover = () => {
		imagePopover.close();
		imageUrl = '';
		imageAlt = '';
	};

	const handleConfirmAddImage = () => {
		handleAddImages();
		handleCloseImagePopover();
	};

	const handleConfirmSelectImage = () => {
		const [image] = filemanager.getFiles();

		imageUrl = image.url;

		filemanager.resetSelection();
		modalFileManager.close();
	};

	const handleCheckFiles = (e: ComponentEvents<Filemanager>['check']) => {
		isDisabledSelectButton = e.detail.ids.length !== 1;
	};

	const handleOpenFilemanager = async () => {
		await filemanager.fetchFilesData();
		modalFileManager.open();
	};

	const handleCancelSelectImage = () => {
		filemanager.resetSelection();
		modalFileManager.close();
	};

	const handleOpenHTMLEditorModal = () => {
		sourceHTML = editor.getHTML();
		modalHTMLEditor.open();
	};

	const handleCancelEditHTML = () => {
		modalHTMLEditor.close();
	};

	const handleConfirmEditHTML = () => {
		editor.commands.setContent(sourceHTML);
		modalHTMLEditor.close();
	};

	const handleFullscreenMode = () => {
		isFullscreenMode = !isFullscreenMode;
	};
</script>

<Modal bind:this={modalFileManager}>
	<Filemanager bind:this={filemanager} on:check={handleCheckFiles} />
	<div slot="bottom">
		<ConfirmPanel
			disabled={isDisabledSelectButton}
			on:cancel={handleCancelSelectImage}
			on:confirm={handleConfirmSelectImage}
		/>
	</div>
</Modal>

<Modal bind:this={modalHTMLEditor}>
	<div class="html__field">
		<Textarea bind:value={sourceHTML} />
	</div>
	<div class="html__controls" slot="bottom">
		<ConfirmPanel on:cancel={handleCancelEditHTML} on:confirm={handleConfirmEditHTML} />
	</div>
</Modal>

<p>{label}</p>
<div class="editor" class:editor--fullscreen={isFullscreenMode}>
	{#if editor}
		<div class="editor__controls">
			<div class="editor__buttons">
				<button
					class="button editor__button"
					type="button"
					on:click={() => editor.chain().focus().undo().run()}
					disabled={!editor.can().chain().focus().undo().run()}
					aria-label="undo"
				>
					<UndoLink />
				</button>
				<button
					class="button editor__button"
					type="button"
					on:click={() => editor.chain().focus().redo().run()}
					disabled={!editor.can().chain().focus().redo().run()}
					aria-label="redo"
				>
					<RedoLink />
				</button>
			</div>
			<div class="editor__buttons">
				<button
					class="button editor__button"
					type="button"
					on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
					class:active={editor.isActive('heading', { level: 1 })}
				>
					h1
				</button>
				<button
					class="button editor__button"
					type="button"
					on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
					class:active={editor.isActive('heading', { level: 2 })}
				>
					h2
				</button>
				<button
					class="button editor__button"
					type="button"
					on:click={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
					class:active={editor.isActive('heading', { level: 3 })}
				>
					h3
				</button>
				<button
					class="button editor__button"
					type="button"
					on:click={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
					class:active={editor.isActive('heading', { level: 4 })}
				>
					h4
				</button>
				<button
					class="button editor__button"
					type="button"
					on:click={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
					class:active={editor.isActive('heading', { level: 5 })}
				>
					h5
				</button>
				<button
					class="button editor__button"
					type="button"
					on:click={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
					class:active={editor.isActive('heading', { level: 6 })}
				>
					h6
				</button>
				<button
					class="button editor__button"
					type="button"
					on:click={() => editor.chain().focus().setParagraph().run()}
					class:active={editor.isActive('paragraph')}
				>
					p
				</button>
				<button
					class="button editor__button"
					on:click={() => editor.chain().focus().toggleBlockquote().run()}
					class:active={editor.isActive('blockquote')}
				>
					"
				</button>
			</div>
			<div class="editor__buttons">
				<button
					class="button editor__button editor__button--bold"
					on:click={() => editor.chain().focus().toggleBold().run()}
					disabled={!editor.can().chain().focus().toggleBold().run()}
					class:active={editor.isActive('bold')}
				>
					B
				</button>
				<button
					class="button editor__button editor__button--italic"
					on:click={() => editor.chain().focus().toggleItalic().run()}
					disabled={!editor.can().chain().focus().toggleItalic().run()}
					class:active={editor.isActive('italic')}
				>
					I
				</button>
			</div>
			<div class="editor__buttons">
				<button
					class="button editor__button"
					class:active={editor.isActive({ textAlign: 'left' })}
					type="button"
					aria-label="align left"
					on:click={() => editor.chain().focus().setTextAlign('left').run()}><AlignLeft /></button
				>
				<button
					class="button editor__button"
					class:active={editor.isActive({ textAlign: 'center' })}
					type="button"
					on:click={() => editor.chain().focus().setTextAlign('center').run()}
					aria-label="align center"><AlignCenter /></button
				>
				<button
					class="button editor__button"
					class:active={editor.isActive({ textAlign: 'right' })}
					type="button"
					on:click={() => editor.chain().focus().setTextAlign('right').run()}
					aria-label="align right"><AlignRight /></button
				>
			</div>
			<div class="editor__buttons">
				<button
					class="button editor__button"
					type="button"
					on:click={() => editor.chain().focus().toggleBulletList().run()}
					class:active={editor.isActive('bulletList')}
					aria-label="bullet list"
				>
					<BulletListLink />
				</button>
				<button
					class="button editor__button"
					type="button"
					on:click={() => editor.chain().focus().toggleOrderedList().run()}
					class:active={editor.isActive('orderedList')}
				>
					<OrderedListLink />
				</button>
			</div>
			<div class="editor__buttons">
				<div class="editor__wrapper">
					<button
						class="button editor__button"
						type="button"
						on:click={() => {
							linkPopover.open();
							url = editor.getAttributes('link').href ?? '';
						}}
						class:active={editor.isActive('link')}
						aria-label="add link"
					>
						<LinkIcon />
					</button>
					<Popover
						bind:this={linkPopover}
						on:cancel={handleCloseLinkPopover}
						on:confirm={handleConfirmAddLink}
					>
						<Input label="URL:" placeholder="https://example.net" bind:value={url} />
					</Popover>
				</div>
				<div class="editor__wrapper">
					<button
						class="button editor__button"
						type="button"
						aria-label="add image"
						on:click={() => {
							imagePopover.open();
						}}><ImageIcon /></button
					>
					<Popover
						bind:this={imagePopover}
						on:cancel={handleCloseImagePopover}
						on:confirm={handleConfirmAddImage}
					>
						<div class="editor__popover-container editor__popover-container--url">
							<Input label="URL:" placeholder="https://example.net" bind:value={imageUrl} />
							<button
								class="button editor__button editor__button--upload"
								type="button"
								aria-label="open filemanager"
								on:click={handleOpenFilemanager}
							>
								<Upload />
							</button>
						</div>
						<Input label="Alt attribute:" placeholder="Alt attribute text" bind:value={imageAlt} />
					</Popover>
				</div>
			</div>
			<div class="editor__buttons">
				<button
					class="button editor__button"
					type="button"
					aria-label="open HTML source editor"
					on:click={handleOpenHTMLEditorModal}
				>
					<Source />
				</button>
				<button
					class="button editor__button"
					type="button"
					aria-label="toggle fullscreen"
					on:click={handleFullscreenMode}><Fullscreen /></button
				>
			</div>
		</div>
	{/if}

	<div class="editor__element" bind:this={element} />

	<input type="hidden" {name} bind:value />
</div>

<style>
	.editor {
		border: 1px solid var(--color--gray-85);
		border-radius: 4px;
	}

	.editor--fullscreen {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: var(--color--white);
		z-index: 1;
	}

	.editor__controls {
		display: flex;
		border-bottom: 1px solid var(--color--gray-85);
	}

	.editor__buttons {
		display: flex;
		gap: 2px;
		padding: 2px 4px;
		border-right: 1px solid var(--color--gray-85);
	}

	div.editor__buttons:last-of-type {
		border: none;
	}

	.editor__button {
		width: 34px;
		height: 34px;
		padding: 2px;
		display: grid;
		place-items: center;
		background-color: transparent;
		color: var(--color--gray-15);
		font-weight: 400;
		--color--icon: var(--color--black);
	}

	.editor__button:hover,
	.editor__button:focus-visible {
		background-color: var(--color--gray-95);
	}

	.editor__button:disabled {
		--color--icon: var(--color--gray-50);
	}
	.editor__button:disabled:hover {
		background-color: var(--color--white);
	}

	.editor__button--bold {
		font-weight: 700;
		font-size: 18px;
	}

	.editor__button--italic {
		font-family: 'Times New Roman', Times, serif;
		font-size: 18px;
		font-style: italic;
	}

	.active,
	.active:hover,
	.active:focus-visible {
		background: var(--color--black);
		color: var(--color--white);
		--color--icon: var(--color--white);
	}

	.editor__element {
		min-height: 200px;
		padding: 20px;
	}

	.editor__wrapper {
		position: relative;
	}

	.editor__popover-container {
		display: grid;
		gap: 10px;
	}

	.editor__popover-container--url {
		grid-template-columns: 1fr 34px;
		align-items: end;
	}

	.editor__button--upload {
		background-color: var(--color--black);
		--color--icon: var(--color--white);
	}

	.editor__button--upload:hover,
	.editor__button--upload:focus-visible {
		background-color: var(--color--primary);
	}

	.editor__button--upload:active {
		background-color: var(--color--gray-50);
	}

	.html__field {
		height: 100%;
	}

	:global(.html__field .field) {
		height: 100%;
	}
	:global(.html__field .field .field__wrapper) {
		height: 99%;
	}

	.html__controls {
		display: flex;
		justify-content: end;
	}

	:global(.editor__element > div) {
		height: 100%;
		min-height: inherit;
		outline: 0;
	}

	:global(.editor__element blockquote) {
		border-left: 2px solid var(--color--gray-85);
		margin-left: 1.5rem;
		padding-left: 1rem;
	}

	:global(.editor__element ul) {
		margin: 5px 0 5px 40px;
	}

	:global(.editor__element ol) {
		margin: 5px 0;
	}
	:global(.editor__element ul li) {
		list-style-type: disc;
		margin: 10px 0;
	}

	:global(.editor__element ol li) {
		list-style-type: decimal;
		margin: 10px 0;
	}

	:global(.editor__element img) {
		width: 500px;
	}
</style>
