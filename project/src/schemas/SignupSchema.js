import {z} from "zod"


const SignupSchema = z.object({
  username:z.string().min(3, "Username should contain at least 3 characters.").max(28, "Username shouldn't exceed beyond 28 characters")
  .regex(/^[a-z0-9]+$/, "Username can only contain lowercase letters and numbers.")
  ,
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