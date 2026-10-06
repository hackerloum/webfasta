import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-paper bg-[#f4f0e8] font-sans text-ink text-[#1a1814]">
      <div className="px-4 sm:px-6 lg:px-8 pt-28 pb-20 max-w-xl">
        <p className="text-sm text-mute text-[#6b645b]">404</p>
        <h1 className="mt-3 font-display font-['Newsreader',serif] text-4xl font-normal tracking-tight">
          This address is not a page.
        </h1>
        <p className="mt-4 leading-relaxed text-mute text-[#6b645b]">
          Nothing is published at{" "}
          <span className="text-ink text-[#1a1814]">{location.pathname}</span>.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex h-11 items-center bg-moss bg-[#146c43] px-4 text-sm text-primary-foreground text-[#fbf9f5] hover:bg-moss-dark hover:bg-[#0e4d30]"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
