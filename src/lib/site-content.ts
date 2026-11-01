export type MenuItem = {
	name: string;
	price: string;
	imageAlt: string;
	imageSrc?: string;
	imageUrl?: string;
};

export type MenuCategory = {
	name: string;
	items: MenuItem[];
};

export type Notice = {
	title: string;
	body: string;
};

export type StoreInfo = {
	name: string;
	address: string;
	access: string;
	businessHours: string;
	regularHoliday: string;
	telephone: string;
	mapUrl: string;
};

export type SiteContent = {
	menus: MenuCategory[];
	notices: Notice[];
	store: StoreInfo;
	source: 'fallback' | 'microcms';
};

const fallbackContent: Omit<SiteContent, 'source'> = {
	menus: [
		{ name: 'たこ焼き', items: [
			{ name: '醤油', price: '480円', imageSrc: '/images/menu-soy-sauce.jpg', imageAlt: '醤油の写真' },
			{ name: '醤油マヨ', price: '480円', imageSrc: '/images/menu-soy-mayo.jpg', imageAlt: '醤油マヨの写真' },
			{ name: 'ソース', price: '480円', imageSrc: '/images/menu-sauce.jpg', imageAlt: 'ソースの写真' },
			{ name: 'ソースマヨ', price: '480円', imageSrc: '/images/menu-sauce-mayo.jpg', imageAlt: 'ソースマヨの写真' },
			{ name: '塩', price: '480円', imageSrc: '/images/menu-salt.jpg', imageAlt: '塩の写真' },
			{ name: 'ネギ醤油マヨ', price: '540円', imageSrc: '/images/menu-green-onion-soy-mayo.jpg', imageAlt: 'ネギ醤油マヨの写真' },
			{ name: 'ネギソースマヨ', price: '540円', imageSrc: '/images/menu-green-onion-sauce-mayo.jpg', imageAlt: 'ネギソースマヨの写真' },
			{ name: 'ネギポンマヨ', price: '540円', imageSrc: '/images/menu-green-onion-ponzu-mayo.jpg', imageAlt: 'ネギポンマヨの写真' },
			{ name: 'ネギ塩', price: '540円', imageSrc: '/images/menu-green-onion-salt.jpg', imageAlt: 'ネギ塩の写真' },
			{ name: 'ネギ梅マヨ', price: '540円', imageSrc: '/images/menu-green-onion-plum-mayo.jpg', imageAlt: 'ネギ梅マヨの写真' },
		] },
		{ name: 'お好み焼き', items: [
			{ name: 'お好み焼き（豚玉・イカ玉）', price: '440円', imageSrc: '/images/menu-okonomiyaki.jpeg', imageAlt: 'お好み焼き（豚玉・イカ玉）の写真' },
			{ name: 'お好み焼き（ミックス）', price: '480円', imageSrc: '/images/menu-okonomiyaki.jpeg', imageAlt: 'お好み焼き（ミックス）の写真' },
		] },
		{ name: 'その他', items: [
			{ name: 'みたらし団子', price: '100円（5本 450円）', imageSrc: '/images/menu-mitarashi.jpeg', imageAlt: 'みたらし団子の写真' },
			{ name: '五平餅', price: '200円', imageSrc: '/images/menu-gohei-mochi.jpg', imageAlt: '五平餅の写真' },
			{ name: 'チョコマント団子', price: '200円', imageSrc: '/images/menu-choco-manto.jpg', imageAlt: 'チョコマント団子の写真' },
			{ name: '夢福餅', price: '200円', imageSrc: '/images/menu-yumefuku-mochi.jpg', imageAlt: '夢福餅の写真' },
			{ name: '塩豆大福', price: '200円', imageSrc: '/images/menu-shiomame-daifuku.jpg', imageAlt: '塩豆大福の写真' },
			{ name: '抹茶大福', price: '200円', imageSrc: '/images/menu-matcha-daifuku.jpg', imageAlt: '抹茶大福の写真' },
			{ name: '田楽わらび餅（三ヶ日みかん）', price: '200円', imageSrc: '/images/menu-mikan-warabi.jpg', imageAlt: '田楽わらび餅（三ヶ日みかん）の写真' },
			{ name: 'わらび餅（きな粉）', price: '200円', imageSrc: '/images/menu-kinako-warabi.png', imageAlt: 'わらび餅（きな粉）の写真' },
		] },
	],
	notices: [{
		title: '営業に関するお知らせ',
		body: '最新の営業日・休業日は、店頭またはお電話でご確認ください。',
	}],
	store: {
		name: 'きわみ 大高店',
		address: '〒459-8001 愛知県名古屋市緑区大高町天神70',
		access: 'JR「大高駅」から徒歩5分',
		businessHours: '10:00〜19:00',
		regularHoliday: '火曜日',
		telephone: '052-629-6005',
		mapUrl: 'https://www.google.com/maps/search/?api=1&query=愛知県名古屋市緑区大高町天神70',
	},
};

