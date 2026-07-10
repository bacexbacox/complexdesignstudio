import { json } from '@sveltejs/kit';
import nodemailer from 'nodemailer';
import { services as allServices } from '$lib/data/services';
// @ts-ignore
import { env } from '$env/dynamic/private'; // Assuming you set SMTP_PASS etc in .env

export const prerender = false;

const getText = (value: unknown, maxLength: number) =>
	typeof value === 'string' ? value.trim().slice(0, maxLength) : '';

const getSingleLineText = (value: unknown, maxLength: number) =>
	getText(value, maxLength).replace(/[\r\n\t]+/g, ' ');

const escapeHtml = (value: string) =>
	value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');

export const POST = async ({ request }) => {
	try {
		const payload = (await request.json()) as Record<string, unknown>;
		const firstName = getSingleLineText(payload.firstName, 80);
		const lastName = getSingleLineText(payload.lastName, 80);
		const email = getSingleLineText(payload.email, 254).toLowerCase();
		const phone = getSingleLineText(payload.phone, 30);
		const message = getText(payload.message, 5000);
		const recaptchaToken = getText(payload.recaptchaToken, 4096);
		const rawServices = payload.services;
		const serviceSlugs = Array.isArray(rawServices)
			? rawServices.filter((slug): slug is string => typeof slug === 'string')
			: [];
		const selectedServiceSlugs = [...new Set(serviceSlugs)];
		const selectedServicesTitles = selectedServiceSlugs
			.filter((slug) => allServices.some((service) => service.slug === slug))
			.map((slug) => allServices.find((service) => service.slug === slug)?.title ?? slug);

		const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
		const isValidPhone = /^[+0-9().\s-]{6,30}$/.test(phone) && phone.replace(/\D/g, '').length >= 6;
		const hasInvalidService =
			!Array.isArray(rawServices) ||
			serviceSlugs.length !== rawServices.length ||
			selectedServicesTitles.length !== selectedServiceSlugs.length;

		if (
			!firstName ||
			!lastName ||
			!isValidEmail ||
			!isValidPhone ||
			!message ||
			hasInvalidService ||
			selectedServicesTitles.length === 0
		) {
			return json({ success: false, message: 'Please provide valid contact details and project information.' }, { status: 400 });
		}

		// 1. Verify reCAPTCHA
		const secretKey = env.RECAPTCHA_SECRET_KEY;
		if (!secretKey || !recaptchaToken) {
			return json({ success: false, message: 'reCAPTCHA verification is unavailable.' }, { status: 503 });
		}

		const recaptchaRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: new URLSearchParams({ secret: secretKey, response: recaptchaToken })
		});
		const recaptchaData = (await recaptchaRes.json()) as { success?: boolean; score?: number };
		const recaptchaScore = recaptchaData.score ?? 0;

		if (!recaptchaData.success || recaptchaScore < 0.5) {
			return json({ success: false, message: 'reCAPTCHA verification failed. Are you a bot?' }, { status: 400 });
		}

		const safeFirstName = escapeHtml(firstName);
		const safeLastName = escapeHtml(lastName);
		const safeEmail = escapeHtml(email);
		const safePhone = escapeHtml(phone);
		const safeMessage = escapeHtml(message);

		// 3. Prepare HTML Email Template
		const htmlTemplate = `
		<!DOCTYPE html>
		<html>
		<head>
			<style>
				body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1f2937; margin: 0; padding: 0; background-color: #f9fafb; }
				.wrapper { padding: 40px 20px; }
				.container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
				.header { background-color: #000000; color: #ffffff; padding: 30px 40px; text-align: center; }
				.header h2 { margin: 0; font-size: 24px; font-weight: 500; letter-spacing: -0.025em; }
				.content { padding: 40px; }
				.field { margin-bottom: 24px; }
				.field:last-child { margin-bottom: 0; }
				.label { font-size: 11px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 6px; font-weight: 600; }
				.value { font-size: 16px; color: #111827; }
				.value a { color: #2563eb; text-decoration: none; }
				.value a:hover { text-decoration: underline; }
				.message-box { background-color: #f3f4f6; padding: 20px; border-radius: 8px; font-size: 15px; color: #374151; white-space: pre-wrap; margin-top: 8px; border: 1px solid #e5e7eb; }
				.tags { margin-top: 8px; }
				.tag { display: inline-block; background-color: #000000; color: #ffffff; padding: 6px 14px; border-radius: 9999px; font-size: 13px; margin-right: 6px; margin-bottom: 6px; font-weight: 500; }
				.footer { background-color: #f9fafb; padding: 20px; text-align: center; font-size: 13px; color: #9ca3af; border-top: 1px solid #e5e7eb; }
			</style>
		</head>
		<body>
			<div class="wrapper">
				<div class="container">
					<div class="header">
						<h2>New Project Inquiry</h2>
					</div>
					<div class="content">
						<div class="field">
							<div class="label">Client Name</div>
							<div class="value">${safeFirstName} ${safeLastName}</div>
						</div>
						<div class="field">
							<div class="label">Email Address</div>
							<div class="value"><a href="mailto:${safeEmail}">${safeEmail}</a></div>
						</div>
						<div class="field">
							<div class="label">Phone Number</div>
							<div class="value"><a href="tel:${safePhone}">${safePhone}</a></div>
						</div>
						
						<div class="field">
							<div class="label">Services Interested In</div>
							<div class="tags">
								${selectedServicesTitles.map((title) => `<span class="tag">${escapeHtml(title)}</span>`).join('')}
							</div>
						</div>
			
						<div class="field">
							<div class="label">Project Details</div>
						<div class="message-box">${safeMessage}</div>
						</div>
					</div>
					<div class="footer">
						This message was sent securely from the <strong>Complex Design Studio</strong> website contact form.
					</div>
				</div>
			</div>
		</body>
		</html>
		`;

		// 4. Send Email via Nodemailer (aaPanel Custom SMTP)
		if (!env.SMTP_USER || !env.SMTP_PASS) {
			return json({ success: false, message: 'Contact service is temporarily unavailable.' }, { status: 503 });
		}

		const transporter = nodemailer.createTransport({
			host: env.SMTP_HOST || 'mail.complexdesignstudio.com',
			port: Number(env.SMTP_PORT) || 587,
			secure: false, // false for port 587 (STARTTLS)
			auth: {
				user: env.SMTP_USER,
				pass: env.SMTP_PASS
			},
			tls: {
				rejectUnauthorized: true
			}
		});

		// await transporter.verify();

		await transporter.sendMail({
			from: `"Complex Design Studio" <${env.SMTP_USER}>`, // Sender MUST be the exact same email to avoid spam blocks
			to: env.SMTP_USER, // Receive inquiry on the same email (or change to your preferred receiving address)
			replyTo: email, // Click 'Reply' to respond directly to the client's email
			subject: `New Inquiry from ${firstName} ${lastName}`, // Subject line
			html: htmlTemplate, // HTML body
		});

		return json({ 
			success: true, 
			message: `Awesome! Thanks for reaching out, ${firstName}! We've got your message loud and clear. Our team is already on it, and you can expect a reply within 24 hours. Chat soon!` 
		});
	} catch (error: any) {
		console.error('Contact submission error:', error);
		return json({ success: false, message: 'Unable to send your message right now. Please try again later.' }, { status: 500 });
	}
};
