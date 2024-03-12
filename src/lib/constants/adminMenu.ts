import MainPage from '$lib/icons/MainPage.svelte';
import BioPage from '$lib/icons/BioPage.svelte';
import Sections from '$lib/icons/Sections.svelte';
import Projects from '$lib/icons/Projects.svelte';
import Socials from '$lib/icons/Socials.svelte';
import Users from '$lib/icons/Users.svelte';
import Files from '$lib/icons/Files.svelte';

export const ADMIN_MENU = [
	{ id: 'MainPage', title: 'Main Page', href: '/admin/main-page', icon: MainPage },
	{ id: 'BioPage', title: 'Bio Page', href: '/admin/bio-page', icon: BioPage },
	{ id: 'Sections', title: 'Sections', href: '/admin/sections', icon: Sections },
	{ id: 'Projects', title: 'Projects', href: '/admin/projects', icon: Projects },
	{ id: 'Socials', title: 'Socials', href: '/admin/socials', icon: Socials },
	{ id: 'Users', title: 'Users', href: '/admin/users', icon: Users },
	{ id: 'Files', title: 'Files', href: '/admin/files', icon: Files }
];
