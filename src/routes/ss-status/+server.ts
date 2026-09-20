export async function GET() {
	return new Response(JSON.stringify({ active: false }));
}
