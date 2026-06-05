import { connectDb } from "@/lib/mongodb";
import { requireAuth } from "@/lib/rbac";
import { withErrorHandler } from "@/lib/error-handler";
import { AppError } from "@/lib/errors";
import { jsonSuccess } from "@/lib/api-response";
import { createComplaintSchema, withValidation } from "@/lib/validations";

export const dynamic = "force-dynamic";

const MAX_COMPLAINT_PAYLOAD_BYTES = 1024 * 10;

export const POST = withErrorHandler(
  withValidation(
    createComplaintSchema,
    async (req, validatedData) => {
      const decodedToken = await requireAuth(req);

      const { category, subject, description, priority } = validatedData;

      let db;
      try {
        db = await connectDb();
      } catch (error) {
        throw new AppError("Database connection failed. Please try again.", 503);
      }

      await db.collection("complaints").insertOne({
        userId: decodedToken.uid,
        userEmail: decodedToken.email,
        category,
        subject,
        description,
        priority,
        status: "pending",
        createdAt: new Date(),
      });

      return jsonSuccess({ message: "Complaint submitted successfully" });
    },
    { maxBytes: MAX_COMPLAINT_PAYLOAD_BYTES }
  )
);
