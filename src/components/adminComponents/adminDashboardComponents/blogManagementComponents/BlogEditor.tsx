'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import { useEffect } from 'react';
import { EditorProps } from './types';
import { editorExtensions } from './extensions';
import BlogEditorToolbar from './BlogEditorToolbar';
import Placeholder from '@tiptap/extension-placeholder';
import './editor.css';

export default function BlogEditor({ 
  content, 
  onChange, 
  placeholder = 'Start writing your blog post...' 
}: EditorProps) {
  const editor = useEditor({
    extensions: [
      ...editorExtensions,
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      handleDrop: (view: any, event: any, _slice: any, moved: boolean) => {
        // Handle image drop
        if (!moved && event.dataTransfer && event.dataTransfer.files.length > 0) {
          const file = event.dataTransfer.files[0];
          if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
              const dataUrl = e.target?.result as string;
              const { schema } = view.state;
              const node = schema.nodes.image.create({ 
                src: dataUrl,
                style: 'width: 500px; height: auto;'
              });
              const tr = view.state.tr.replaceSelectionWith(node);
              view.dispatch(tr);
            };
            reader.readAsDataURL(file);
            return true;
          }
        }
        return false;
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      handlePaste: (view: any, event: any) => {
        // Handle image paste
        const items = Array.from(event.clipboardData?.items || []) as DataTransferItem[];
        for (const item of items) {
          if (item.type.indexOf('image') === 0) {
            const file = item.getAsFile();
            if (file) {
              const reader = new FileReader();
              reader.onload = (e) => {
                const dataUrl = e.target?.result as string;
                const { schema } = view.state;
                const node = schema.nodes.image.create({ 
                  src: dataUrl,
                  style: 'width: 500px; height: auto;'
                });
                const tr = view.state.tr.replaceSelectionWith(node);
                view.dispatch(tr);
              };
              reader.readAsDataURL(file);
              return true;
            }
          }
        }
        return false;
      },
    },
  });

  // Add image resize functionality with double-click preset sizes
  useEffect(() => {
    if (!editor) return;

    // 5 preset image sizes
    const imageSizes = [
      { name: 'Quarter Width', width: '25%' },
      { name: 'Half Width', width: '50%' },
      { name: 'Three-Quarter', width: '75%' },
      { name: 'Full Width', width: '100%' },
    ];

    // Track current size index for each image using a WeakMap
    const imageSizeIndex = new WeakMap<HTMLImageElement, number>();

    const updateImageNodeAttributes = (imgEl: HTMLImageElement, attrs: Record<string, unknown>) => {
      if (!editor || !editor.view) return false;

      const { view } = editor;
      const pos = view.posAtDOM(imgEl, 0);

      if (typeof pos !== 'number') {
        return false;
      }

      let updated = false;
      const { tr, doc } = view.state;

      doc.nodesBetween(pos, pos + 1, (node, posOffset) => {
        if (node.type.name === 'image') {
          tr.setNodeMarkup(posOffset, undefined, {
            ...node.attrs,
            ...attrs,
          });
          updated = true;
          return false;
        }
        return undefined;
      });

      if (updated) {
        view.dispatch(tr);
        editor.commands.focus();
      }

      return updated;
    };

    const handleDoubleClick = (e: Event) => {
      const mouseEvent = e as unknown as MouseEvent;
      const target = mouseEvent.target as HTMLElement;
      
      if (target.tagName === 'IMG') {
        mouseEvent.preventDefault();
        const img = target as HTMLImageElement;
        
        // Get current size index or start at 0
        let currentIndex = imageSizeIndex.get(img) || 0;
        
        // Move to next size
        currentIndex = (currentIndex + 1) % imageSizes.length;
        imageSizeIndex.set(img, currentIndex);
        
        const newSize = imageSizes[currentIndex];
        
        // Apply the new size
        img.style.width = newSize.width;
        img.style.height = 'auto';

        updateImageNodeAttributes(img, {
          style: `width: ${newSize.width}; height: auto;`,
        });

        // Show a temporary tooltip with the size name
        showSizeTooltip(img, newSize.name);
      }
    };

    const showSizeTooltip = (img: HTMLImageElement, sizeName: string) => {
      // Remove any existing tooltip
      const existingTooltip = document.querySelector('.image-size-tooltip');
      if (existingTooltip) {
        existingTooltip.remove();
      }
      
      // Create tooltip
      const tooltip = document.createElement('div');
      tooltip.className = 'image-size-tooltip';
      tooltip.textContent = sizeName;
      tooltip.style.cssText = `
        position: absolute;
        background: linear-gradient(135deg, #fff200 0%, #e6db00 100%);
        color: white;
        padding: 8px 16px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 600;
        z-index: 1000;
        pointer-events: none;
        box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
        animation: fadeInOut 1.5s ease-in-out;
      `;
      
      // Position tooltip above the image
      const rect = img.getBoundingClientRect();
      tooltip.style.left = `${rect.left + rect.width / 2}px`;
      tooltip.style.top = `${rect.top - 40}px`;
      tooltip.style.transform = 'translateX(-50%)';
      
      document.body.appendChild(tooltip);
      
      // Remove tooltip after animation
      setTimeout(() => {
        tooltip.remove();
      }, 1500);
    };

    // Add CSS animation for tooltip
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeInOut {
        0% { opacity: 0; transform: translateX(-50%) translateY(10px); }
        20% { opacity: 1; transform: translateX(-50%) translateY(0); }
        80% { opacity: 1; transform: translateX(-50%) translateY(0); }
        100% { opacity: 0; transform: translateX(-50%) translateY(-10px); }
      }
    `;
    document.head.appendChild(style);

    const editorElement = document.querySelector('.ProseMirror');
    if (editorElement) {
      editorElement.addEventListener('dblclick', handleDoubleClick);
      
      return () => {
        editorElement.removeEventListener('dblclick', handleDoubleClick);
        style.remove();
      };
    }
  }, [editor]);

  return (
    <div className="border border-[#fff200]/20 rounded-lg overflow-hidden">
      <BlogEditorToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
