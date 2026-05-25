import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#f5f5f5] pt-16 pb-8 px-6 mt-auto border-t border-neutral-200">
      <div className="max-w-[1500px] mx-auto">
        {/* Top Logo Section */}
        <div className="mb-12">
          <Link to="/" className="flex items-center gap-1.5 no-underline w-fit">
            <div className="bg-neutral-900 size-9 rounded-xl flex items-center justify-center font-bold text-white text-xl">
              Q
            </div>
            <span className="text-2xl font-bold tracking-tighter text-neutral-900">
              Quick<span className="text-neutral-900">Fix</span>
            </span>
          </Link>
        </div>

        {/* Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
          {/* Column 1: Company */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">
              Company
            </h3>
            <Link
              to="/about"
              className="text-[15px] text-neutral-600 hover:text-neutral-900 no-underline"
            >
              About us
            </Link>
            <Link
              to="/investor-relations"
              className="text-[15px] text-neutral-600 hover:text-neutral-900 no-underline"
            >
              Investor Relations
            </Link>
            <Link
              to="/terms"
              className="text-[15px] text-neutral-600 hover:text-neutral-900 no-underline"
            >
              Terms & conditions
            </Link>
            <Link
              to="/privacy"
              className="text-[15px] text-neutral-600 hover:text-neutral-900 no-underline"
            >
              Privacy policy
            </Link>
            <Link
              to="/anti-discrimination"
              className="text-[15px] text-neutral-600 hover:text-neutral-900 no-underline"
            >
              Anti-discrimination policy
            </Link>
            <Link
              to="/careers"
              className="text-[15px] text-neutral-600 hover:text-neutral-900 no-underline"
            >
              Careers
            </Link>
          </div>

          {/* Column 2: For customers */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">
              For customers
            </h3>
            <Link
              to="/reviews"
              className="text-[15px] text-neutral-600 hover:text-neutral-900 no-underline"
            >
              QuickFix reviews
            </Link>
            <Link
              to="/categories"
              className="text-[15px] text-neutral-600 hover:text-neutral-900 no-underline"
            >
              Categories near you
            </Link>
            <Link
              to="/contact"
              className="text-[15px] text-neutral-600 hover:text-neutral-900 no-underline"
            >
              Contact us
            </Link>
          </div>

          {/* Column 3: For professionals */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">
              For professionals
            </h3>
            <Link
              to="/register-professional"
              className="text-[15px] text-neutral-600 hover:text-neutral-900 no-underline"
            >
              Register as a professional
            </Link>
          </div>

          {/* Column 4: Social links (Fixed with Custom SVGs) */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">
              Social links
            </h3>
            <div className="flex items-center gap-3">
              {/* Twitter SVG */}
              <a
                href="#"
                className="size-10 rounded-full border border-neutral-300 flex items-center justify-center hover:border-neutral-900 hover:text-neutral-900 text-neutral-600 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
              {/* Facebook SVG */}
              <a
                href="#"
                className="size-10 rounded-full border border-neutral-300 flex items-center justify-center hover:border-neutral-900 hover:text-neutral-900 text-neutral-600 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              {/* Instagram SVG */}
              <a
                href="#"
                className="size-10 rounded-full border border-neutral-300 flex items-center justify-center hover:border-neutral-900 hover:text-neutral-900 text-neutral-600 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-5"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              {/* LinkedIn SVG */}
              <a
                href="#"
                className="size-10 rounded-full border border-neutral-300 flex items-center justify-center hover:border-neutral-900 hover:text-neutral-900 text-neutral-600 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-5"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Section */}
        <div className="pt-6 border-t border-neutral-200/80 text-xs text-neutral-500 flex flex-col gap-1.5">
          <p>* As on December 31, 2024</p>
          <p>
            © Copyright 2026 QuickFix Technologies Limited. All rights reserved.
            | CIN: L74140DL2014PLC274413
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
