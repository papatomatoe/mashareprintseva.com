import Paragraph from '@tiptap/extension-paragraph';
import Heading from '@tiptap/extension-heading';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Blockquote from '@tiptap/extension-blockquote';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import HardBreak from '@tiptap/extension-hard-break';
import History from '@tiptap/extension-history';
import Document from '@tiptap/extension-document';
import Text from '@tiptap/extension-text';
import ListItem from '@tiptap/extension-list-item';
import Dropcursor from '@tiptap/extension-dropcursor';
import Gapcursor from '@tiptap/extension-gapcursor';

type AttributeType = Record<string, any>;

const regex = /text-align:\s*(center|left|right)\s*(?:;|\b)/gi;

const attributesConfig = {
	class: {
		default: '',
		renderHTML: (attributes: AttributeType) =>
			attributes.class
				? {
						class: `${attributes.class}`
					}
				: null
	},
	style: {
		default: '',
		renderHTML: (attributes: AttributeType) => {
			if (!attributes.style) return;

			return {
				style:
					'textAlign' in attributes
						? attributes.style.replace(regex, `text-align: ${attributes.textAlign};`)
						: attributes.style
			};
		}
	}
};

export const CUSTOM_EXTENSIONS = [
	Paragraph.extend({
		addAttributes() {
			return attributesConfig;
		}
	}),
	Heading.extend({
		addAttributes() {
			return attributesConfig;
		}
	}),
	Blockquote.extend({
		addAttributes() {
			return attributesConfig;
		}
	}),
	Image.extend({
		addAttributes() {
			return {
				...attributesConfig,
				src: {
					default: '',
					renderHTML: (attributes: AttributeType) =>
						attributes.src
							? {
									src: `${attributes.src}`
								}
							: null
				},
				alt: {
					default: '',
					renderHTML: (attributes: AttributeType) => {
						return {
							alt: attributes.alt
						};
					}
				}
			};
		}
	}),
	Link.extend({
		addAttributes() {
			return attributesConfig;
		}
	}).configure({
		openOnClick: false,
		autolink: true
	}),
	BulletList.extend({
		addAttributes() {
			return attributesConfig;
		}
	}),
	OrderedList.extend({
		addAttributes() {
			return attributesConfig;
		}
	}),
	ListItem,
	HardBreak,
	TextAlign.configure({
		types: ['heading', 'paragraph']
	}),
	Bold,
	Italic,
	Document,
	Text,
	History,
	Dropcursor,
	Gapcursor
];
