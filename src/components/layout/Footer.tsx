import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/BrandonT-ops', icon: '⚙️' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/brandontapiba', icon: '💼' },
    { name: 'Instagram', href: 'https://www.instagram.com/brandon-tapiba', icon: '📷' },
  ];

  return (
    <footer className="bg-onyx text-white border-t-5 border-onyx">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              Brandon<span className="text-ruby">.</span>
            </h3>
            <p className="text-fawn text-sm">
              Digital Engineer & Creative Builder
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Blending technology, community impact, and creativity.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-fawn">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/#about" className="text-sm hover:text-ruby transition-colors">
                  About Me
                </Link>
              </li>
              <li>
                <Link href="/#projects" className="text-sm hover:text-ruby transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/#photography" className="text-sm hover:text-ruby transition-colors">
                  Photography
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-sm hover:text-ruby transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-fawn">Connect</h4>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white text-onyx border-3 border-white shadow-brutal-sm hover:bg-ruby hover:text-white hover:border-ruby transition-all text-sm font-bold"
                  aria-label={link.name}
                >
                  {link.icon} {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t-3 border-gray-700 text-center">
          <p className="text-sm text-gray-400">
            © {currentYear} Brandon Tapiba. All rights reserved. Built with Next.js & Tailwind.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
