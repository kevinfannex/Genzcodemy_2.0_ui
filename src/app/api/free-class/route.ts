import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Basic validation
    const requiredFields = [
      "name",
      "email",
      "phone",
      "situation",
      "education",
      "careerGoal",
      "interest",
      "experience",
      "challenge",
      "availability"
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const {
      name,
      email,
      phone,
      preferredContact = "Not Specified",
      situation,
      education,
      careerGoal,
      interest,
      experience,
      challenge,
      availability,
    } = body;

    // Check environment variables
    const {
      GOOGLE_SHEET_ID,
      GOOGLE_SERVICE_ACCOUNT_EMAIL,
      GOOGLE_PRIVATE_KEY,
      GOOGLE_SHEET_RANGE = "Free Class Leads!A:L",
    } = process.env;

    if (!GOOGLE_SHEET_ID || !GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY) {
      console.error("Missing Google Sheets credentials in environment variables.");
      return NextResponse.json(
        { error: "Server configuration error. Missing Google Sheets credentials." },
        { status: 500 }
      );
    }

    // Format the private key (handle line breaks if passed via env vars)
    const privateKey = GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n");

    const auth = new google.auth.JWT({
      email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // Format Timestamp (using India Standard Time for Genzcodemy audience)
    const timestamp = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });

    // Construct the row in the specific column order:
    // Timestamp, Full Name, Email, Phone, Preferred Contact, Current Situation, Education, Career Goal, Area of Interest, Technical Experience, Biggest Challenge, Preferred Start
    const row = [
      timestamp,
      name,
      email,
      phone,
      preferredContact,
      situation,
      education,
      careerGoal,
      interest,
      experience,
      challenge,
      availability
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: GOOGLE_SHEET_ID,
      range: GOOGLE_SHEET_RANGE,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [row],
      },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error: any) {
    console.error("Error submitting to Google Sheets:", error.message || error);
    return NextResponse.json(
      { error: "Failed to submit registration. Please try again." },
      { status: 500 }
    );
  }
}
