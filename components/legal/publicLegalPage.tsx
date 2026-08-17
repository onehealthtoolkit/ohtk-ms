/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

const PublicLegalPage = ({ title, children }: Props) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>{`${title} | LAHIS`}</title>
        <meta name="robots" content="index,follow" />
      </Head>
      <div className="max-w-3xl mx-auto px-4 py-10">
        <header className="flex items-center justify-between mb-6">
          <Link href="/" className="inline-flex items-center">
            <img
              className="h-12 w-auto object-contain"
              src="/logo_black.png"
              alt="LAHIS"
            />
          </Link>
          <nav className="text-sm font-semibold space-x-4">
            <Link
              href="/privacy-policy/"
              className="text-indigo-600 hover:text-indigo-800"
            >
              Privacy policy
            </Link>
            <Link
              href="/account-deletion/"
              className="text-indigo-600 hover:text-indigo-800"
            >
              Account deletion
            </Link>
          </nav>
        </header>
        <article className="bg-white rounded-xl shadow-xl p-6 sm:p-8 text-gray-700 leading-relaxed">
          {children}
        </article>
      </div>
    </div>
  );
};

export default PublicLegalPage;
