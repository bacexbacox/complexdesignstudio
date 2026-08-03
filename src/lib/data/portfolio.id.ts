import type { PortfolioProject } from '$lib/types';

type PortfolioTranslation = Pick<PortfolioProject, 'description'>;

export const portfolioId = {
	'website-development/bank-syariah-mandiri': {
		description:
			'Complex Design dan Bank Syariah Mandiri terus menjalin kerja sama setelah kami berhasil dan dipercaya untuk membuat website Bank Syariah Mandiri Priority atau BSM Priority. Kami kemudian menjadi vendor yang menangani maintenance website utama Bank Syariah Mandiri. Kontrak tugas harian Bank Syariah Mandiri dengan Complex Design meliputi update berbagai fitur slider (daily), update halaman (weekly), fix bugs berdasarkan laporan, traffic report, SEO report, backup database, optimasi database, serta pengelolaan dan input konten. Setiap proses dilakukan secara terjadwal dengan laporan kerja yang rapi untuk memastikan website tetap aman, optimal, dan selalu dapat diakses dengan baik.\nBank Syariah Mandiri merupakan bank syariah terbesar di Indonesia pada saat itu. Kepercayaan untuk menangani maintenance website utama Bank Syariah Mandiri menjadi salah satu pengalaman penting bagi Complex Design dalam mengelola website perusahaan dengan jumlah konten dan traffic yang besar. Saat ini, Bank Syariah Mandiri telah bergabung dengan dua bank syariah BUMN lainnya, yaitu BRI Syariah dan BNI Syariah, menjadi Bank Syariah Indonesia atau BSI. Penggabungan tersebut resmi berlaku pada 1 Februari 2021.'
	}
} satisfies Record<string, PortfolioTranslation>;
