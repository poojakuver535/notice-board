import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    try {
      const notices = await prisma.notice.findMany({
        orderBy: [{ priority: "desc" }, { publishDate: "desc" }],
      });
      return res.status(200).json(notices);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch notices" });
    }
  }

  if (req.method === "POST") {
    try {
      const { title, body, category, priority, publishDate, image } = req.body;

      const errors: string[] = [];
      if (!title || typeof title !== "string" || title.trim() === "") {
        errors.push("Title is required");
      }
      if (!body || typeof body !== "string" || body.trim() === "") {
        errors.push("Body is required");
      }
      if (!["Exam", "Event", "General"].includes(category)) {
        errors.push("Category must be Exam, Event, or General");
      }
      if (!["Normal", "Urgent"].includes(priority)) {
        errors.push("Priority must be Normal or Urgent");
      }
      if (!publishDate || isNaN(Date.parse(publishDate))) {
        errors.push("A valid publish date is required");
      }

      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const notice = await prisma.notice.create({
        data: {
          title: title.trim(),
          body: body.trim(),
          category,
          priority,
          publishDate: new Date(publishDate),
          image: image || null,
        },
      });

      return res.status(201).json(notice);
    } catch (error) {
      return res.status(500).json({ error: "Failed to create notice" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
