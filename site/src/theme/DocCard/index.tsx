/**
 * Swizzled (ejected) from @docusaurus/theme-classic.
 *
 * Only the icon resolution differs from the original: category cards no
 * longer fall back to the default 🗃 emoji. Categories can opt into a
 * custom image icon via `customProps.icon` in their `_category_.json`
 * (e.g. a brand logo); everything else falls back to a plain line-art
 * folder icon instead of the playful default emoji.
 */
import React, {type ReactNode} from 'react';
import {
  useDocById,
  findFirstSidebarItemLink,
} from '@docusaurus/plugin-content-docs/client';
import {
  extractLeadingEmoji,
  useDocCardDescriptionCategoryItemsPlural,
} from '@docusaurus/theme-common/internal';
import isInternalUrl from '@docusaurus/isInternalUrl';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/DocCard/Layout';

import type {Props} from '@theme/DocCard';
import type {
  PropSidebarItemCategory,
  PropSidebarItemLink,
} from '@docusaurus/plugin-content-docs';

import styles from './styles.module.css';

function PlainFolderIcon(): ReactNode {
  return (
    <svg
      className={styles.folderIcon}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true">
      <path d="M3 7a2 2 0 0 1 2-2h4.379a1 1 0 0 1 .707.293L11.5 6.707a1 1 0 0 0 .707.293H19a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />
    </svg>
  );
}

function CustomIcon({src}: {src: string}): ReactNode {
  const resolvedSrc = useBaseUrl(src);
  return <img className={styles.customIcon} src={resolvedSrc} alt="" />;
}

function getFallbackIcon(
  item: PropSidebarItemLink | PropSidebarItemCategory,
): ReactNode {
  if (item.type === 'category') {
    return <PlainFolderIcon />;
  }
  return isInternalUrl(item.href) ? '📄️' : '🔗';
}

function getIconTitleProps(
  item: PropSidebarItemLink | PropSidebarItemCategory,
): {icon: ReactNode; title: string} {
  const extracted = extractLeadingEmoji(item.label);
  const customIcon = item.customProps?.icon as string | undefined;
  const icon = customIcon
    ? <CustomIcon src={customIcon} />
    : extracted.emoji ?? getFallbackIcon(item);
  return {
    icon,
    title: extracted.rest.trim(),
  };
}

function CardCategory({item}: {item: PropSidebarItemCategory}): ReactNode {
  const href = findFirstSidebarItemLink(item);
  const categoryItemsPlural = useDocCardDescriptionCategoryItemsPlural();

  // Unexpected: categories that don't have a link have been filtered upfront
  if (!href) {
    return null;
  }
  return (
    <Layout
      item={item}
      className={item.className}
      href={href}
      description={item.description ?? categoryItemsPlural(item.items.length)}
      {...getIconTitleProps(item)}
    />
  );
}

function CardLink({item}: {item: PropSidebarItemLink}): ReactNode {
  const doc = useDocById(item.docId ?? undefined);
  return (
    <Layout
      item={item}
      className={item.className}
      href={item.href}
      description={item.description ?? doc?.description}
      {...getIconTitleProps(item)}
    />
  );
}

export default function DocCard({item}: Props): ReactNode {
  switch (item.type) {
    case 'link':
      return <CardLink item={item} />;
    case 'category':
      return <CardCategory item={item} />;
    default:
      throw new Error(`unknown item type ${JSON.stringify(item)}`);
  }
}
