import {registerAs} from "@nestjs/config";

export default registerAs("auth", () => ({
	jwtSecret: process.env.JWT_SECRET,
	jwtAdminSecret: process.env.JWT_ADMIN_SECRET,
	masterKey: process.env.MASTER_KEY
}));
