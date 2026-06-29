import { type ReactNode } from 'react';

const inlineTagMap: Record<string, string> = {
  b: 'strong',
  strong: 'strong',
  i: 'em',
  em: 'em',
  strike: 's',
  s: 's',
  u: 'u',
  code: 'code',
};

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function escapeAttribute(value: string) {
  return escapeHtml(value).replace(/`/g, '&#096;');
}

function isSafeUrl(value: string) {
  return /^(https?:\/\/|mailto:|tel:)/i.test(value);
}

function textMarkdownToHtml(value: string) {
  const normalized = value.replace(/\*{3,}([^*]+)\*{3,}/g, '**$1**');
  let html = escapeHtml(normalized);

  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    (_match, label: string, href: string) => {
      const safeHref = href.trim();
      if (!isSafeUrl(safeHref)) return label;

      return `<a href="${escapeAttribute(safeHref)}">${label}</a>`;
    },
  );
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/~~([^~]+)~~/g, '<s>$1</s>');
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');

  return html;
}

function sanitizeNode(node: ChildNode): string {
  if (node.nodeType === Node.TEXT_NODE) {
    return textMarkdownToHtml(node.textContent || '');
  }

  if (!(node instanceof HTMLElement)) {
    return '';
  }

  const tag = node.tagName.toLowerCase();
  const children = Array.from(node.childNodes).map(sanitizeNode).join('');

  if (tag === 'br') {
    return '<br>';
  }

  if (tag === 'a') {
    const href = node.getAttribute('href')?.trim() || '';

    if (!href || !isSafeUrl(href)) return children;

    return `<a href="${escapeAttribute(href)}">${children}</a>`;
  }

  if (tag === 'div' || tag === 'p') {
    return children ? `${children}<br>` : '';
  }

  const normalizedTag = inlineTagMap[tag];

  if (normalizedTag) {
    return `<${normalizedTag}>${children}</${normalizedTag}>`;
  }

  return children;
}

export function sanitizeInlineHtml(value: string) {
  if (!value.trim()) return '';

  if (typeof document === 'undefined') {
    return textMarkdownToHtml(value);
  }

  const template = document.createElement('template');
  template.innerHTML = value;

  return Array.from(template.content.childNodes).map(sanitizeNode).join('');
}

export function normalizeEditableHtml(value: string) {
  return sanitizeInlineHtml(value)
    .replace(/&nbsp;/g, ' ')
    .replace(/(?:<br>)+$/g, '')
    .trim();
}

function nodeToReact(node: ChildNode, key: string): ReactNode {
  if (node.nodeType === Node.TEXT_NODE) {
    return node.textContent;
  }

  if (!(node instanceof HTMLElement)) {
    return null;
  }

  const children = Array.from(node.childNodes).map((child, index) => nodeToReact(child, `${key}-${index}`));
  const tag = node.tagName.toLowerCase();

  if (tag === 'strong') return <strong key={key}>{children}</strong>;
  if (tag === 'em') return <em key={key}>{children}</em>;
  if (tag === 's') return <s key={key}>{children}</s>;
  if (tag === 'u') return <u key={key}>{children}</u>;
  if (tag === 'br') return <br key={key} />;
  if (tag === 'code') {
    return (
      <code key={key} className="rounded bg-slate-100 px-1.5 py-0.5 text-base text-slate-900">
        {children}
      </code>
    );
  }
  if (tag === 'a') {
    return (
      <a
        key={key}
        href={node.getAttribute('href') || '#'}
        target="_blank"
        rel="noreferrer"
        className="font-semibold text-emerald-700 underline decoration-emerald-300 underline-offset-4"
      >
        {children}
      </a>
    );
  }

  return children;
}

export function renderInlineRichText(value: string) {
  const html = sanitizeInlineHtml(value);

  if (!html || typeof document === 'undefined') return value;

  const template = document.createElement('template');
  template.innerHTML = html;

  return Array.from(template.content.childNodes).map((node, index) => nodeToReact(node, String(index)));
}
