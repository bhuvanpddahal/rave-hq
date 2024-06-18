import nodemailer from "nodemailer";
import { render } from "@react-email/render";

import VerifyEmailTemplate from "./templates/verify-email";
import APIKeyRecoveryTemplate from "./templates/api-key-recovery";

export const sendVerificationEmail = async (email: string, token: string) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASS
        }
    });

    const mailOptions = {
        from: {
            name: "RaveHQ",
            address: process.env.NODEMAILER_USER!
        },
        to: email,
        subject: "Verify your email",
        text: `This is your verification token: ${token}`,
        html: render(VerifyEmailTemplate({ token }))
    };

    await transporter.sendMail(mailOptions);
};

export const sendApiKeyRecoveryEmail = async (email: string, token: string) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASS
        }
    });

    const mailOptions = {
        from: {
            name: "RaveHQ",
            address: process.env.NODEMAILER_USER!
        },
        to: email,
        subject: "Recover your API key",
        text: `This is your API key recovery code: ${token}`,
        html: render(APIKeyRecoveryTemplate({ token }))
    };

    await transporter.sendMail(mailOptions);
};