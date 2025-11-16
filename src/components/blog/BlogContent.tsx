'use client';

interface BlogContentProps {
  content: string;
}

export default function BlogContent({ content }: BlogContentProps) {
  return (
    <div 
      className="prose prose-invert prose-lg max-w-none
        prose-headings:text-white prose-headings:font-bold
        prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-8
        prose-h2:text-3xl prose-h2:mb-4 prose-h2:mt-6 
        prose-h3:text-2xl prose-h3:mb-3 prose-h3:mt-5
        prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-4
        prose-a:text-red-500 prose-a:no-underline hover:prose-a:text-red-400 hover:prose-a:underline
        prose-strong:text-white prose-strong:font-semibold
        prose-ul:text-gray-300 prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-4
        prose-ol:text-gray-300 prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-4
        prose-li:mb-2
        prose-blockquote:border-l-4 prose-blockquote:border-red-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-400
        prose-code:text-red-400 prose-code:bg-gray-900 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
        prose-pre:bg-gray-900 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto
        prose-img:rounded-lg prose-img:shadow-lg prose-img:my-8"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
