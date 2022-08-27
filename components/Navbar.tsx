import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";

const MoonSVG = () => (
  <motion.svg
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    initial={{ y: "120%" }}
    animate={{ y: "0" }}
    exit={{ y: "120%" }}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </motion.svg>
);

const SunSVG = () => (
  <motion.svg
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    initial={{ y: "-120%" }}
    animate={{ y: "0" }}
    exit={{ y: "-120%" }}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
    />
  </motion.svg>
);

const SearchSVG = () => (
  <svg
    className="h-5 w-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const handleFormsubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchValue.length > 0) {
      router.push(`/search?q=${encodeURIComponent(searchValue)}`);
    }
  };

  return (
    <nav className="flex shadow-lg shadow-md w-full py-4 px-4 shadow-true-gray-400 items-center justify-between sm:px-14 dark:shadow-true-gray-600">
      <Link href="/" passHref>
        <a>
          <h1 className="font-bold text-xl">Kosugelion</h1>
        </a>
      </Link>

      <form
        onSubmit={handleFormsubmit}
        className="border border-transparent rounded-lg flex bg-light-500 w-full w-6/12 sm:w-2/3 md:w-1/2 dark:bg-dark-200 hover:bg-light-600 dark:focus:border-dark-50"
      >
        <input
          className="border border-transparent rounded-lg h-full w-full py-2 px-4 focus:border-light-600 dark:focus:border-dark-50"
          type="search"
          name="search"
          id="search"
          placeholder="Search anything..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />

        <button type="submit" className="p-2">
          <SearchSVG />
        </button>
      </form>

      <motion.button
        whileTap={{ scale: 0.9 }}
        className="cursor-pointer flex bg-light-500 rounded-1 p-2 overflow-hidden items-center justify-center dark:bg-dark-200 hover:bg-light-600 dark:hover:bg-dark-100"
        onClick={() => {
          setTheme(theme === "dark" ? "light" : "dark");
        }}
      >
        <AnimatePresence exitBeforeEnter>
          {theme !== "light" ? <MoonSVG key={0} /> : <SunSVG key={1} />}
        </AnimatePresence>
      </motion.button>
    </nav>
  );
};

export default Navbar;

