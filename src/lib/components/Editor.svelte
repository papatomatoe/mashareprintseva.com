<script lang="ts">
	import { onMount } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Link from '@tiptap/extension-link';
	import UndoLink from '$lib/icons/Undo.svelte';
	import RedoLink from '$lib/icons/Redo.svelte';
	import BulletListLink from '$lib/icons/BulletList.svelte';
	import OrderedListLink from '$lib/icons/OrderedList.svelte';
	import LinkIcon from '$lib/icons/Link.svelte';
	import Input from '$lib/components/Input.svelte';

	export let label = '';
	export let name = '';
	export let value = '';

	let element: HTMLDivElement;
	let editor: Editor;

	let url = '';

	let isLinkPopoverShow = false;

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [
				StarterKit,
				Link.configure({
					openOnClick: false,
					autolink: true
				})
			],
			content: value,
			onTransaction: () => {
				editor = editor;
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
</script>

<p>{label}</p>
<div class="editor">
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
				<div class="editor__link">
					<button
						class="button editor__button"
						type="button"
						on:click={() => {
							isLinkPopoverShow = true;
							url = editor.getAttributes('link').href ?? '';
						}}
						class:active={editor.isActive('link')}
					>
						<LinkIcon />
					</button>
					<div class="editor__popover popover" class:editor__popover-show={isLinkPopoverShow}>
						<Input label="URL:" placeholder="https://example.net" bind:value={url} />
						<div class="popover__buttons">
							<button
								class="button button--cancel"
								type="button"
								on:click={() => {
									isLinkPopoverShow = false;
									url = '';
								}}>Cancel</button
							>
							<button
								class="button"
								type="button"
								on:click={() => {
									handleSetLink();
									isLinkPopoverShow = false;
									url = '';
								}}>Add</button
							>
						</div>
					</div>
				</div>
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

	button.active {
		background: var(--color--black);
		color: var(--color--white);
	}

	.editor__element {
		min-height: 200px;
		padding: 20px;
	}

	.editor__link {
		position: relative;
	}

	.editor__popover {
		position: absolute;
		padding: 10px;
		display: none;
		flex-direction: column;
		gap: 10px;
		background-color: var(--color--white);
		border: 1px solid var(--color--gray-85);
		border-radius: 4px;
		width: 300px;
		top: 100%;
		right: 0;
		z-index: 1;
		box-shadow: 0 3px 10px -7px var(--color--black);
	}

	.editor__popover-show {
		display: flex;
	}

	.popover__buttons {
		display: flex;
		gap: 10px;
		justify-content: end;
	}
	:global(.editor__element > div) {
		height: 100%;
		min-height: 100%;
		outline: 0;
	}

	:global(.editor__element blockquote) {
		border-left: 2px solid var(--color--gray-85);
		margin-left: 1.5rem;
		padding-left: 1rem;
	}

	:global(.editor__element ul, .editor__element ol) {
		margin: 5px 0 5px 40px;
	}
	:global(.editor__element ul li) {
		list-style-type: disc;
		margin: 10px 0;
	}

	:global(.editor__element ol li) {
		list-style-type: decimal;
		margin: 10px 0;
	}
</style>
