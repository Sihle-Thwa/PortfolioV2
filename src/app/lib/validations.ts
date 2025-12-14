import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address")
    .toLowerCase(),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export const newsletterSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address")
    .toLowerCase(),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;

export const projectSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters"),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters")
    .max(500, "Description must be less than 500 characters"),
  tags: z.array(z.string()).min(1, "At least one tag is required").max(10),
  github: z.string().url("Invalid GitHub URL").optional(),
  demo: z.string().url("Invalid demo URL").optional(),
  image: z.string().url("Invalid image URL").optional(),
});

export type ProjectFormData = z.infer<typeof projectSchema>;

export const commentSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: z.string().email("Invalid email address").toLowerCase(),
  comment: z
    .string()
    .min(3, "Comment must be at least 3 characters")
    .max(500, "Comment must be less than 500 characters"),
  postId: z.string().min(1),
});

export type CommentFormData = z.infer<typeof commentSchema>;

export const searchSchema = z.object({
  query: z
    .string()
    .min(1, "Search query is required")
    .max(100, "Search query is too long"),
  category: z.enum(["all", "projects", "blog", "skills"]).optional(),
});

export type SearchFormData = z.infer<typeof searchSchema>;

export const fileUploadSchema = z.object({
  file: z
    .instanceof(File)
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      "File size must be less than 5MB"
    )
    .refine(
      (file) =>
        ["image/jpeg", "image/png", "image/webp", "image/gif"].includes(
          file.type
        ),
      "File must be an image (JPEG, PNG, WebP, or GIF)"
    ),
});

export type FileUploadData = z.infer<typeof fileUploadSchema>;

export const validationHelpers = {
  isValidUrl: (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  isValidPhone: (phone: string): boolean => {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, "").length >= 10;
  },

  sanitizeHtml: (html: string): string => {
    const div = document.createElement("div");
    div.textContent = html;
    return div.innerHTML;
  },

  isValidFileType: (file: File, allowedTypes: string[]): boolean => {
    return allowedTypes.includes(file.type);
  },

  isValidFileSize: (file: File, maxSizeInMB: number): boolean => {
    return file.size <= maxSizeInMB * 1024 * 1024;
  },
};

export const apiErrorSchema = z.object({
  error: z.string(),
  message: z.string().optional(),
  statusCode: z.number().optional(),
});

export type ApiError = z.infer<typeof apiErrorSchema>;

export const apiSuccessSchema = z.object({
  message: z.string(),
  data: z.any().optional(),
});

export type ApiSuccess = z.infer<typeof apiSuccessSchema>;
