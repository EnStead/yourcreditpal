const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default async function handler(request, response) {
  if (request.method === 'OPTIONS') {
    return response.status(200).setHeader('Access-Control-Allow-Origin', '*').setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS').setHeader('Access-Control-Allow-Headers', 'Content-Type').end();
  }

  if (request.method !== 'GET') {
    Object.entries(CORS_HEADERS).forEach(([k, v]) => response.setHeader(k, v));
    return response.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const routing = String(request.query?.routing || request.url?.split('?routing=')[1] || '').trim();
    if (!/^[0-9]{9}$/.test(routing)) {
      Object.entries(CORS_HEADERS).forEach(([k, v]) => response.setHeader(k, v));
      return response.status(400).json({ success: false, message: 'Missing or invalid routing parameter' });
    }

    const validateUrl = `https://bankrouting.io/api/v1/aba/${routing}/validate`;
    const lookupUrl = `https://bankrouting.io/api/v1/aba/${routing}`;

    const [validateRes, lookupRes] = await Promise.all([
      fetch(validateUrl),
      fetch(lookupUrl),
    ]);

    const validateJson = await validateRes.json().catch(() => null);
    const lookupJson = await lookupRes.json().catch(() => null);
    const validateStatus = validateRes.status;
    const lookupStatus = lookupRes.status;

    Object.entries(CORS_HEADERS).forEach(([k, v]) => response.setHeader(k, v));
    return response.status(200).json({
      success: true,
      validate: validateJson,
      validateStatus,
      lookup: lookupJson,
      lookupStatus,
    });
  } catch (error) {
    console.error('validate-aba error', error);
    Object.entries(CORS_HEADERS).forEach(([k, v]) => response.setHeader(k, v));
    return response.status(500).json({ success: false, message: 'Proxy error' });
  }
}