type MicroCMSMedia = { url: string; alt?: string };
type MicroCMSMenu = {
	name: string;
	price: string | number;
	category: string;
	image?: MicroCMSMedia;
	image_alt?: string;
	display_order?: number;
	is_visible?: boolean;
};
type MicroCMSNotice = { title: string; body: string };
type MicroCMSStore = {
	name: string;
	address: string;
	access: string;
	business_hours: string;
	regular_holiday: string;
	telephone: string;
	map_url: string;
};
type MicroCMSList<T> = { contents: T[] };

const categoryOrder = ['たこ焼き', 'お好み焼き', 'その他'];

function getConfiguration() {
	const serviceDomain = import.meta.env.MICROCMS_SERVICE_DOMAIN;
	const apiKey = import.meta.env.MICROCMS_API_KEY;

	if (!serviceDomain || !apiKey) {
		throw new Error('MICROCMS_ENABLED=true requires MICROCMS_SERVICE_DOMAIN and MICROCMS_API_KEY.');
	}
	if (!/^[a-z0-9-]+$/i.test(serviceDomain)) {
		throw new Error('MICROCMS_SERVICE_DOMAIN must contain only letters, numbers, and hyphens.');
	}

	return { serviceDomain, apiKey };
}

async function fetchMicroCMS<T>(endpoint: string, parameters = ''): Promise<T> {
	const { serviceDomain, apiKey } = getConfiguration();
	const response = await fetch(`https://${serviceDomain}.microcms.io/api/v1/${endpoint}${parameters}`, {
		headers: { 'X-MICROCMS-API-KEY': apiKey },
	});

	if (!response.ok) {
		throw new Error(`microCMS request for ${endpoint} failed with ${response.status}.`);
	}

	return response.json() as Promise<T>;
}

function isSafeMediaUrl(value: string) {
	try {
		const url = new URL(value);
		return url.protocol === 'https:' && url.hostname === 'images.microcms-assets.io';
	} catch {
		return false;
	}
}

function getSafeMapUrl(value: string) {
	try {
		const url = new URL(value);
		const allowedHosts = ['www.google.com', 'maps.google.com', 'maps.app.goo.gl'];
		if (url.protocol === 'https:' && allowedHosts.includes(url.hostname)) {
			return url.href;
		}
	} catch {
		// The shared error below gives the CMS editor a consistent remediation message.
	}

	throw new Error('shop.map_url must be an HTTPS URL from Google Maps.');
}

function groupMenus(contents: MicroCMSMenu[]): MenuCategory[] {
	const visibleMenus = contents.filter((item) => item.is_visible !== false);
	const groups = new Map<string, Array<MicroCMSMenu & { index: number }>>();

	visibleMenus.forEach((item, index) => {
		const group = groups.get(item.category) ?? [];
		group.push({ ...item, index });
		groups.set(item.category, group);
	});

	return [...groups.entries()]
		.sort(([first], [second]) => {
			const firstIndex = categoryOrder.indexOf(first);
			const secondIndex = categoryOrder.indexOf(second);
			return (firstIndex === -1 ? Number.MAX_SAFE_INTEGER : firstIndex) - (secondIndex === -1 ? Number.MAX_SAFE_INTEGER : secondIndex);
		})
		.map(([name, items]) => ({
			name,
			items: items
				.sort((first, second) => (first.display_order ?? first.index) - (second.display_order ?? second.index))
				.map((item) => {
					if (!item.image?.url || !isSafeMediaUrl(item.image.url)) {
						throw new Error(`Menu "${item.name}" must have an image hosted by microCMS.`);
					}

					return {
						name: item.name,
						price: String(item.price),
						imageUrl: item.image.url,
						imageAlt: item.image_alt || item.image.alt || `${item.name}の写真`,
					};
				}),
		}));
}

export async function getSiteContent(): Promise<SiteContent> {
	if (import.meta.env.MICROCMS_ENABLED !== 'true') {
		return { ...fallbackContent, source: 'fallback' };
	}

	const [menus, notices, store] = await Promise.all([
		fetchMicroCMS<MicroCMSList<MicroCMSMenu>>('menus', '?limit=100'),
		fetchMicroCMS<MicroCMSList<MicroCMSNotice>>('notices', '?limit=3&orders=-publishedAt'),
		fetchMicroCMS<MicroCMSStore>('shop'),
	]);

	return {
		menus: groupMenus(menus.contents),
		notices: notices.contents.map(({ title, body }) => ({ title, body })),
		store: {
			name: store.name,
			address: store.address,
			access: store.access,
			businessHours: store.business_hours,
			regularHoliday: store.regular_holiday,
			telephone: store.telephone,
			mapUrl: getSafeMapUrl(store.map_url),
		},
		source: 'microcms',
	};
}
