import {z} from "zod"


const SignupSchema = z.object({
  name:z.string().min(3, "Name should contain at least 3 characters."),
  email:z.string().email('Enter a valid email.'),
  password: z.string()
    .min(7, { message: "Password must be at least 7 characters long." })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
    .regex(/[0-9]/, { message: "Password must contain at least one number." }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match.",
  path: ["confirmPassword"]
});
export default SignupSchema