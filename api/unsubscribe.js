import { google } from 'googleapis'

const json = (response, statusCode, body) => {
  response.status(statusCode).json(body)
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return json(response, 405, { success: false, message: 'Method not allowed' })
  }

  try {
    const {
      firstName = '',
      lastName = '',
      email = '',
      phone = '',
      communications = [],
      notes = '',
    } = request.body || {}

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
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    const sheets = google.sheets({ version: 'v4', auth })

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "'YourCreditPal Unsubscribe Sheets'!A:M",
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
    console.error('Unsubscribe error:', error)
    return json(response, 500, {
      success: false,
      message: 'Could not submit request. Please try again.',
    })
  }
}
