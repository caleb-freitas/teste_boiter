import { withTRPC } from '@trpc/next';
import { TRPC_ERROR_CODES_BY_NUMBER } from '@trpc/server/rpc';
import { AppType } from 'next/dist/shared/lib/utils';
import superjson from "superjson"
import { AppRouter } from '../backend/router';

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

function getBaseUrl() {
  if (typeof window !== 'undefined') {
    return '';
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  if (process.env.RENDER_INTERNAL_HOSTNAME) {
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;
  }
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    return {
      url: `${getBaseUrl()}/api/trpc`,
      transformer: superjson,
      headers() {
        return {
          cookie: ctx?.req?.headers.cookie
        }
      }
    };
  },
  ssr: true,
})(MyApp);