import { registerAs } from "@nestjs/config";

export default registerAs("sms", () => ({
  apiKey: process.env.SMS_API_KEY,
  senderNumber: process.env.SMS_SENDER_NUMBER,
  userId: process.env.SMS_USER_ID,
}));
