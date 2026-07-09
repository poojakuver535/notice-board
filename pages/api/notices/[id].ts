import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const id = Number(req.query.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  if (req.method === "GET") {
    try {
      const notice = await prisma.notice.findUnique({ where: { id } });
      if (!notice) {
        return res.status(404).json({ error: "Notice not found" });
      }
      return res.status(200).json(notice);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch notice" });
    }
  }

  if (req.method === "PUT") {
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

      const notice = await prisma.notice.update({
        where: { id },
        data: {
          title: title.trim(),
          body: body.trim(),
          category,
          priority,
          publishDate: new Date(publishDate),
          image: image || null,
        },
      });

      return res.status(200).json(notice);
    } catch (error) {
      return res.status(500).json({ error: "Failed to update notice" });
    }
  }

  if (req.method === "DELETE") {
    try {
      await prisma.notice.delete({ where: { id } });
      return res.status(200).json({ message: "Notice deleted" });
    } catch (error) {
      return res.status(500).json({ error: "Failed to delete notice" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
