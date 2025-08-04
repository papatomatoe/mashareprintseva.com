import {
	Folder,
	House,
	UserRound,
	UsersRound,
	LibraryBig,
	BookOpenText,
	MessageSquareMore
} from '@lucide/svelte';

export const ADMIN_MENU = [
	{ id: 'MainPage', title: 'Main Page', href: '/admin/main-page', icon: House },
	{ id: 'BioPage', title: 'Bio Page', href: '/admin/bio-page', icon: UserRound },
	{ id: 'Sections', title: 'Sections', href: '/admin/sections', icon: LibraryBig },
	{ id: 'Projects', title: 'Projects', href: '/admin/projects', icon: BookOpenText },
	{ id: 'Socials', title: 'Socials', href: '/admin/socials', icon: MessageSquareMore },
	{ id: 'Users', title: 'Users', href: '/admin/users', icon: UsersRound },
	{ id: 'Files', title: 'Files', href: '/admin/files', icon: Folder }
];
