import type { BooknavGroup, BooknavPageConfig } from "../types/booknavConfig";

// 书签导航页面配置
export const booknavPageConfig: BooknavPageConfig = {
	// 页面标题，如果留空则使用 i18n 中的翻译
	title: "",

	// 页面描述文本，如果留空则使用 i18n 中的翻译
	description: "",

	// favicon 自动获取配置
	favicon: {
		// 书签未填写 icon 时，是否自动获取目标站点的 favicon 图标
		enabled: true,

		// favicon 接口地址，{domain} 为占位符，会被替换成目标站点域名
		// 更换接口只需保证地址里含有 {domain}，例如：
		//   https://a.favicon.im/{domain}
		//   https://favicon.im/{domain}
		api: "https://a.favicon.im/{domain}",
	},
};

// 书签导航配置
// 每个数组项是一个分类组，分类组内的 items 是该分类下的书签
export const booknavConfig: BooknavGroup[] = [
	{
		id: "dev",
		name: "Development",
		icon: "material-symbols:code-rounded",
		desc: "Essential development resources and frameworks",
		weight: 100,
		items: [
			{
				title: "GitHub",
				url: "https://github.com",
				desc: "Where the world builds software",
				icon: "fa7-brands:github",
				weight: 10,
			},
			{
				title: "MDN Web Docs",
				url: "https://developer.mozilla.org",
				desc: "Resources for developers, by developers",
				weight: 9,
			},
			{
				title: "Astro",
				url: "https://astro.build",
				desc: "The web framework for content-driven websites",
				weight: 8,
			},
			{
				title: "Svelte",
				url: "https://svelte.dev",
				desc: "Cybernetically enhanced web apps",
				weight: 7,
			},
			{
				title: "Tailwind CSS",
				url: "https://tailwindcss.com",
				desc: "Rapidly build modern websites without leaving your HTML",
				weight: 6,
			},
		],
	},
	{
		id: "design",
		name: "Design & Icons",
		icon: "material-symbols:palette-outline-rounded",
		desc: "Icons, colors, and design inspiration",
		weight: 90,
		items: [
			{
				title: "Iconify",
				url: "https://icon-sets.iconify.design",
				desc: "Search and explore open source icon sets",
				weight: 10,
			},
			{
				title: "Lucide Icons",
				url: "https://lucide.dev",
				desc: "Beautiful & consistent open-source icons",
				weight: 9,
			},
		],
	},
	{
		id: "tools",
		name: "Tools",
		icon: "material-symbols:build-outline-rounded",
		desc: "Handy developer and media utilities",
		weight: 80,
		items: [
			{
				title: "TinyPNG",
				url: "https://tinypng.com",
				desc: "Smart WebP, PNG, and JPEG compression",
				weight: 10,
			},
			{
				title: "Squoosh",
				url: "https://squoosh.app",
				desc: "Image compression in the browser by Google",
				weight: 9,
			},
			{
				title: "Carbon",
				url: "https://carbon.now.sh",
				desc: "Create and share beautiful images of your source code",
				weight: 8,
			},
		],
	},
];
