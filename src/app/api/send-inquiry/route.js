import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();

    const { name, email, mobile, pax, days, date, message } = body;

    // Basic validation
    if (!name || !email || !mobile || !date) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // App password (NOT your Gmail password)
      },
    });

    await transporter.sendMail({
      from: `"Pelican Inquiry" <${process.env.EMAIL_USER}>`,
      to: "hello@pelicantravelsandtours.com",
      subject: "New Inquiry - Pelican Tours",
      html: `
        <h2>New Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mobile:</strong> ${mobile}</p>
        <p><strong>PAX:</strong> ${pax}</p>
        <p><strong>Days:</strong> ${days}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    return Response.json({ success: true });
  } catch (err) {
  console.error("EMAIL ERROR:", err); // 👈 important
  return Response.json({ error: err.message }, { status: 500 });
}
}

