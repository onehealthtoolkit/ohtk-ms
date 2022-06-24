import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";

const _defaultGetDefaultTextGenerator = (path: any) => path;

const regexExp =
  /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
const isUUID = (str: string) => {
  return regexExp.test(str);
};

const generatePathParts = (pathStr: string) => {
  const pathWithoutQuery = pathStr.split("?")[0];
  return pathWithoutQuery
    .split("/")
    .filter(
      (v, index) =>
        index > 0 && v.length > 0 && Number.isNaN(Number(v)) && !isUUID(v)
    );
};

type CrumbProps = {
  text: string;
  href: string;
  last: boolean;
};

const Breadcrumb = () => {
  const router = useRouter();
  const breadcrumbs = useMemo(
    function generateBreadcrumbs() {
      const asPathNestedRoutes = generatePathParts(router.asPath);
      const crumblist = asPathNestedRoutes.map((subpath, idx) => {
        const href = "/" + asPathNestedRoutes.slice(0, idx + 1).join("/");
        let text: string = _defaultGetDefaultTextGenerator(subpath);
        text = text
          .split("_")
          .map(text => text.charAt(0).toUpperCase() + text.slice(1))
          .join(" ");
        return {
          href,
          text: text,
        };
      });

      return [...crumblist];
    },
    [router.asPath, router.pathname, router.query]
  ).filter((v, index) => index > 0);

  return (
    <nav
      className="flex mb-3 py-3 px-5 text-gray-700 bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Breadcrumb"
    >
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {breadcrumbs.map((crumb, idx) => (
          <li
            key={idx}
            className={`${idx == 0 ? "inline-flex items-center" : ""}`}
            aria-current={`${
              idx === breadcrumbs.length - 1 ? "page" : "false"
            }`}
          >
            <div className="flex items-center">
              <svg
                className="w-6 h-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <Crumb
                {...crumb}
                key={idx}
                last={idx === breadcrumbs.length - 1}
              />
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

// Each individual "crumb" in the breadcrumbs list
const Crumb = ({ text, href, last = false }: CrumbProps) => {
  // The last crumb is rendered as normal text since we are already on the page
  if (last) {
    return (
      <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
        {text}
      </span>
    );
  }

  return (
    <Link
      className="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white"
      color="inherit"
      href={href}
    >
      {text}
    </Link>
  );
};
export default Breadcrumb;
