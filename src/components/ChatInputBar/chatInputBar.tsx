'use client';

import React, { useEffect, useState } from 'react';
import { useEditor, EditorContent, Editor } from '@tiptap/react';
import Image from 'next/image';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { TextAlign } from '@tiptap/extension-text-align'
import EmojiPicker from 'emoji-picker-react';
interface ChatInputBarProps {
  onSendMessage: (message: string) => void;
}

const BASE = 18;
const MAX_HEIGHT = 110;

const ChatInputBar: React.FC<ChatInputBarProps> = ({ onSendMessage }) => {
  const [textStyle, setTextStyle] = useState<'normal' | 'heading1' | 'heading2' | 'heading3' | 'code' | 'quote'>('normal');
  const [showStyleDropdown, setShowStyleDropdown] = useState(false);
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right'>('left');
  const [showAlignDropdown, setShowAlignDropdown] = useState(false);

  const [showInlineLinkInput, setShowInlineLinkInput] = useState(false);
  const [inlineLinkUrl, setInlineLinkUrl] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),

      Link.configure({
        autolink: false,
        openOnClick: true,
        linkOnPaste: false,
        HTMLAttributes: { rel: 'noopener noreferrer', target: '_blank' },
        validate: href => !!normalizeHref(href), // accept and normalize
      }),
      Placeholder.configure({
        placeholder: 'Write your message or upload media',
        emptyEditorClass: 'is-editor-empty',
        showOnlyWhenEditable: true,
        showOnlyCurrent: false, // ← change this
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'custom-editor prose prose-sm focus:outline-none',
      },
      handlePaste: (view, event) => {
        // Handle paste to insert at cursor position
        const { state } = view;
        const { tr } = state;
        const { from, to } = state.selection;
        
        // Get plain text from clipboard
        const text = event.clipboardData?.getData('text/plain') || '';
        
        if (text) {
          // Insert text at cursor position
          tr.insertText(text, from, to);
          view.dispatch(tr);
          return true; // Prevent default paste behavior
        }
        
        return false; // Allow default paste behavior for other content
      },
    },
    immediatelyRender: false,
  });

  // ---- Keep dropdown label synced with current selection ----
  useEffect(() => {
    if (!editor) return;

    const updateFromSelection = () => {
      if (editor.isActive('codeBlock')) return setTextStyle('code');
      if (editor.isActive('blockquote')) return setTextStyle('quote');
      if (editor.isActive('heading', { level: 1 })) return setTextStyle('heading1');
      if (editor.isActive('heading', { level: 2 })) return setTextStyle('heading2');
      if (editor.isActive('heading', { level: 3 })) return setTextStyle('heading3');
      setTextStyle('normal');

      // Update text alignment state
      if (editor.isActive('textAlign', { align: 'left' })) setTextAlign('left');
      else if (editor.isActive('textAlign', { align: 'center' })) setTextAlign('center');
      else if (editor.isActive('textAlign', { align: 'right' })) setTextAlign('right');
      else setTextAlign('left');
    };

    // Run on load and on every selection/doc change
    updateFromSelection();
    editor.on('selectionUpdate', updateFromSelection);
    editor.on('transaction', updateFromSelection);

    return () => {
      editor.off('selectionUpdate', updateFromSelection);
      editor.off('transaction', updateFromSelection);
    };
  }, [editor]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.dropdown-container')) {
        setShowStyleDropdown(false);
        setShowAlignDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!editor) return null;

  // ---- actions for your existing buttons ----
  const applyFormatting = (format: 'bold' | 'italic' | 'underline' | 'strikethrough' | 'list') => {
    switch (format) {
      case 'bold':
        editor.chain().focus().toggleBold().run();
        break;
      case 'italic':
        editor.chain().focus().toggleItalic().run();
        break;
      case 'underline':
        editor.chain().focus().toggleUnderline().run();
        break;
      case 'strikethrough':
        editor.chain().focus().toggleStrike().run();
        break;
      case 'list':
        editor.chain().focus().toggleBulletList().run();
        break;

    }
  };

  // EXACT behavior like your simple TipTap demo:
  // - Normal => paragraph
  // - Heading 1/2/3 => toggleHeading({level})
  // - Code => toggleCodeBlock
  // - Quote => toggleBlockquote
  const handleTextStyleChange = (style: typeof textStyle) => {
    setTextStyle(style);
    setShowStyleDropdown(false);

    switch (style) {
      case 'normal':
        prepBlockChange().setParagraph().run();
        break;
      case 'heading1':
        prepBlockChange().toggleHeading({ level: 1 }).run();
        break;
      case 'heading2':
        prepBlockChange().toggleHeading({ level: 2 }).run();
        break;
      case 'heading3':
        prepBlockChange().toggleHeading({ level: 3 }).run();
        break;
      case 'code':
        editor.chain().focus().clearNodes().toggleCodeBlock().run();
        break;
      case 'quote':
        editor.chain().focus().clearNodes().toggleBlockquote().run();
        break;
    }
  }; const prepBlockChange = () => {
    let c = editor.chain().focus();

    // If inside a list, lift out so we can become a heading
    if (editor.isActive('bulletList') || editor.isActive('orderedList')) {
      c = c.liftListItem('listItem');
    }

    // If inside code block or blockquote, clear them first
    if (editor.isActive('codeBlock') || editor.isActive('blockquote')) {
      c = c.clearNodes();
    }

    // You can also drop marks to avoid bold/italic “sticking” on headings
    c = c.unsetAllMarks();

    return c;
  };
  const handleTextAlignChange = (alignment: 'left' | 'center' | 'right') => {
    setTextAlign(alignment);
    setShowAlignDropdown(false);
    editor.chain().focus().setTextAlign(alignment).run();
  };


  const handleSendMessage = () => {
    const html = editor.getHTML();
    const plain = editor.getText().trim();
    if (!plain) return;
    onSendMessage(html);
    editor.commands.clearContent(true);
    setTextStyle('normal');
  };

  // keyboard shortcuts (B/I/U/L) like before
  const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (!(e.ctrlKey || e.metaKey)) return;
    const key = e.key.toLowerCase();
    if (['b', 'i', 'u', 'l'].includes(key)) e.preventDefault();
    if (key === 'b') editor.chain().focus().toggleBold().run();
    if (key === 'i') editor.chain().focus().toggleItalic().run();
    if (key === 'u') editor.chain().focus().toggleUnderline().run();
    if (key === 'l') editor.chain().focus().toggleBulletList().run();
  };

  // active states for styling buttons
  const isBold = editor.isActive('bold');
  const isItalic = editor.isActive('italic');
  const isUnderline = editor.isActive('underline');
  const isStrikethrough = editor.isActive('strike');
  const isList = editor.isActive('bulletList');
  return (
    <>
      <style jsx global>{`
  .custom-editor {
    padding: 8px !important;
    min-height: 18px !important;
    max-height: ${MAX_HEIGHT}px !important;
    overflow-y: auto !important;
    border: none !important;
    outline: none !important;
    resize: none !important;
    color: #1f2937 !important;
    white-space: pre-wrap !important;
    word-wrap: break-word !important;
    background-color: #ffffff !important;
    border-radius: 0.375rem !important; /* match your rounded-md */
  }

  /* Paragraphs and list items get smaller text */
  .custom-editor p,
  .custom-editor li {
    font-size: 12px;
    line-height: ${BASE}px;
    margin: 0.1em 0 !important;
  }

  .custom-editor ul {
    list-style-type: disc !important;
    padding-left: 1.5em !important;
    margin: 0.2em 0 !important;
  }

  .custom-editor ol {
    list-style-type: decimal !important;
    padding-left: 1.5em !important;
    margin: 0.2em 0 !important;
  }

  /* Headings keep their own scale */
  .custom-editor h1,
  .custom-editor h2,
  .custom-editor h3 {
    margin-top: 0.5em;
    margin-bottom: 0.3em;
  }

  /* Text alignment styles */
  .custom-editor [style*="text-align: left"] {
    text-align: left !important;
  }
  
  .custom-editor [style*="text-align: center"] {
    text-align: center !important;
  }
  
  .custom-editor [style*="text-align: right"] {
    text-align: right !important;
  }
  
  .custom-editor [style*="text-align: justify"] {
    text-align: justify !important;
  }

  /* Ensure text alignment works on all block elements */
  .custom-editor p[style*="text-align: left"],
  .custom-editor h1[style*="text-align: left"],
  .custom-editor h2[style*="text-align: left"],
  .custom-editor h3[style*="text-align: left"] {
    text-align: left !important;
  }

  /* Force text alignment for Tiptap */
  .custom-editor .ProseMirror p[style*="text-align: left"],
  .custom-editor .ProseMirror h1[style*="text-align: left"],
  .custom-editor .ProseMirror h2[style*="text-align: left"],
  .custom-editor .ProseMirror h3[style*="text-align: left"] {
    text-align: left !important;
    padding-left: 0 !important;
    margin-left: 0 !important;
    text-indent: 0 !important;
  }

  /* Remove any default text alignment */
  .custom-editor .ProseMirror {
    text-align: inherit !important;
  }

  /* Override any centering or spacing */
  .custom-editor .ProseMirror p[style*="text-align: left"] {
    text-align: left !important;
    padding-left: 0 !important;
    margin-left: 0 !important;
    text-indent: 0 !important;
    display: block !important;
  }
    .custom-editor [style*="text-align: left"] {
  text-indent: 0 !important;
}
 .custom-editor p[style*="text-align: left"]::before {
   content: "" !important;
 }

   /* Code block styling */
  .custom-editor pre {
    background-color: #f3f4f6 !important;
    padding: 8px !important;
    border-radius: 4px !important;
    font-family: monospace !important;
    font-size: 12px !important;
    border: 1px solid #e5e7eb !important;
    margin: 4px 0 !important;
    white-space: pre-wrap !important;
  }

  /* Blockquote styling */
  .custom-editor blockquote {
    border-left: 4px solid #d1d5db !important;
    padding-left: 16px !important;
    font-style: italic !important;
    color: #374151 !important;
    margin: 4px 0 !important;
  }

  /* Consistent emoji rendering */
  .custom-editor {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI Emoji", "Noto Color Emoji", "Apple Color Emoji", "Segoe UI Symbol", sans-serif !important;
  }

  .custom-editor * {
    font-family: inherit !important;
  }

  /* Placeholder styling */
  .custom-editor .ProseMirror p.is-editor-empty:first-child::before {
    content: attr(data-placeholder);
    float: left;
    color: #9ca3af;
    pointer-events: none;
    height: 0;
    font-style: italic;
    font-size: 12px;
  }
    .custom-editor p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #9ca3af;
  pointer-events: none;
  height: 0;
    font-style: normal;
  font-size: 12px;
}
`}</style>

      <div className="flex items-center ">
        <div className="relative w-full px-10 ">
          {/* Main Chat Container */}
          <div className="bg-[#F8F8FC] rounded-3xl px-6 relative">
            {/* KFC Logo */}
            <div className="absolute top-16 -left-8 z-20">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <Image src="/icons/kfc.png" alt="KFC" width={40} height={40} className="object-contain" />
              </div>
            </div>

            {/* Formatting Bar (unchanged UI) */}
            <div className="flex items-center gap-3 mb-2 bg-[#F8F8FC] px-3 pt-2 ">
              {/* Text Style Dropdown */}
              <div className="relative formatting-dropdown dropdown-container">
                <button
                  onClick={() => setShowStyleDropdown(!showStyleDropdown)}
                  className="flex items-center gap-2 text-gray-700 bg-[#F8F8FC] border border-white px-2 py-2 h-content rounded-lg text-sm  transition-colors w-content"
                >
                  <span className="truncate">
                    {textStyle === 'normal'
                      ? 'Normal text'
                      : textStyle === 'heading1'
                        ? 'Heading 1'
                        : textStyle === 'heading2'
                          ? 'Heading 2'
                          : textStyle === 'heading3'
                            ? 'Heading 3'
                            : textStyle === 'code'
                              ? 'Code'
                              : 'Quote'}
                  </span>
                  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.5 11.218L3.5 6.21801L4.2 5.51801L8.5 9.81801L12.8 5.51801L13.5 6.21801L8.5 11.218Z" fill="#3F434F" />
                  </svg>

                </button>

                {showStyleDropdown && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 w-full max-h-32 overflow-y-auto scroll-hidden">
                    <button onClick={() => handleTextStyleChange('normal')} className="w-full text-left px-3 py-2 hover:bg-gray-100 text-xs">
                      Normal text
                    </button>
                    <button onClick={() => handleTextStyleChange('heading1')} className="w-full text-left px-3 py-2 hover:bg-gray-100 text-xs font-bold">
                      Heading 1
                    </button>
                    <button onClick={() => handleTextStyleChange('heading2')} className="w-full text-left px-3 py-2 hover:bg-gray-100 text-xs font-bold">
                      Heading 2
                    </button>
                    <button onClick={() => handleTextStyleChange('heading3')} className="w-full text-left px-3 py-2 hover:bg-gray-100 text-xs font-bold">
                      Heading 3
                    </button>
                    <button onClick={() => handleTextStyleChange('code')} className="w-full text-left px-3 py-2 hover:bg-gray-100 text-xs font-mono">
                      Code
                    </button>
                    <button onClick={() => handleTextStyleChange('quote')} className="w-full text-left px-3 py-2 hover:bg-gray-100 text-xs italic">
                      Quote
                    </button>
                  </div>
                )}
              </div>


              {/* Text Alignment Dropdown */}
              <div className="relative dropdown-container">
                <button
                  onClick={() => setShowAlignDropdown(!showAlignDropdown)}
                  className={`px-2 py-2 rounded transition-colors inline-flex items-center justify-between border border-white ${editor.isActive('textAlign') ? 'bg-purple-100 text-purple-600' : 'hover:bg-gray-100 text-gray-600'}`}
                  title="Text Alignment"
                >
                  {textAlign === 'left' && (
                    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.5 3.96802H16.25V5.21802H7.5V3.96802ZM7.5 7.71802H13.75V8.96802H7.5V7.71802ZM7.5 11.468H16.25V12.718H7.5V11.468ZM7.5 15.218H13.75V16.468H7.5V15.218ZM3.75 2.71802H5V17.718H3.75V2.71802Z" fill="#3F434F" />
                    </svg>

                  )}
                  {textAlign === 'center' && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                  {textAlign === 'right' && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}

                  <svg
                    className={`w-4 h-4 text-[#3F434F] transition-transform ${showAlignDropdown ? 'rotate-180' : ''
                      }`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>

                {showAlignDropdown && (
                  <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-32">
                    <button onClick={() => handleTextAlignChange('left')} className="w-full text-left px-3 py-2 hover:bg-gray-100 text-xs flex items-center gap-2">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h10M4 18h6" />
                      </svg>
                      Align Left
                    </button>
                    <button onClick={() => handleTextAlignChange('center')} className="w-full text-left px-3 py-2 hover:bg-gray-100 text-xs flex items-center gap-2">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                      Align Center
                    </button>
                    <button onClick={() => handleTextAlignChange('right')} className="w-full text-left px-3 py-2 hover:bg-gray-100 text-xs flex items-center gap-2">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                      Align Right
                    </button>
                  </div>
                )}
              </div>

              {/* Bold */}
              <div className='flex items-center gap-x-2 border border-white px-2 py-2 h-content rounded'>
                <button
                  onClick={() => applyFormatting('bold')}
                  className={`p-1 rounded transition-colors ${isBold ? 'bg-purple-100 text-purple-600' : 'hover:bg-gray-100 text-gray-600'
                    }`}
                  title="Bold (Ctrl+B)"
                >
                  <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.40625 11.843H0.625V0.593018H5.9375C6.56385 0.593055 7.1771 0.772363 7.70482 1.10976C8.23253 1.44715 8.65264 1.92854 8.91554 2.49705C9.17843 3.06556 9.27312 3.69743 9.18841 4.31803C9.1037 4.93863 8.84314 5.52201 8.4375 5.99927C8.96733 6.42299 9.35279 7.00053 9.54082 7.65237C9.72886 8.30421 9.71022 8.99832 9.48748 9.63913C9.26474 10.2799 8.84884 10.836 8.29704 11.2306C7.74524 11.6253 7.08466 11.8393 6.40625 11.843ZM2.5 9.96802H6.39375C6.57842 9.96802 6.76128 9.93164 6.9319 9.86097C7.10251 9.7903 7.25754 9.68672 7.38812 9.55614C7.5187 9.42555 7.62228 9.27053 7.69296 9.09992C7.76363 8.9293 7.8 8.74644 7.8 8.56177C7.8 8.3771 7.76363 8.19423 7.69296 8.02362C7.62228 7.853 7.5187 7.69798 7.38812 7.5674C7.25754 7.43682 7.10251 7.33323 6.9319 7.26256C6.76128 7.19189 6.57842 7.15552 6.39375 7.15552H2.5V9.96802ZM2.5 5.28052H5.9375C6.12217 5.28052 6.30503 5.24414 6.47565 5.17347C6.64626 5.1028 6.80129 4.99922 6.93187 4.86864C7.06245 4.73805 7.16604 4.58303 7.23671 4.41242C7.30738 4.2418 7.34375 4.05894 7.34375 3.87427C7.34375 3.6896 7.30738 3.50673 7.23671 3.33612C7.16604 3.1655 7.06245 3.01048 6.93187 2.8799C6.80129 2.74932 6.64626 2.64573 6.47565 2.57506C6.30503 2.50439 6.12217 2.46802 5.9375 2.46802H2.5V5.28052Z" fill="#3F434F" />
                  </svg>


                </button>

                {/* Italic */}
                <button
                  onClick={() => applyFormatting('italic')}
                  className={`p-1 rounded transition-colors ${isItalic ? 'bg-purple-100 text-purple-600' : 'hover:bg-gray-100 text-gray-600'
                    }`}
                  title="Italic (Ctrl+I)"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.625 1.84302V0.593018H3.5V1.84302H6.7125L3.98125 10.593H0.375V11.843H8.5V10.593H5.2875L8.01875 1.84302H11.625Z" fill="#3F434F" />
                  </svg>



                </button>

                {/* Underline */}
                <button
                  onClick={() => applyFormatting('underline')}
                  className={`p-1 rounded transition-colors ${isUnderline ? 'bg-purple-100 text-purple-600' : 'hover:bg-gray-100 text-gray-600'
                    }`}
                  title="Underline (Ctrl+U)"
                >
                  <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.5 13.468H15.5V14.718H0.5V13.468ZM8 11.593C6.83968 11.593 5.72688 11.1321 4.90641 10.3116C4.08594 9.49114 3.625 8.37834 3.625 7.21802V0.343018H4.875V7.21802C4.875 8.04682 5.20424 8.84167 5.79029 9.42773C6.37634 10.0138 7.1712 10.343 8 10.343C8.8288 10.343 9.62366 10.0138 10.2097 9.42773C10.7958 8.84167 11.125 8.04682 11.125 7.21802V0.343018H12.375V7.21802C12.375 8.37834 11.9141 9.49114 11.0936 10.3116C10.2731 11.1321 9.16032 11.593 8 11.593Z" fill="#3F434F" />
                  </svg>

                </button>
                <button
                  onClick={() => applyFormatting('strikethrough')}
                  className={`p-1 rounded transition-colors ${isStrikethrough ? 'bg-purple-100 text-purple-600' : 'hover:bg-gray-100 text-gray-600'
                    }`}
                  title="Strikethrough"
                >
                  <svg width="16" height="18" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.5 6.59303H9.2225C8.94498 6.51841 8.66619 6.44861 8.38625 6.38366C6.63125 5.96866 5.63875 5.66491 5.63875 4.24428C5.6245 3.99904 5.66081 3.75349 5.74542 3.52287C5.83004 3.29225 5.96115 3.08149 6.13062 2.90366C6.6615 2.4671 7.32644 2.22654 8.01375 2.22241C9.7825 2.17866 10.5981 2.77866 11.265 3.69116L12.2744 2.95366C11.8019 2.27513 11.1578 1.73419 10.4078 1.3861C9.65779 1.03801 8.82884 0.895253 8.00563 0.972408C6.99439 0.978864 6.01887 1.34712 5.25563 2.01053C4.96634 2.30397 4.74024 2.65355 4.59125 3.03773C4.44227 3.42191 4.37356 3.83253 4.38937 4.24428C4.36197 4.69484 4.4466 5.14516 4.63572 5.55502C4.82483 5.96488 5.11254 6.32151 5.47312 6.59303H0.5V7.84303H9.0325C10.2619 8.19928 10.9969 8.66303 11.0156 9.94178C11.0359 10.2149 10.9985 10.4893 10.9056 10.747C10.8128 11.0047 10.6667 11.24 10.4769 11.4374C9.81551 11.9587 8.99384 12.2346 8.15188 12.218C7.52345 12.1998 6.90738 12.039 6.35029 11.7476C5.7932 11.4562 5.30966 11.0419 4.93625 10.5362L3.97812 11.3387C4.46358 11.9856 5.08994 12.5136 5.80972 12.8825C6.52951 13.2514 7.32384 13.4517 8.1325 13.468H8.195C9.34924 13.4813 10.4695 13.0776 11.35 12.3312C11.6625 12.0161 11.9054 11.639 12.0632 11.2242C12.2209 10.8094 12.2898 10.3661 12.2656 9.92303C12.289 9.16506 12.0332 8.4249 11.5469 7.84303H15.5V6.59303Z" fill="#3F434F" />
                  </svg>

                </button>
              </div>
              {/* Strikethrough */}


              {/* List */}
              <button
                onClick={() => applyFormatting('list')}
                className={`px-2 py-3 rounded h-content border border-white transition-colors ${isList ? 'bg-purple-100 text-purple-600' : 'hover:bg-gray-100 text-gray-600'
                  }`}
                title="Bullet List (Ctrl+L)"
              >
                <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.375 4.71802C3.41053 4.71802 4.25 3.87855 4.25 2.84302C4.25 1.80748 3.41053 0.968018 2.375 0.968018C1.33947 0.968018 0.5 1.80748 0.5 2.84302C0.5 3.87855 1.33947 4.71802 2.375 4.71802Z" fill="#3F434F" />
                  <path d="M2.375 13.468C3.41053 13.468 4.25 12.6286 4.25 11.593C4.25 10.5575 3.41053 9.71802 2.375 9.71802C1.33947 9.71802 0.5 10.5575 0.5 11.593C0.5 12.6286 1.33947 13.468 2.375 13.468Z" fill="#3F434F" />
                  <path d="M8 10.968H16.75V12.218H8V10.968ZM8 2.21802H16.75V3.46802H8V2.21802Z" fill="#3F434F" />
                </svg>

              </button>

              {/* Link */}
              {!showInlineLinkInput ? (
                <button
                  onClick={() => setShowInlineLinkInput(true)}
                  className="px-2 py-3 border border-white rounded h-content transition-colors hover:bg-gray-100 text-gray-600"
                  title="Insert Link"
                >
                  <svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.2803 1.44301C17.9319 1.09341 17.518 0.816026 17.0621 0.626756C16.6063 0.437486 16.1176 0.340057 15.6241 0.340057C15.1305 0.340057 14.6418 0.437486 14.186 0.626756C13.7302 0.816026 13.3162 1.09341 12.9678 1.44301L13.8553 2.33051C14.088 2.09783 14.3642 1.91325 14.6683 1.78732C14.9723 1.66139 15.2981 1.59658 15.6272 1.59658C15.9563 1.59658 16.2821 1.66139 16.5861 1.78732C16.8901 1.91325 17.1664 2.09783 17.3991 2.33051C17.6318 2.5632 17.8163 2.83944 17.9423 3.14346C18.0682 3.44748 18.133 3.77332 18.133 4.10239C18.133 4.43146 18.0682 4.7573 17.9423 5.06132C17.8163 5.36534 17.6318 5.64158 17.3991 5.87426L12.3991 10.8743C11.93 11.3442 11.2934 11.6085 10.6294 11.6091C9.9654 11.6097 9.32837 11.3465 8.85844 10.8774C8.38851 10.4083 8.12418 9.77172 8.12359 9.10772C8.123 8.44373 8.38621 7.80669 8.85532 7.33676L9.73657 6.44926L8.85532 5.56176L7.96782 6.44926C7.61822 6.79765 7.34083 7.21162 7.15156 7.66744C6.96229 8.12326 6.86486 8.61196 6.86486 9.10551C6.86486 9.59907 6.96229 10.0878 7.15156 10.5436C7.34083 10.9994 7.61822 11.4134 7.96782 11.7618C8.675 12.4599 9.63036 12.8488 10.6241 12.843C11.1195 12.845 11.6105 12.7489 12.0685 12.5601C12.5266 12.3713 12.9427 12.0936 13.2928 11.743L18.2928 6.74301C18.9934 6.03823 19.3856 5.08418 19.3833 4.09043C19.3809 3.09667 18.9842 2.14448 18.2803 1.44301Z" fill="#3F434F" />
                    <path d="M2.61782 12.7305C2.38444 12.4982 2.19925 12.2221 2.07288 11.918C1.94652 11.614 1.88146 11.2879 1.88146 10.9586C1.88146 10.6294 1.94652 10.3033 2.07288 9.99924C2.19925 9.69517 2.38444 9.41906 2.61782 9.18676L7.61782 4.18676C7.85011 3.95338 8.12622 3.76819 8.4303 3.64183C8.73437 3.51546 9.06041 3.45041 9.38969 3.45041C9.71897 3.45041 10.045 3.51546 10.3491 3.64183C10.6532 3.76819 10.9293 3.95338 11.1616 4.18676C11.3935 4.42089 11.576 4.69918 11.6984 5.00515C11.8208 5.31112 11.8805 5.63854 11.8741 5.96801C11.876 6.29852 11.8123 6.62612 11.6868 6.93186C11.5613 7.23761 11.3764 7.51543 11.1428 7.74926L9.81782 9.09301L10.7053 9.98051L12.0303 8.65551C12.7356 7.9502 13.1319 6.9936 13.1319 5.99614C13.1319 4.99868 12.7356 4.04207 12.0303 3.33676C11.325 2.63145 10.3684 2.23521 9.37094 2.23521C8.37348 2.23521 7.41688 2.63145 6.71157 3.33676L1.71157 8.33676C1.36103 8.68526 1.08284 9.09963 0.893018 9.55602C0.703192 10.0124 0.605469 10.5018 0.605469 10.9961C0.605469 11.4904 0.703192 11.9799 0.893018 12.4363C1.08284 12.8926 1.36103 13.307 1.71157 13.6555C2.42333 14.3483 3.38088 14.7304 4.37407 14.718C5.376 14.719 6.33764 14.3235 7.04907 13.618L6.16157 12.7305C5.92927 12.9639 5.65316 13.1491 5.34909 13.2754C5.04501 13.4018 4.71897 13.4669 4.38969 13.4669C4.06041 13.4669 3.73437 13.4018 3.4303 13.2754C3.12622 13.1491 2.85011 12.9639 2.61782 12.7305Z" fill="#3F434F" />
                  </svg>

                </button>
              ) : (
                <div className="flex items-center gap-1">
                  <input
                    type="url"
                    value={inlineLinkUrl}
                    onChange={(e) => setInlineLinkUrl(e.target.value)}
                    placeholder="Enter URL..."
                    className="px-2 py-2 text-xs rounded-md border border-[#E9EAEA] bg-white text-gray-700 outline-none focus:ring-1 focus:ring-[#E9EAEA] w-32"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        if (inlineLinkUrl.trim()) insertOrWrapLink(editor, inlineLinkUrl);
                        setShowInlineLinkInput(false);
                        setInlineLinkUrl('');
                      } else if (e.key === 'Escape') {
                        setShowInlineLinkInput(false);
                        setInlineLinkUrl('');
                      }
                    }}
                    autoFocus
                  />
                  <button
                    onClick={() => {
                      if (inlineLinkUrl.trim()) insertOrWrapLink(editor, inlineLinkUrl);
                      setShowInlineLinkInput(false);
                      setInlineLinkUrl('');
                    }}
                    className="px-2 py-2  rounded bg-primary text-white hover:bg-purple-600 text-xs"
                    title="Insert"
                  >
                    <svg width="10" height="10" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.8784 0.954006L5.66577 10.166C5.60383 10.2282 5.53022 10.2775 5.44917 10.3112C5.36811 10.3449 5.28121 10.3622 5.19344 10.3622C5.10567 10.3622 5.01876 10.3449 4.93771 10.3112C4.85665 10.2775 4.78304 10.2282 4.7211 10.166L1.15844 6.60001C1.0965 6.53782 1.02289 6.48848 0.941834 6.45481C0.860779 6.42114 0.773874 6.40381 0.686104 6.40381C0.598335 6.40381 0.51143 6.42114 0.430375 6.45481C0.34932 6.48848 0.275711 6.53782 0.213771 6.60001C0.151586 6.66194 0.102245 6.73555 0.068577 6.81661C0.0349092 6.89767 0.0175781 6.98457 0.0175781 7.07234C0.0175781 7.16011 0.0349092 7.24701 0.068577 7.32807C0.102245 7.40912 0.151586 7.48273 0.213771 7.54467L3.77777 11.108C4.15374 11.4833 4.66324 11.694 5.19444 11.694C5.72564 11.694 6.23514 11.4833 6.6111 11.108L15.8231 1.89801C15.8852 1.83608 15.9344 1.76251 15.9681 1.68152C16.0017 1.60052 16.019 1.5137 16.019 1.42601C16.019 1.33832 16.0017 1.25149 15.9681 1.17049C15.9344 1.0895 15.8852 1.01593 15.8231 0.954006C15.7612 0.891821 15.6876 0.842479 15.6065 0.808812C15.5254 0.775144 15.4385 0.757813 15.3508 0.757812C15.263 0.757812 15.1761 0.775144 15.095 0.808812C15.014 0.842479 14.9404 0.891821 14.8784 0.954006Z" fill="white" />
                    </svg>

                  </button>
                  <button
                    onClick={() => {
                      setShowInlineLinkInput(false);
                      setInlineLinkUrl('');
                    }}
                    className="px-2 py-2 rounded bg-gray-300 text-gray-600 hover:bg-gray-400 text-xs"
                    title="Cancel"
                  >
                    <svg width="10" height="10" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.94252 7.99986L15.8045 1.13786C15.926 1.01213 15.9932 0.843728 15.9916 0.66893C15.9901 0.494133 15.92 0.326924 15.7964 0.203319C15.6728 0.0797134 15.5056 0.00960079 15.3308 0.00808184C15.156 0.0065629 14.9876 0.0737592 14.8619 0.195198L7.99986 7.0572L1.13786 0.195198C1.01212 0.0737592 0.843721 0.0065629 0.668923 0.00808184C0.494126 0.00960079 0.326917 0.0797134 0.203312 0.203319C0.0797065 0.326924 0.00959389 0.494133 0.00807494 0.66893C0.00655599 0.843728 0.0737523 1.01213 0.195191 1.13786L7.05719 7.99986L0.195191 14.8619C0.0702103 14.9869 0 15.1564 0 15.3332C0 15.51 0.0702103 15.6795 0.195191 15.8045C0.320209 15.9295 0.489748 15.9997 0.666524 15.9997C0.8433 15.9997 1.01284 15.9295 1.13786 15.8045L7.99986 8.94253L14.8619 15.8045C14.9869 15.9295 15.1564 15.9997 15.3332 15.9997C15.51 15.9997 15.6795 15.9295 15.8045 15.8045C15.9295 15.6795 15.9997 15.51 15.9997 15.3332C15.9997 15.1564 15.9295 14.9869 15.8045 14.8619L8.94252 7.99986Z" fill="#727A90" />
                    </svg>

                  </button>
                </div>
              )}


            </div>



            {/* Editor (kept inside your styled wrapper) */}
            <div className="bg-white rounded-md px-2" onKeyDown={onKeyDown}>
              <EditorContent editor={editor} />
            </div>

            {/* Bottom Action Row (unchanged) */}
            <div className="flex items-center gap-3 mt-4 pb-4">
              <button
                onClick={handleSendMessage}
                className="bg-primary text-xs text-white px-4 py-3 rounded-xl font-medium transition-colors"
              >
                Send Message
              </button>

              {/* Media Icons (unchanged) */}
              <div className="flex items-center gap-2">
                <button className="px-2 py-2 rounded-lg h-content border border-white transition-colors">
                  <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.4993 19.1763H7.49935C2.97435 19.1763 1.04102 17.243 1.04102 12.718V7.71801C1.04102 3.19301 2.97435 1.25967 7.49935 1.25967H12.4993C17.0243 1.25967 18.9577 3.19301 18.9577 7.71801V12.718C18.9577 17.243 17.0243 19.1763 12.4993 19.1763ZM7.49935 2.50967C3.65768 2.50967 2.29102 3.87634 2.29102 7.71801V12.718C2.29102 16.5597 3.65768 17.9263 7.49935 17.9263H12.4993C16.341 17.9263 17.7077 16.5597 17.7077 12.718V7.71801C17.7077 3.87634 16.341 2.50967 12.4993 2.50967H7.49935Z" fill="#3F434F" />
                    <path d="M5.83409 8.24301C5.60909 8.24301 5.38409 8.11801 5.27575 7.90135C5.11742 7.59301 5.24242 7.21801 5.55075 7.05968C8.33409 5.66801 11.6591 5.66801 14.4424 7.05968C14.7508 7.21801 14.8758 7.59301 14.7258 7.90135C14.5674 8.20968 14.2008 8.33468 13.8841 8.18468C11.4508 6.96801 8.54242 6.96801 6.10909 8.18468C6.02575 8.22635 5.92575 8.24301 5.83409 8.24301Z" fill="#3F434F" />
                    <path d="M10 14.418C9.65833 14.418 9.375 14.1347 9.375 13.793V6.82635C9.375 6.48469 9.65833 6.20135 10 6.20135C10.3417 6.20135 10.625 6.48469 10.625 6.82635V13.8014C10.625 14.143 10.3417 14.418 10 14.418Z" fill="#3F434F" />
                  </svg>

                </button>
                <button className="px-2 py-2 rounded-lg h-content border border-white transition-colors">
                  <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M7.61136 13.8023C6.79488 14.5728 5.50821 14.5585 4.70915 13.7595C3.89556 12.9459 3.89556 11.6268 4.70915 10.8132L11.191 4.33138C11.3537 4.16866 11.6175 4.16866 11.7802 4.33138C11.9429 4.4941 11.9429 4.75792 11.7802 4.92063L5.29841 11.4024C4.81025 11.8906 4.81025 12.6821 5.29841 13.1702C5.78656 13.6584 6.57802 13.6584 7.06617 13.1702L13.548 6.6884C14.687 5.54937 14.687 3.70264 13.548 2.56361C12.409 1.42458 10.5622 1.42458 9.4232 2.56361L2.94139 9.04542C1.15148 10.8353 1.15148 13.7373 2.94139 15.5272C4.73129 17.3171 7.63329 17.3171 9.4232 15.5272L14.7265 10.2239C14.8892 10.0612 15.153 10.0612 15.3158 10.2239C15.4785 10.3867 15.4785 10.6505 15.3158 10.8132L10.0125 16.1165C7.89711 18.2318 4.46747 18.2318 2.35213 16.1165C0.251291 14.0157 0.23689 10.6185 2.30893 8.49986L8.83394 1.97436C10.2984 0.509891 12.6728 0.509891 14.1372 1.97436C15.6017 3.43882 15.6017 5.81319 14.1372 7.27766L7.61198 13.8029L7.61136 13.8023Z" fill="#3F434F" />
                  </svg>

                </button>
                <div className="relative">
                  <button
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="px-2 py-2 rounded-lg h-content border border-white  transition-colors"
                  >
                    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.4993 19.1763H7.49935C2.97435 19.1763 1.04102 17.243 1.04102 12.718V7.71801C1.04102 3.19301 2.97435 1.25967 7.49935 1.25967H12.4993C17.0243 1.25967 18.9577 3.19301 18.9577 7.71801V12.718C18.9577 17.243 17.0243 19.1763 12.4993 19.1763ZM7.49935 2.50967C3.65768 2.50967 2.29102 3.87634 2.29102 7.71801V12.718C2.29102 16.5597 3.65768 17.9263 7.49935 17.9263H12.4993C16.341 17.9263 17.7077 16.5597 17.7077 12.718V7.71801C17.7077 3.87634 16.341 2.50967 12.4993 2.50967H7.49935Z" fill="#3F434F" />
                      <path d="M12.916 8.96802C11.8827 8.96802 11.041 8.12635 11.041 7.09302C11.041 6.05968 11.8827 5.21802 12.916 5.21802C13.9493 5.21802 14.791 6.05968 14.791 7.09302C14.791 8.12635 13.9493 8.96802 12.916 8.96802ZM12.916 6.46802C12.5743 6.46802 12.291 6.75135 12.291 7.09302C12.291 7.43468 12.5743 7.71802 12.916 7.71802C13.2577 7.71802 13.541 7.43468 13.541 7.09302C13.541 6.75135 13.2577 6.46802 12.916 6.46802Z" fill="#3F434F" />
                      <path d="M7.08398 8.96802C6.05065 8.96802 5.20898 8.12635 5.20898 7.09302C5.20898 6.05968 6.05065 5.21802 7.08398 5.21802C8.11732 5.21802 8.95898 6.05968 8.95898 7.09302C8.95898 8.12635 8.11732 8.96802 7.08398 8.96802ZM7.08398 6.46802C6.74232 6.46802 6.45898 6.75135 6.45898 7.09302C6.45898 7.43468 6.74232 7.71802 7.08398 7.71802C7.42565 7.71802 7.70898 7.43468 7.70898 7.09302C7.70898 6.75135 7.42565 6.46802 7.08398 6.46802Z" fill="#3F434F" />
                      <path d="M10 16.4264C7.58333 16.4264 5.625 14.4597 5.625 12.0514C5.625 11.293 6.24167 10.6764 7 10.6764H13C13.7583 10.6764 14.375 11.293 14.375 12.0514C14.375 14.4597 12.4167 16.4264 10 16.4264ZM7 11.9264C6.93333 11.9264 6.875 11.9847 6.875 12.0514C6.875 13.7764 8.275 15.1764 10 15.1764C11.725 15.1764 13.125 13.7764 13.125 12.0514C13.125 11.9847 13.0667 11.9264 13 11.9264H7Z" fill="#3F434F" />
                    </svg>

                  </button>

                  {showEmojiPicker && (
                    <div className="absolute bottom-full right-0 mb-4 z-50">
                      <EmojiPicker
                        onEmojiClick={(emojiObject) => {
                          insertEmoji(editor, emojiObject.emoji);
                          setShowEmojiPicker(false);
                        }}
                        width={320}
                        height={400}
                        searchPlaceholder="Search emoji..."
                        skinTonesDisabled
                        lazyLoadEmojis
                        previewConfig={{
                          showPreview: false
                        }}
                      />
                    </div>
                  )}
                </div>
                <button className="px-2 py-2 rounded-lg h-content border border-white transition-colors">
                  <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.3001 19.1764H4.65839C3.39172 19.1764 2.23338 18.5347 1.56672 17.4514C0.900051 16.368 0.841718 15.0514 1.40838 13.9097L2.84172 11.0347C3.30838 10.1014 4.05839 9.51803 4.90005 9.42636C5.74172 9.33469 6.60005 9.75136 7.25005 10.5597L7.43339 10.793C7.80005 11.243 8.22505 11.4847 8.64172 11.443C9.05838 11.4097 9.44172 11.1097 9.72505 10.6014L11.3001 7.75969C11.9501 6.58469 12.8167 5.97636 13.7584 6.01803C14.6917 6.06803 15.4917 6.76803 16.0251 8.00136L18.6334 14.093C19.1167 15.218 19.0001 16.5014 18.3251 17.5264C17.6584 18.568 16.5251 19.1764 15.3001 19.1764ZM5.13338 10.6764C5.10005 10.6764 5.06672 10.6764 5.03338 10.6847C4.61672 10.7264 4.23338 11.0597 3.95838 11.6014L2.52505 14.4764C2.15005 15.218 2.19172 16.093 2.62505 16.8014C3.05838 17.5097 3.82505 17.9347 4.65839 17.9347H15.2917C16.1084 17.9347 16.8334 17.543 17.2834 16.8597C17.7334 16.1764 17.8084 15.3597 17.4834 14.6097L14.8751 8.51803C14.5584 7.76803 14.1167 7.30969 13.6917 7.29303C13.3001 7.26803 12.7917 7.68469 12.3917 8.39303L10.8167 11.2347C10.3334 12.1014 9.57505 12.643 8.75005 12.718C7.92505 12.7847 7.08338 12.3847 6.45838 11.6014L6.27505 11.368C5.92505 10.9097 5.52505 10.6764 5.13338 10.6764Z" fill="#3F434F" />
                    <path d="M5.80859 7.50967C4.09193 7.50967 2.68359 6.10967 2.68359 4.38467C2.68359 2.65967 4.08359 1.25967 5.80859 1.25967C7.53359 1.25967 8.93359 2.65967 8.93359 4.38467C8.93359 6.10967 7.53359 7.50967 5.80859 7.50967ZM5.80859 2.50967C4.77526 2.50967 3.93359 3.35134 3.93359 4.38467C3.93359 5.41801 4.77526 6.25967 5.80859 6.25967C6.84193 6.25967 7.68359 5.41801 7.68359 4.38467C7.68359 3.35134 6.84193 2.50967 5.80859 2.50967Z" fill="#3F434F" />
                  </svg>

                </button>
                <button className="px-2 py-2 rounded-lg h-content border border-white  transition-colors">
                  <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.99935 13.7597C7.81602 13.7597 6.04102 11.9847 6.04102 9.80134V5.21801C6.04102 3.03467 7.81602 1.25967 9.99935 1.25967C12.1827 1.25967 13.9577 3.03467 13.9577 5.21801V9.80134C13.9577 11.9847 12.1827 13.7597 9.99935 13.7597ZM9.99935 2.50967C8.50768 2.50967 7.29102 3.72634 7.29102 5.21801V9.80134C7.29102 11.293 8.50768 12.5097 9.99935 12.5097C11.491 12.5097 12.7077 11.293 12.7077 9.80134V5.21801C12.7077 3.72634 11.491 2.50967 9.99935 2.50967Z" fill="#3F434F" />
                    <path d="M10 16.6763C6.14167 16.6763 3 13.5347 3 9.67634V8.25967C3 7.91801 3.28333 7.63467 3.625 7.63467C3.96667 7.63467 4.25 7.91801 4.25 8.25967V9.67634C4.25 12.843 6.83333 15.4263 10 15.4263C13.1667 15.4263 15.75 12.843 15.75 9.67634V8.25967C15.75 7.91801 16.0333 7.63467 16.375 7.63467C16.7167 7.63467 17 7.91801 17 8.25967V9.67634C17 13.5347 13.8583 16.6763 10 16.6763Z" fill="#3F434F" />
                    <path d="M11.1579 6.20136C11.0912 6.20136 11.0162 6.19302 10.9412 6.16802C10.3329 5.94302 9.66624 5.94302 9.05791 6.16802C8.73291 6.28469 8.37457 6.11802 8.25791 5.79302C8.14124 5.46802 8.30791 5.10969 8.63291 4.99302C9.51624 4.67636 10.4912 4.67636 11.3746 4.99302C11.6996 5.10969 11.8662 5.46802 11.7496 5.79302C11.6496 6.04302 11.4079 6.20136 11.1579 6.20136Z" fill="#3F434F" />
                    <path d="M10.6671 7.96802C10.6087 7.96802 10.5587 7.95969 10.5004 7.94302C10.1671 7.85136 9.82539 7.85136 9.49206 7.94302C9.15872 8.03469 8.81706 7.83469 8.72539 7.50136C8.63372 7.17636 8.83372 6.83469 9.16706 6.74302C9.70872 6.59302 10.2921 6.59302 10.8337 6.74302C11.1671 6.83469 11.3671 7.17636 11.2754 7.50969C11.2004 7.78469 10.9421 7.96802 10.6671 7.96802Z" fill="#3F434F" />
                    <path d="M10 19.1764C9.65833 19.1764 9.375 18.893 9.375 18.5514V16.0514C9.375 15.7097 9.65833 15.4264 10 15.4264C10.3417 15.4264 10.625 15.7097 10.625 16.0514V18.5514C10.625 18.893 10.3417 19.1764 10 19.1764Z" fill="#3F434F" />
                  </svg>

                </button>
                <button className="px-2 py-2 rounded-lg h-content border border-white transition-colors">
                  <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.7327 17.6014H5.67435C2.71602 17.6014 1.66602 15.5264 1.66602 13.593V6.84302C1.66602 3.95969 2.79102 2.83469 5.67435 2.83469H10.7327C13.616 2.83469 14.741 3.95969 14.741 6.84302V13.593C14.741 16.4764 13.616 17.6014 10.7327 17.6014ZM5.67435 4.10135C3.49935 4.10135 2.93268 4.66802 2.93268 6.84302V13.593C2.93268 14.618 3.29102 16.3347 5.67435 16.3347H10.7327C12.9077 16.3347 13.4743 15.768 13.4743 13.593V6.84302C13.4743 4.66802 12.9077 4.10135 10.7327 4.10135H5.67435Z" fill="#3F434F" />
                    <path d="M17.3158 15.3097C16.9574 15.3097 16.4991 15.193 15.9741 14.8264L13.7491 13.268C13.5824 13.1514 13.4824 12.9597 13.4824 12.7514V7.68469C13.4824 7.47636 13.5824 7.28469 13.7491 7.16802L15.9741 5.60969C16.9658 4.91802 17.6908 5.11802 18.0324 5.29302C18.3741 5.47636 18.9574 5.95136 18.9574 7.15969V13.268C18.9574 14.4764 18.3741 14.9597 18.0324 15.1347C17.8741 15.2264 17.6241 15.3097 17.3158 15.3097ZM14.7408 12.418L16.6991 13.7847C17.0741 14.043 17.3408 14.068 17.4491 14.0097C17.5658 13.9514 17.6908 13.718 17.6908 13.268V7.16802C17.6908 6.70969 17.5574 6.48469 17.4491 6.42636C17.3408 6.36802 17.0741 6.39302 16.6991 6.65136L14.7408 8.01802V12.418Z" fill="#3F434F" />
                    <path d="M9.58398 10.0097C8.55065 10.0097 7.70898 9.16801 7.70898 8.13467C7.70898 7.10134 8.55065 6.25967 9.58398 6.25967C10.6173 6.25967 11.459 7.10134 11.459 8.13467C11.459 9.16801 10.6173 10.0097 9.58398 10.0097ZM9.58398 7.50967C9.24232 7.50967 8.95898 7.79301 8.95898 8.13467C8.95898 8.47634 9.24232 8.75967 9.58398 8.75967C9.92565 8.75967 10.209 8.47634 10.209 8.13467C10.209 7.79301 9.92565 7.50967 9.58398 7.50967Z" fill="#3F434F" />
                  </svg>

                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatInputBar;





function normalizeHref(raw: string) {
  const v = raw.trim();
  if (!v) return '';
  return /^https?:\/\//i.test(v) ? v : `https://${v}`;
}

function insertOrWrapLink(editor: Editor, rawHref: string, label?: string) {
  const href = normalizeHref(rawHref);
  const { from, to } = editor.state.selection;

  if (from === to) {
    // No selection → insert text already marked as a link
    editor
      .chain()
      .focus()
      .insertContent({
        type: 'text',
        text: label ?? href,
        marks: [{ type: 'link', attrs: { href } }],
      })
      .run();
  } else {
    // Selection → wrap the selected text
    editor.chain().focus().setLink({ href }).run();
  }
}

function insertEmoji(editor: Editor, emoji: string) {
  editor.chain().focus().insertContent(emoji).run();
}