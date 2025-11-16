'use client';

import { PreviewProps } from './types';

export default function BlogPreview({ content, title }: PreviewProps) {
  const createMarkup = (html: string) => {
    return { __html: html };
  };

  return (
    <div className="blog-preview">
      {title && (
        <h1 className="mb-6 text-4xl font-bold text-white">
          {title}
        </h1>
      )}
      <div 
        dangerouslySetInnerHTML={createMarkup(content)}
        className="prose prose-invert max-w-none"
      />
    </div>
  );
}
