import { contactUsEmail } from "../utils/contactUsEmail.js";
import { Contact } from "../models/contactUS.model.js";

export const submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Basic email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email address." });
    }

    // Save to database (if required)
    await Contact.create({ name, email, message });

    // Compose the email message
    const emailMessage = `
      <h1>New Enquiry Submission</h1>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong> ${message}</p>
    `;

    // Use the sendEmail utility
    await contactUsEmail({
      email: process.env.ADMIN_EMAIL, // Send to admin instead of user
      subject: `Message From Dutio`,
      message: emailMessage,
    });

    res.status(200).json({ message: "Your Enquiry has been submitted successfully." });
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({ message: "Failed to send your Enquiry. Please try again later." });
  }
};
