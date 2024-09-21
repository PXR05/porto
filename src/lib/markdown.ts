import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkGemoji from 'remark-gemoji';
import remarkBreaks from 'remark-breaks';
import remarkSmartypants from 'remark-smartypants';
import supersub from 'remark-supersub';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';

export function parseMarkdown(content: string) {
    const processor = unified()
        .use(remarkParse)
        .use([
            [
                remarkGfm,
                {
                    singleTilde: false
                }
            ],
            remarkGemoji,
            remarkBreaks,
            remarkSmartypants,
            supersub
        ])
        .use(remarkRehype) // AST to HTML
        .use([
            rehypeHighlight,
            rehypeSlug
        ])
        .use(rehypeStringify) // HTML to string
        .processSync(content);
    return processor.toString();
}