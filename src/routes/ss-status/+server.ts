export async function GET() {
	return new Response(JSON.stringify({ active: false }), {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*'
		}
	});
}

export async function OPTIONS() {
	return new Response(null, {
		status: 204,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type, Accept'
		}
	});
}
