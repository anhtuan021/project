import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Instagram, Facebook, Twitter, Linkedin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  const footerSections = [
    {
      title: t('footer.quickLinks'),
      links: [
        { name: t('footer.findPhotographers'), href: '/photographers' },
        { name: t('footer.aiFeatures'), href: '/ai-tools' },
      ],
    },
    {
      title: t('footer.resources'),
      links: [
        { name: t('footer.blog'), href: '#' },
        { name: t('footer.photographyTips'), href: '#' },
        { name: t('footer.successStories'), href: '#' },
        { name: t('footer.helpCenter'), href: '#' },
      ],
    },
    {
      title: t('footer.support'),
      links: [
        { name: t('footer.helpCenter'), href: '#' },
        { name: t('footer.termsOfService'), href: '#' },
        { name: t('footer.privacyPolicy'), href: '#' },
        { name: t('footer.contactUs'), href: '#' },
      ],
    },
    {
      title: t('footer.connect'),
      links: [
        { name: t('footer.email'), href: 'mailto:support@snapmatch.ai' },
        { name: t('footer.phone'), href: 'tel:+151234572567' },
        { name: t('footer.address'), href: '#' },
      ],
    },
  ];

  const socialLinks = [
    { icon: Instagram, href: '#', name: 'Instagram' },
    { icon: Facebook, href: '#', name: 'Facebook' },
    { icon: Twitter, href: '#', name: 'Twitter' },
    { icon: Linkedin, href: '#', name: 'LinkedIn' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                <Camera className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">SnapMatch AI</span>
            </Link>
                        <p className="text-gray-400 text-sm mb-6">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
                    <p className="text-gray-400 text-sm">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
