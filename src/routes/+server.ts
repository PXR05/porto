import { contacts, profile, projects, skills } from '@/lib/data';

function formatForTerminal(): string {
	const width = 80;
	const separator = '='.repeat(width);
	const line = '-'.repeat(width);
	
	function wrapText(text: string, maxWidth: number, indent: string = ''): string {
		const words = text.split(' ');
		let lines: string[] = [];
		let currentLine = '';
		
		words.forEach(word => {
			const testLine = currentLine ? `${currentLine} ${word}` : word;
			if ((indent + testLine).length > maxWidth) {
				if (currentLine) {
					lines.push(indent + currentLine);
					currentLine = word;
				} else {
					lines.push(indent + word);
					currentLine = '';
				}
			} else {
				currentLine = testLine;
			}
		});
		
		if (currentLine) {
			lines.push(indent + currentLine);
		}
		
		return lines.join('\n');
	}
	
	let output = '';
	
	output += `${separator}\n`;
	output += `${profile.name.toUpperCase()} ${profile.surname.toUpperCase()}\n`;
	output += `${profile.title}\n`;
	output += `${profile.location}\n`;
	output += `${separator}\n\n`;
	
	output += `${wrapText(profile.intro, width)}\n\n`;
	
	output += `CONTACT INFORMATION\n`;
	output += `${line}\n`;
	Object.entries(contacts).forEach(([key, value]) => {
		const paddedKey = (key + ':').padEnd(15);
		output += `${paddedKey} ${value}\n`;
	});
	output += '\n';
	
	output += `TECHNICAL SKILLS\n`;
	output += `${line}\n`;
	const skillsPerRow = 5;
	for (let i = 0; i < skills.length; i += skillsPerRow) {
		const row = skills.slice(i, i + skillsPerRow);
		output += `${row.join(' • ')}\n`;
	}
	output += '\n';
	
	output += `PROJECTS & EXPERIENCE\n`;
	output += `${line}\n`;
	Object.values(projects).forEach((project, index) => {
		if (index > 0) output += '\n';
		
		output += `▶ ${project.title.toUpperCase()}\n`;
		
		output += `${wrapText(project.content, width, '  ')}\n`;
		
		const techLine = `Technologies: ${project.tags.join(', ')}`;
		output += `${wrapText(techLine, width, '  ')}\n`;
		
		const linkLine = `Link: ${project.link}`;
		output += `${wrapText(linkLine, width, '  ')}\n`;
	});
	
	output += `\n${separator}\n`;
	output += `Generated on: ${new Date().toLocaleString()}\n`;
	output += `${separator}`;
	
	return output;
}

export const GET = async () => {
	const formattedText = formatForTerminal();
	
	return new Response(formattedText, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8'
		}
	});
};
