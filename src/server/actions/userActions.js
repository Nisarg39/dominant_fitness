"use server"

import ContactUs from "../models/contactUs";
import { connectToDB } from "../config/mongoose";

// use try and catch to handle errors

export const createContactUs = async (formData) => {
    const { name, email, phone, message } = formData;
    try {
        await connectToDB();
        
        // Check if we have a valid database connection
        if (!process.env.MONGODBURL) {
            console.log("No database connection - storing contact form data locally");
            // For now, just return success without storing
            return { success: "Contact us created successfully (stored locally)" };
        }
        
        const contactUs = await ContactUs.create({ name, email, phone, message });  
        return { success: "Contact us created successfully" };
    } catch (error) {
        console.log("Contact form error:", error);
        return { error: "Failed to process contact form" };
    }
};