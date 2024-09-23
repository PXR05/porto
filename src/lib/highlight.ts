import { all, createLowlight } from 'lowlight';

const lowlight = createLowlight(all);

export const highlight = (s: string) => {
	const cmds = ['cat', 'grep', 'sort', 'view'];
	const tree = lowlight.highlight('bash', s);
	const generateHtml = (node: (typeof tree.children)[0]): string | undefined => {
		if (node.type === 'text') {
			if (node.value.endsWith('</a>')) {
				const target = node.value.trim().slice(3, -4);
				return node.value.replace(/<a>/g, `\u00a0<a href="/${target}" class="text-white">`);
			}
			if (cmds.includes(node.value.split(' ')[0])) {
				return `<span class="hljs-built_in">${node.value.split(' ')[0]}</span>${node.value.split(' ').length > 1 ? '\u00a0' : ''}${node.value.split(' ').slice(1).join('\u00a0')}`;
			}
			if (node.value.endsWith('.txt')) {
				const last = node.value.split(' ').pop();
				return `${node.value.split(' ').slice(0, -1).join('\u00a0')}\u00a0<span class="underline">${last}</span>`;
			}
			return `<span>${node.value.replaceAll(' ', '\u00a0')}</span>`;
		}
		if (
			node.type === 'element' &&
			node.children[0].type === 'text' &&
			!cmds.includes(node.children[0].value.split(' ')[0])
		) {
			return `<span class="${node.properties.className}">${node.children[0].value}</span>`;
		}
		if (node.type === 'element') {
			return node.children.map(generateHtml).join('');
		}
	};
	return tree.children.map(generateHtml);
};
