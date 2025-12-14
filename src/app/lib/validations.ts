import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string({ error: "Name is required" })
    .min(2, "Name must be at least 2 characters long")
    .max(50, "Name must be 50 characters or fewer")
    .regex(
      /^[a-zA-Z\s\u00C0-\u017F\u0100-\u024F\u1E00-\u1EFF'-]+$/,
      "Name can only contain letters, spaces, hyphens, and apostrophes"
    )
    .transform((s) => s.trim())
    .refine((s) => s.length >= 2, "Name must be at least 2 characters after trimming"),
  email: z
    .string({ error: "Email address is required" })
    .min(1, "Email address is required")
    .max(254, "Email address is too long")
    .regex(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      "Please enter a valid email address"
    )
    .transform((s) => s.toLowerCase().trim()),
  message: z
    .string({ error: "Message is required" })
    .min(10, "Message must be at least 10 characters long")
    .max(1000, "Message must be 1000 characters or fewer")
    .transform((s) => s.trim())
    .refine((s) => s.length >= 10, "Message must be at least 10 characters after trimming")
    .refine((s) => !/^\s*$/.test(s), "Message cannot be only whitespace"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export const commentSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: z
    .string()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address")
    .transform((s) => s.toLowerCase().trim()),
  message: z
    .string()
    .min(3, "Comment must be at least 3 characters")
    .max(500, "Comment must be less than 500 characters"),
  postId: z.string().min(1),
});

export type CommentFormData = z.infer<typeof commentSchema>;


export const validationHelpers = {
  isValidUrl: (url: string): boolean => {
    try {
      const parsedUrl = new URL(url);
      return ['http:', 'https:'].includes(parsedUrl.protocol);
    } catch {
      return false;
    }
  },

  isValidEmail: (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(email) && email.length <= 254;
  },


  sanitizeHtml: (html: string): string => {
    if (typeof document === 'undefined') {
      // Server-side fallback
      return html.replace(/[&<>"']/g, (match) => {
        const htmlEntities: Record<string, string> = {
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#39;',
        };
        return htmlEntities[match] || match;
      });
    }
    const div = document.createElement("div");
    div.textContent = html;
    return div.innerHTML;
  },

  normalizeText: (text: string): string => {
    return text.trim().replace(/\s+/g, ' ');
  },

  isValidName: (name: string): boolean => {
    const nameRegex = /^[a-zA-Z\s\u00C0-\u017F\u0100-\u024F\u1E00-\u1EFF'-]{2,50}$/;
    return nameRegex.test(name.trim());
  },
};
