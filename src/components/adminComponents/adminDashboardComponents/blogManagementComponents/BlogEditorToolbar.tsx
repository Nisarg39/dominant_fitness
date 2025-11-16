'use client';

import { ToolbarProps } from './types';
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Link,
  Image,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  Code,
  Maximize2,
} from 'lucide-react';

export default function BlogEditorToolbar({ editor }: ToolbarProps) {
  if (!editor) {
    return null;
  }

  const addImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const dataUrl = e.target?.result as string;
          
          // Add image with default size and make it resizable
          editor.chain().focus().setImage({ 
            src: dataUrl
          }).run();
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  const resizeImage = () => {
    const currentWidth = editor.getAttributes('image').width || '600px';
    const newWidth = window.prompt('Enter image width (px, %, or auto):', currentWidth);
    
    if (newWidth !== null && newWidth.trim() !== '') {
      editor.chain().focus().updateAttributes('image', { width: newWidth }).run();
    }
  };

  const Button = ({ 
    onClick, 
    isActive = false, 
    disabled = false, 
    title,
    children 
  }: { 
    onClick: () => void; 
    isActive?: boolean; 
    disabled?: boolean; 
    title?: string;
    children: React.ReactNode;
  }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${
        isActive ? 'is-active' : ''
      } ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      title={title || (typeof children === 'string' ? children : '')}
    >
      {children}
    </button>
  );

  return (
    <div className="editor-toolbar">
      <Button
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive('bold')}
      >
        <Bold size={16} />
      </Button>
      
      <Button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive('italic')}
      >
        <Italic size={16} />
      </Button>
      
      <Button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        isActive={editor.isActive('underline')}
      >
        <Underline size={16} />
      </Button>

      <div className="separator" />

      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        isActive={editor.isActive('heading', { level: 1 })}
      >
        <Heading1 size={16} />
      </Button>
      
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        isActive={editor.isActive('heading', { level: 2 })}
      >
        <Heading2 size={16} />
      </Button>
      
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        isActive={editor.isActive('heading', { level: 3 })}
      >
        <Heading3 size={16} />
      </Button>

      <div className="separator" />

      <Button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive('bulletList')}
      >
        <List size={16} />
      </Button>
      
      <Button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive('orderedList')}
      >
        <ListOrdered size={16} />
      </Button>

      <div className="separator" />

      <Button
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        isActive={editor.isActive({ textAlign: 'left' })}
      >
        <AlignLeft size={16} />
      </Button>
      
      <Button
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        isActive={editor.isActive({ textAlign: 'center' })}
      >
        <AlignCenter size={16} />
      </Button>
      
      <Button
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        isActive={editor.isActive({ textAlign: 'right' })}
      >
        <AlignRight size={16} />
      </Button>

      <div className="separator" />

      <Button onClick={setLink} isActive={editor.isActive('link')}>
        <Link size={16} />
      </Button>
      
      <Button onClick={addImage}>
        <Image size={16} />
      </Button>
      
      <Button 
        onClick={resizeImage}
        disabled={!editor.isActive('image')}
        title="Resize Image"
      >
        <Maximize2 size={16} />
      </Button>

      <div className="separator" />

      <Button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        isActive={editor.isActive('blockquote')}
      >
        <Quote size={16} />
      </Button>
      
      <Button
        onClick={() => editor.chain().focus().toggleCode().run()}
        isActive={editor.isActive('code')}
      >
        <Code size={16} />
      </Button>
    </div>
  );
}
