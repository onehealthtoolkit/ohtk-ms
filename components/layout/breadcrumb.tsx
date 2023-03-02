import Link from "next/link";

const crumbClass =
  "ml-1 font-semibold text-white md:ml-2 dark:text-gray-400 dark:text-gray-400 dark:hover:text-white";

export type CrumbProps = {
  text: string;
  href?: string;
};

const Breadcrumb = ({ crumbs }: { crumbs: Array<CrumbProps> }) => {
  return (
    <nav
      className="flex mb-3 py-3  text-white rounded-t-lg dark:bg-gray-800 dark:border-gray-700 bg-[color:var(--breadcrumb-bg-color)]"
      aria-label="Breadcrumb"
    >
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {crumbs.map((crumb, idx) => {
          const ariaCurrent: "page" | "false" =
            idx === crumbs.length - 1 ? "page" : "false";
          return (
            <li
              key={idx}
              className={`${idx == 0 ? "inline-flex items-center" : ""}`}
              aria-current={ariaCurrent}
            >
              <div className="flex items-center">
                <svg
                  className="w-6 h-6 text-white"
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
                <Crumb {...crumb} key={idx} />
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

// Each individual "crumb" in the breadcrumbs list
const Crumb = ({ text, href }: CrumbProps) => {
  if (href) {
    return (
      <Link color="inherit" href={href}>
        <a className={`${crumbClass} hover:text-sky-300`}>{text}</a>
      </Link>
    );
  }
  return <span className={crumbClass}>{text}</span>;
};

export default Breadcrumb;
