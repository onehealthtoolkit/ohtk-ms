import useStore from "lib/store";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Header from "./header";
import Sidebar from "./sidebar";

type Props = {
  children: React.ReactNode;
};
const Layout = ({ children }: Props) => {
  const { menu } = useStore();
  const [open, setOpen] = useState(menu.open);
  const router = useRouter();
  const ref = useRef(null);

  // set the html tag style overflow to hidden
  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
  });

  menu.toggle = useCallback(() => {
    setOpen(prevState => {
      menu.open = !prevState;
      return menu.open;
    });
  }, [menu]);

  // close side navigation when route changes
  useEffect(() => {
    if (open) {
      router.events.on("routeChangeStart", () => {
        menu.open = false;
        setOpen(false);
      });
    }

    return () => {
      if (open) {
        router.events.off("routeChangeStart", () => {
          menu.open = false;
          setOpen(false);
        });
      }
    };
  }, [open, router, menu]);

  // close side navigation on click outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (!open) return;
      if (ref && ref.current) {
        const refComponent: any = ref.current;
        if (!refComponent.contains(e.target)) {
          menu.open = false;
          setOpen(false);
        }
      }
    };
    window.addEventListener("click", handleOutsideClick, true);
    return () => window.removeEventListener("click", handleOutsideClick, true);
  }, [open, ref, menu]);

  return (
    <div className="flex h-screen overflow-hidden">
      <aside ref={ref}>
        <Sidebar mobilePosition="right" />
      </aside>
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header />
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto relative">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
