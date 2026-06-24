// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'SecondBrain',
  tagline: 'Privates Wissens-Wiki: KI-gestützte Entwicklung und mehr',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://tecch-git.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  // Overridable via DOCUSAURUS_BASE_URL, used by the PR-preview workflow to
  // build the site under a /pr-preview/pr-<n>/ subpath.
  baseUrl: process.env.DOCUSAURUS_BASE_URL || '/SecondBrain/',

  // GitHub pages deployment config.
  organizationName: 'Tecch-Git', // GitHub org/user name.
  projectName: 'SecondBrain', // Repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  themes: [
    [
      '@easyops-cn/docusaurus-search-local',
      /** @type {import('@easyops-cn/docusaurus-search-local').PluginOptions} */
      ({
        hashed: true,
        language: ['en', 'de'],
        docsPluginIdForPreferredVersion: 'ki-entwicklung',
      }),
    ],
  ],

  // Jeder Dokubereich des Wikis ist eine eigene plugin-content-docs-Instanz,
  // damit künftige, unabhängige Bereiche (z. B. eine Shortcuts-Library) einfach
  // als weiterer Eintrag ergänzt werden können, ohne sich Sidebars zu teilen.
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      /** @type {import('@docusaurus/plugin-content-docs').Options} */
      ({
        id: 'ki-entwicklung',
        path: 'docs-ki-entwicklung',
        routeBasePath: 'docs/ki-entwicklung',
        sidebarPath: './sidebars-ki-entwicklung.js',
        editUrl: 'https://github.com/Tecch-Git/SecondBrain/tree/main/site/',
      }),
    ],
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'SecondBrain',
        logo: {
          alt: 'SecondBrain Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            docsPluginId: 'ki-entwicklung',
            sidebarId: 'kiEntwicklungSidebar',
            position: 'left',
            label: 'KI-gestützte Entwicklung',
          },
          {
            href: 'https://github.com/Tecch-Git/SecondBrain',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'KI-gestützte Entwicklung',
                to: '/docs/ki-entwicklung/intro',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/Tecch-Git/SecondBrain',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} SecondBrain. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
