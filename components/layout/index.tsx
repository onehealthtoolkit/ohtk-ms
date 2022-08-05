import useStore from "lib/store";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import Sidebar from "./sidebar";
import { ErrorBoundary } from "components/widgets/errorBoundary";
import Header from "./header";

type Props = {
  children: React.ReactNode;
};
const Layout = ({ children }: Props) => {
  const store = useStore();
  const router = useRouter();
  const ref = useRef(null);

  // set the html tag style overflow to hidden
  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
  });

  // close side navigation when route changes
  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      store.closeMenu();
    });

    return () => {
      router.events.off("routeChangeStart", () => {
        store.closeMenu();
      });
    };
  }, [router, store]);

  // close side navigation on click outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (!open) return;

      if (ref && ref.current) {
        const refComponent: any = ref.current;
        if (!refComponent.contains(e.target)) {
          store.closeMenu();
        }
      }
    };
    window.addEventListener("click", handleOutsideClick, true);
    return () => window.removeEventListener("click", handleOutsideClick, true);
  }, [ref, store]);

  return (
    <div className="flex h-screen overflow-hidden bg-[#F2F3F4]">
      <aside ref={ref}>
        <Sidebar mobilePosition="left" />
      </aside>
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden md:px-8 m-8">
        <Header />
        <main>
          <ErrorBoundary>
            <div className="main rounded-lg border w-full max-w-9xl  relative md:mt-2 bg-white">
              {children}
              <div className="h-[8rem]"></div>
            </div>
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
};

export default Layout;
