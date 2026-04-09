import createMiddleware from 'next-intl/middleware';
import nextIntlConfig from './next-intl.config';

export default createMiddleware(nextIntlConfig as any);

export const config = {
	// Skip all internal Next.js paths and API routes
	matcher: ['/((?!_next|_vercel|.*\\..*|api).*)']
};

