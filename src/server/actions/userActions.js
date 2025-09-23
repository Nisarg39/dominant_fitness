"use server"

import ContactUs from "../models/contactUs";
import { connectToDB } from "../config/mongoose";

// use try and catch to handle errors

export const createContactUs = async (formData) => {
    const { name, email, phone, message } = formData;
    try {
        await connectToDB();
        const contactUs = await ContactUs.create({ name, email, phone, message });  
        return { success: "Contact us created successfully" };
    } catch (error) {
        console.log(error);
        return { error: "Failed to connect to database" };
    }
};