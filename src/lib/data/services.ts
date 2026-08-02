import type { Service } from '$lib/types';

export const services: Service[] = [
	{
		id: '1',
		slug: 'website-development',
		title: 'Website Development',
		intro:
			'However small the idea — even just a scribble on paper — we can still turn it into something real, while keeping the standard: fast, scalable, precise, professional. The raw material can be simple; the result won\'t be.',
		description:
			'Complex Design Studio builds digital products using the latest technology — Next.js, Laravel, Golang, and Flutter — or WordPress and Shopify CMS when that\'s the right fit.',
		localizations: {
			id: {
				intro:
					'Sekecil apa pun idenya — bahkan cuma coretan di kertas — kami tetap bisa mengolahnya, sambil tetap jaga standar: cepat, scalable, presisi, profesional. Bahan mentahnya boleh sederhana, hasilnya tidak.',
				description:
					'Complex Design Studio membangun produk digital menggunakan teknologi terbaru seperti Next.js, Laravel, Golang, dan Flutter — atau CMS WordPress dan Shopify ketika itu memang jadi pilihan yang tepat.'
			}
		},
		icon: '',
		items: [
			'Web Applications',
			'Web Design & CMS',
			'SaaS Platforms',
			'API Integrations',
			'Maintenance & Support',
			'Scaling & Performance'
		]
	},
	{
		id: '2',
		slug: 'mobile-application',
		title: 'Mobile Application',
		intro:
			"Maybe it's time the world found out — Complex Design Studio has a track record that's more than enough for building world-class mobile apps: secure, fast, flexible, and cost-effective for your business goals.",
		description:
			"We build reliable iOS and Android applications, starting with a well-thought-out user experience. Everything is carefully put together — from strategy to file structure to database — then it's just a matter of reaching out to us for the next step.",
		localizations: {
			id: {
				intro:
					'Mungkin memang saatnya dunia tahu, Complex Design Studio punya rekam jejak yang lebih dari cukup dalam membangun aplikasi mobile berkelas — aman, cepat, fleksibel, dan hemat biaya untuk mendukung tujuan bisnis Anda.',
				description:
					'Kami membangun aplikasi iOS dan Android yang andal, dimulai dari user experience yang matang. Semuanya disusun perlahan — mulai dari strategi, struktur file, hingga database — lalu tinggal hubungi kami untuk langkah selanjutnya.'
			}
		},
		icon: '',
		items: [
			'iOS & Android Apps',
			'Internal Business Tools',
			'API Development',
			'Booking & Scheduling',
			'LMS & Education Platforms',
			'Payment Systems'
		]
	},
	{
		id: '3',
		slug: 'digital-marketing',
		title: 'Digital Marketing',
		intro:
			"We're working to make your competitors nervous — Complex Design Studio builds marketing strategies that don't just look good in a report, they actually move the numbers that matter.",
		description:
			'We help brands grow online through data-driven digital marketing — from SEO, Google Ads, Meta Ads, and marketplace to content strategy and performance tracking.',
		localizations: {
			id: {
				intro:
					'Kami berusaha agar kompetitor Anda mulai khawatir — Complex Design Studio menyusun strategi marketing yang bukan cuma bagus di laporan, tapi benar-benar menggerakkan angka yang penting.',
				description:
					'Kami membantu brand berkembang secara online melalui digital marketing yang berbasis data — mulai dari SEO, Google Ads, Meta Ads, Marketplace, hingga strategi konten dan pelacakan performa.'
			}
		},
		icon: '',
		items: [
			'SEO (Search Engine Optimization)',
			'SEM (Search Engine Marketing)',
			'Competitor & Market Research',
			'Social Media Plan Management',
			'Social Media Ad Campaigns',
			'Content Platforms'
		]
	},
	{
		id: '4',
		slug: 'ux-design',
		title: 'User Experience Design',
		intro:
			'Somewhere, a user just spent five minutes lost in a menu trying to log out. We design UX so that never happens on your product.',
		description:
			'We design intuitive user experiences — from research and wireframing to prototyping and usability testing — so every product feels effortless to use.',
		localizations: {
			id: {
				intro:
					'Di suatu tempat, ada pengguna yang nyasar di menu selama lima menit hanya untuk logout. Kami rancang UX supaya itu tidak pernah terjadi di produk Anda.',
				description:
					'Kami merancang user experience yang intuitif — mulai dari riset dan wireframing, hingga prototyping dan usability testing — agar setiap produk terasa mudah digunakan.'
			}
		},
		icon: '',
		items: ['UX / UI Kit Design', 'Mobile App Design', 'UX Research', 'Wireframing & Prototyping']
	},
	{
		id: '5',
		slug: 'creative-design',
		title: 'Creative Design',
		intro:
			"An idea can come to you in seconds. Turning it into every line, curve, tone, and color — with real meaning behind it — takes a lot more than that. We're used to it by now, even if it means staying up all night to get there.",
		description:
			"Complex Design Studio turns ideas and stories into visual work — from brand identity and illustration to infographics — the kind that actually sticks in people's memory.",
		localizations: {
			id: {
				intro:
					'Ide dan konsep mungkin mudah terbersit di kepala, tapi tidak semudah itu menerjemahkannya ke setiap garis, lekukan, tone, dan warna hingga menemukan filosofinya. Untungnya, kami sudah terbiasa dengan itu — walau harus bekerja semalam suntuk.',
				description:
					'Complex Design Studio mengubah ide dan cerita menjadi karya visual — mulai dari identitas brand, ilustrasi, hingga infografis — yang benar-benar menempel di ingatan orang.'
			}
		},
		icon: '',
		items: [
			'Design Brand Identity',
			'Design Illustrator',
			'Rebranding Design Company',
			'Design Product'
		]
	},
{
  id: '6',
  slug: 'branding-product',
  title: 'Branding Product',
  intro:
    "There's always some great product stuck in a plain cardboard box with nothing to say. Yours won't be one of them.",
  description:
    'Complex Design Studio builds product brands that feel whole — strategy, identity, packaging, stationery, apparel, and every physical touchpoint that actually sticks with people.',
	localizations: {
		id: {
			intro:
				'Di suatu tempat, ada produk premium yang terjebak dalam kardus polos tanpa cerita apa pun. Kami pastikan produk Anda tidak berakhir seperti itu.',
			description:
				'Complex Design Studio membangun brand produk yang menyatu — mulai dari strategi dan identitas, hingga packaging, stationery, apparel, dan setiap physical touchpoint yang diingat orang.'
		}
	},
		icon: '',
		items: ['Packaging', 'Souvenir', 'Stationery', 'Apparel', 'Lifestyle Products']
	}
];

export function localizeService(service: Service, locale: 'en' | 'id'): Service {
	const localization = service.localizations?.[locale];

	if (!localization) return service;

	return {
		...service,
		...localization,
		items: localization.items ?? service.items
	};
}
