import * as z from "zod";

export const passwordObject = z.string()
    .regex(new RegExp(".*[A-Z].*"), "At least one uppercase character")
    .regex(new RegExp(".*[a-z].*"), "At least one lowercase character")
    .regex(new RegExp(".*\\d.*"), "At least one number")
    .regex(
        new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
        "At least one special character"
    )
    .min(8, "At least 8 characters")