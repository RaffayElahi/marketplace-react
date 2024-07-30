import {z} from "zod"

const loginSchema = z.object({
    email: z.string().min(1, "Email is required.").email("Invalid email entered."),
    password: z.string().min(1, "Password is required.").min(6, "Password must be of at least 7 characters long.")
})

export default loginSchema