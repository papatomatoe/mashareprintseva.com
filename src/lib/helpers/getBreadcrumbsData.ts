export const getBreadcrumbsData = (path: string) =>
	path
		.split('/')
		.slice(1)
		.reduce<any>((acc, el, idx, arr) => {
			let path = '';
			for (let i = 0; i <= idx; i += 1) {
				path += `/${arr[i]}`;
			}

			if (el === 'admin') {
				return [...acc, { title: 'dashboard', path: '/admin/dashboard' }];
			}

			return [...acc, { title: el, path }];
		}, []);
