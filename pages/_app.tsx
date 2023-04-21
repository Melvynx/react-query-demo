import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import '~/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <BackButton />
      <Component {...pageProps} />
      <ReactQueryDevtools />
    </div>
  );
}

const BackButton = () => {
  const router = useRouter();

  return (
    <button
      type="button"
      className="bg-blue-600 p-2 w-fit rounded-full"
      onClick={() => router.back()}
    >
      Back
    </button>
  );
};
