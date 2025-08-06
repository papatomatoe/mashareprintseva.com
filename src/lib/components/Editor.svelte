<script lang="ts">
	import { onMount } from 'svelte';
	import { Editor } from '@tiptap/core';

	import Input from '$lib/components/Input.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import Filemanager from '$lib/components/Filemanager.svelte';
	import ConfirmPanel from '$lib/components/ConfirmPanel.svelte';
	import Popover from '$lib/components/Popover.svelte';
	import Textarea from '$lib/components/Textarea.svelte';

	import UndoLink from '$lib/icons/Undo.svelte';
	import RedoLink from '$lib/icons/Redo.svelte';
	import BulletList from '$lib/icons/BulletList.svelte';
	import OrderedList from '$lib/icons/OrderedList.svelte';
	import LinkIcon from '$lib/icons/Link.svelte';
	import ImageIcon from '$lib/icons/Image.svelte';
	import Upload from '$lib/icons/Upload.svelte';
	import Source from '$lib/icons/Source.svelte';
	import Fullscreen from '$lib/icons/Fullscreen.svelte';
	import AlignLeft from '$lib/icons/AlignLeft.svelte';
	import AlignCenter from '$lib/icons/AlignCenter.svelte';
	import AlignRight from '$lib/icons/AlignRight.svelte';
	import MakeNestedList from '$lib/icons/MakeNestedList.svelte';
	import UndoNestedList from '$lib/icons/UndoNestedList.svelte';

	import { CUSTOM_EXTENSIONS } from '$lib/configs/tiptap';

	export let label = '';
	export let name = '';
	export let value = '';

	let element: HTMLDivElement;
	let editor: Editor;
	let modalFileManager: any;
	let modalHTMLEditor: any;
	let filemanager: any;
	let linkPopover: any;
	let imagePopover: any;
	let textPopover: any;

	type URLType = 'link' | 'image';

	let popoverUrlType: URLType | null = null;

	let linkUrl = '';

	let imageUrl = '';
	let imageAlt = '';

	let sourceHTML = '';

	let isDisabledSelectButton = false;
	let isFullscreenMode = false;

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: CUSTOM_EXTENSIONS,
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
		if (linkUrl === '') {
			editor.chain().focus().extendMarkRange('link').unsetLink().run();
			return;
		}

		editor.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run();
	};

	const handleCloseLinkPopover = () => {
		linkPopover.close();
		linkUrl = '';
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

	const handleConfirmSelectFile = () => {
		const [image] = filemanager.getFiles();

		if (popoverUrlType === 'image') {
			imageUrl = image.url;
		} else if (popoverUrlType === 'link') {
			linkUrl = image.url;
		}

		filemanager.resetSelection();
		modalFileManager.close();
	};

	const handleCheckFiles = (e) => {
		isDisabledSelectButton = e.detail.ids.length !== 1;
	};

	const handleOpenFilemanager = async (type: URLType) => {
		popoverUrlType = type;
		await filemanager.fetchFilesData();
		modalFileManager.open();
	};

	const handleCancelSelectFile = () => {
		popoverUrlType = null;
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
	const handleOpenTextPopover = () => {
		textPopover.open();
	};
</script>

<Modal bind:this={modalFileManager}>
	<Filemanager bind:this={filemanager} on:check={handleCheckFiles} />
	<div slot="bottom">
		<ConfirmPanel
			disabled={isDisabledSelectButton}
			on:cancel={handleCancelSelectFile}
			on:confirm={handleConfirmSelectFile}
		/>
	</div>
</Modal>

<Modal bind:this={modalHTMLEditor}>
	<div class="html__field">
		<Textarea bind:value={sourceHTML} />
	</div>
	<div class="html__controls" slot="bottom">
		<ConfirmPanel
			on:cancel={handleCancelEditHTML}
			on:confirm={handleConfirmEditHTML}
			confirmText="Done"
		/>
	</div>
</Modal>

<div class="col-span-2">
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
					<div class="editor__wrapper">
						<button class="button editor__button" type="button" on:click={handleOpenTextPopover}
							>text</button
						>
						<Popover bind:this={textPopover} disableControls={true}>
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
									type="button"
									on:click={() => editor.chain().focus().toggleBlockquote().run()}
									class:active={editor.isActive('blockquote')}
								>
									"
								</button>
								<button
									class="button editor__button"
									type="button"
									on:click={() => editor.chain().focus().setHardBreak().run()}
								>
									br
								</button>
								<button
									class="button editor__button editor__button--bold"
									type="button"
									on:click={() => editor.chain().focus().toggleBold().run()}
									disabled={!editor.can().chain().focus().toggleBold().run()}
									class:active={editor.isActive('bold')}
									aria-label="set bold text"
								>
									B
								</button>
								<button
									class="button editor__button editor__button--italic"
									type="button"
									on:click={() => editor.chain().focus().toggleItalic().run()}
									disabled={!editor.can().chain().focus().toggleItalic().run()}
									class:active={editor.isActive('italic')}
									aria-label="set italic text"
								>
									I
								</button>
							</div>
						</Popover>
					</div>
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
						aria-label="unordered list"
					>
						<BulletList />
					</button>
					<button
						class="button editor__button"
						type="button"
						on:click={() => editor.chain().focus().toggleOrderedList().run()}
						class:active={editor.isActive('orderedList')}
						aria-label="ordered list"
					>
						<OrderedList />
					</button>
				</div>
				<div class="editor__buttons">
					<button
						class="button editor__button"
						type="button"
						on:click={() => editor.chain().focus().sinkListItem('listItem').run()}
						disabled={!editor.can().sinkListItem('listItem')}
						aria-label="make nested list item"
					>
						<MakeNestedList />
					</button>
					<button
						class="button editor__button"
						type="button"
						on:click={() => editor.chain().focus().liftListItem('listItem').run()}
						disabled={!editor.can().liftListItem('listItem')}
						aria-label="undo nested list item"
					>
						<UndoNestedList />
					</button>
				</div>
				<div class="editor__buttons">
					<div class="editor__wrapper">
						<button
							class="button editor__button"
							type="button"
							on:click={() => {
								linkPopover.open();
								linkUrl = editor.getAttributes('link').href ?? '';
							}}
							class:active={editor.isActive('link')}
							aria-label="add link"
						>
							<LinkIcon />
						</button>
						<Popover
							disableAutoHide
							bind:this={linkPopover}
							on:cancel={handleCloseLinkPopover}
							on:confirm={handleConfirmAddLink}
						>
							<div class="editor__popover-container editor__popover-container--url">
								<Input label="URL:" placeholder="https://example.net" bind:value={linkUrl} />
								<button
									class="button editor__button editor__button--upload"
									type="button"
									aria-label="open filemanager"
									on:click={() => {
										handleOpenFilemanager('link');
									}}
								>
									<Upload />
								</button>
							</div>
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
							disableAutoHide
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
									on:click={() => {
										handleOpenFilemanager('image');
									}}
								>
									<Upload />
								</button>
							</div>
							<Input
								label="Alt attribute:"
								placeholder="Alt attribute text"
								bind:value={imageAlt}
							/>
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
</div>

<style>
	.editor {
		border: 1px solid var(--color--gray-85);
		border-radius: 4px;
	}

	.editor__controls {
		display: flex;
		border-bottom: 1px solid var(--color--gray-85);
	}

	.editor__buttons {
		display: flex;
		gap: 2px;
		border-right: 1px solid var(--color--gray-85);
		padding: 2px 4px;
	}

	div.editor__buttons:last-of-type {
		border: none;
	}

	.editor__button {
		display: grid;
		place-items: center;
		background-color: transparent;
		padding: 2px;
		width: 34px;
		height: 34px;
		color: var(--color--gray-15);
		font-weight: 400;
		--color--icon: var(--color--black);
	}

	.editor__button:hover,
	.editor__button:focus-visible {
		background-color: var(--color--gray-95);
	}

	.editor__button:disabled {
		--color--icon: var(--color--gray-85);
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
		background: var(--color--black);
		color: var(--color--white);
		--color--icon: var(--color--white);
	}

	.editor__element {
		padding: 20px;
		min-height: 200px;
		max-height: 600px;
		overflow-y: auto;
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
		height: 99%;
	}
	:global(.html__field .field .field__wrapper) {
		height: 99%;
	}
	:global(.html__field .field__input) {
		resize: none;
	}

	.html__controls {
		display: flex;
		justify-content: end;
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

	.editor--fullscreen {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1;
		background-color: var(--color--white);
		width: 100vw;
		height: 100vh;
	}

	.editor--fullscreen .editor__element {
		max-height: calc(100% - 39px);
	}
</style>
