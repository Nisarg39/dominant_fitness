"use server"

import {connectToDB} from '@/server/config/mongoose';
import Admin from '@/server/models/admin';
import ContactUs from '@/server/models/contactUs';
import jwt from 'jsonwebtoken';

export async function signInAdmin(formData) {
  const data = {username: formData.get('username'), password: formData.get('password')};
  try {
    await connectToDB();
    const admin = await Admin.findOne({username: data.username, password: data.password});
    if(!admin) {
      return { success: false, message: 'Invalid credentials' };
    }
    const token = jwt.sign({adminId: admin._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
    admin.adminToken = token;
    await admin.save();
    return { success: true, message: 'Admin signed in successfully', adminToken: token };
  } catch (error) {
    console.log(error);
    return { success: false, message: 'Internal server error' };
    // 
  }
}

export async function getContactUs(page = 1) {
  try {
    await connectToDB();
    const skip = (page - 1) * 10;
    const contactUs = await ContactUs.find().skip(skip).limit(10).sort({ createdAt: -1 });
    const total = await ContactUs.countDocuments();
    const totalPages = Math.ceil(total / 10);
    
    return { 
      success: true, 
      data: JSON.parse(JSON.stringify(contactUs)), 
      total: total,
      currentPage: page,
      totalPages: totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: 'Internal server error' };
  }
}

export async function markContactUsAsRead(id) {
  try {
    await connectToDB();
    await ContactUs.findByIdAndUpdate(id, { isRead: true });
    return { success: true, message: 'Contact us marked as read' };
  } catch (error) {
    console.log(error);
    return { success: false, message: 'Internal server error' };
  }
}