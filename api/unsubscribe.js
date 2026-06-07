import { google } from 'googleapis'

const SHEET_RANGE = "'YourCreditPal Unsubscribe Sheets'!A:M"

const json = (response, statusCode, body) => {
  response.status(statusCode).json(body)
}

const normalizePrivateKey = (value = '') =>
  value
    .replace(/^"|"$/g, '')
    .replace(/\\n/g, '\n')

const parseBody = (body) => {
  if (typeof body === 'string') {
    return JSON.parse(body || '{}')
  }

  return body || {}
}

const getGoogleErrorMessage = (error) => {
  const status = error?.response?.status || error?.code
  const message = error?.response?.data?.error || error?.response?.data?.message || error?.message || ''

  if (status === 403) {
    return 'Google Sheets permission denied. Share the sheet with the service account email and confirm the Sheets API is enabled.'
  }

  if (status === 404) {
    return 'Google Sheet not found. Confirm GOOGLE_SHEET_ID is the spreadsheet ID, not the full URL.'
  }

  if (/Unable to parse range|range/i.test(message)) {
    return `Google Sheets could not find or parse the tab range ${SHEET_RANGE}. Confirm the sheet tab name matches exactly.`
  }

  if (/invalid_grant|private key|PEM|DECODER|credentials/i.test(message)) {
    return 'Google service account authentication failed. Confirm GOOGLE_PRIVATE_KEY is copied correctly in Vercel.'
  }

  return 'Could not submit request. Please try again.'
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return json(response, 405, { success: false, message: 'Method not allowed' })
  }

  try {
    const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim()
    const privateKey = normalizePrivateKey(process.env.GOOGLE_PRIVATE_KEY)
    const spreadsheetId = process.env.GOOGLE_SHEET_ID?.trim()

    if (!serviceAccountEmail || !privateKey || !spreadsheetId) {
      return json(response, 500, {
        success: false,
        message: 'Google Sheets is not configured. Check Vercel environment variables.',
      })
    }

    const {
      firstName = '',
      lastName = '',
      email = '',
      phone = '',
      communications = [],
      notes = '',
    } = parseBody(request.body)

    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      return json(response, 400, {
        success: false,
        message: 'First name, last name, and email address are required.',
      })
    }

    const selectedCommunications = Array.isArray(communications) ? communications : []
    const hasSelected = (type) => selectedCommunications.includes(type)
    const allCommunications = hasSelected('All Communications')

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: serviceAccountEmail,
        private_key: privateKey,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    const sheets = google.sheets({ version: 'v4', auth })

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: SHEET_RANGE,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [
          [
            new Date().toISOString(),
            firstName,
            lastName,
            email,
            phone,
            hasSelected('Email Marketing') || allCommunications ? 'Yes' : 'No',
            hasSelected('SMS/Text Messages') || allCommunications ? 'Yes' : 'No',
            hasSelected('Phone Calls') || allCommunications ? 'Yes' : 'No',
            hasSelected('Browser Notifications') || allCommunications ? 'Yes' : 'No',
            allCommunications ? 'Yes' : 'No',
            '/unsubscribe',
            'New',
            notes,
          ],
        ],
      },
    })

    return json(response, 200, { success: true })
  } catch (error) {
    console.error('Unsubscribe error:', {
      message: error?.message,
      status: error?.response?.status || error?.code,
      details: error?.response?.data,
    })
    return json(response, 500, {
      success: false,
      message: getGoogleErrorMessage(error),
    })
  }
}
