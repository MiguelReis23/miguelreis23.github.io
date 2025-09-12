import { visit } from 'unist-util-visit';

const calloutTypes = {
  note: { icon: '📝', color: '#448aff' },
  tip: { icon: '💡', color: '#00c853' },
  info: { icon: 'ℹ️', color: '#00b4d8' },
  warning: { icon: '⚠️', color: '#ff9100' },
  danger: { icon: '⛔', color: '#ff5252' },
  example: { icon: '📋', color: '#7c4dff' },
  quote: { icon: '💬', color: '#78909c' },
  success: { icon: '✅', color: '#4caf50' },
  error: { icon: '❌', color: '#f44336' },
  bug: { icon: '🐛', color: '#e91e63' },
  abstract: { icon: '📄', color: '#00bcd4' },
  summary: { icon: '📝', color: '#00bcd4' },
  tldr: { icon: '📝', color: '#00bcd4' },
  question: { icon: '❓', color: '#64b5f6' },
  help: { icon: '❓', color: '#64b5f6' },
  faq: { icon: '❓', color: '#64b5f6' },
  attention: { icon: '⚠️', color: '#ff9100' },
  caution: { icon: '🔥', color: '#ff5722' },
  failure: { icon: '❌', color: '#f44336' },
  fail: { icon: '❌', color: '#f44336' },
  missing: { icon: '❌', color: '#f44336' },
  check: { icon: '✅', color: '#4caf50' },
  done: { icon: '✅', color: '#4caf50' },
  important: { icon: '🔥', color: '#ff5722' },
  todo: { icon: '✅', color: '#42a5f5' }
};

export function remarkCallouts() {
  return (tree) => {
    visit(tree, 'blockquote', (node, index, parent) => {
      // Check if this blockquote contains a callout
      if (!node.children || node.children.length === 0) return;
      
      // Look for callout syntax in the entire blockquote content
      let calloutMatch = null;
      let calloutParagraphIndex = -1;
      
      // Check each paragraph in the blockquote for callout syntax
      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];
        if (child.type === 'paragraph' && child.children && child.children.length > 0) {
          const firstTextNode = child.children[0];
          if (firstTextNode && firstTextNode.type === 'text') {
            const match = firstTextNode.value.match(/^\[!(\w+)\]\s*(.*)/);
            if (match) {
              calloutMatch = match;
              calloutParagraphIndex = i;
              break;
            }
          }
        }
      }
      
      // If no callout syntax found, leave the blockquote as is
      if (!calloutMatch) return;
      
      const [, type, titleText] = calloutMatch;
      const calloutType = type.toLowerCase();
      const config = calloutTypes[calloutType] || calloutTypes.note;
      
      // Extract content
      let title = titleText.trim() || type.charAt(0).toUpperCase() + type.slice(1);
      let contentChildren = [];
      
      // Get the paragraph that contains the callout syntax
      const calloutParagraph = node.children[calloutParagraphIndex];
      const firstTextNode = calloutParagraph.children[0];
      
      // Remove the entire callout syntax (including title) from the first text node
      const remainingText = firstTextNode.value.replace(/^\[!(\w+)\]\s*.*/, '').trim();
      
      // Only keep the paragraph if there's remaining content after removing the callout syntax
      if (remainingText || calloutParagraph.children.length > 1) {
        firstTextNode.value = remainingText;
        if (firstTextNode.value.trim() || calloutParagraph.children.length > 1) {
          contentChildren.push(calloutParagraph);
        }
      }
      
      // Add all other paragraphs from the blockquote (before and after the callout paragraph)
      for (let i = 0; i < node.children.length; i++) {
        if (i !== calloutParagraphIndex) {
          contentChildren.push(node.children[i]);
        }
      }
      
      // Transform the blockquote into a callout
      node.type = 'element';
      node.tagName = 'div';
      node.properties = {
        className: `callout callout-${calloutType}`,
        'data-callout': calloutType
      };
      
      // Create the title element
      const titleElement = {
        type: 'element',
        tagName: 'div',
        properties: { className: 'callout-title' },
        children: [
          {
            type: 'element',
            tagName: 'span',
            properties: { className: 'callout-title-inner' },
            children: [{ type: 'text', value: title }]
          },
          {
            type: 'element',
            tagName: 'span',
            properties: { className: 'callout-icon' },
            children: [{ type: 'text', value: config.icon }]
          }
        ]
      };
      
      // Create the content element
      const contentElement = {
        type: 'element',
        tagName: 'div',
        properties: { className: 'callout-content' },
        children: contentChildren.filter(child => {
          // Filter out empty paragraphs
          if (child.type === 'paragraph' && child.children.length === 1) {
            const textNode = child.children[0];
            if (textNode.type === 'text' && !textNode.value.trim()) {
              return false;
            }
          }
          return true;
        })
      };
      
      // Set the new structure
      node.children = [titleElement, contentElement];
    });
  };
}
