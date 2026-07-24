import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, message, category } = body;

    if (!email || !message) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Pelican Contact Form" <${process.env.EMAIL_USER}>`,
      to: "hello@pelicantravelsandtours.com",
      replyTo: email, // lets you hit "reply" and respond straight to the visitor
      subject: `New ${category || "General"} Contact Message - Pelican Tours`,
      html: `
        <h2>New Contact Form Message</h2>
        <p><strong>Category:</strong> ${category || "General"}</p>
        <p><strong>From:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error("EMAIL ERROR:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}