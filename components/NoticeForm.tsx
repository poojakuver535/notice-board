import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Notice } from "@/types/notice";

interface NoticeFormProps {
  notice?: Notice;
}

export default function NoticeForm({ notice }: NoticeFormProps) {
  const router = useRouter();
  const isEditing = !!notice;

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("General");
  const [priority, setPriority] = useState("Normal");
  const [publishDate, setPublishDate] = useState("");
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (notice) {
      setTitle(notice.title);
      setBody(notice.body);
      setCategory(notice.category);
      setPriority(notice.priority);
      setPublishDate(notice.publishDate.slice(0, 10));
      setImage(notice.image || "");
    }
  }, [notice]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setLoading(true);

    const payload = { title, body, category, priority, publishDate, image };

    try {
      const url = isEditing ? `/api/notices/${notice.id}` : "/api/notices";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors(data.errors || [data.error || "Something went wrong"]);
        setLoading(false);
        return;
      }

      router.push("/");
    } catch (err) {
      setErrors(["Network error. Please try again."]);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        {isEditing ? "Edit Notice" : "Add Notice"}
      </h1>

      {errors.length > 0 && (
        <div className="bg-red-50 border border-red-300 text-red-700 p-4 rounded mb-6">
          {errors.map((err, i) => (
            <p key={i}>{err}</p>
          ))}
        </div>
      )}

      <div className="mb-4">
        <label className="block font-medium mb-1">Title *</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter notice title"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Body *</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={5}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter notice body"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="General">General</option>
          <option value="Exam">Exam</option>
          <option value="Event">Event</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Priority</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Normal">Normal</option>
          <option value="Urgent">Urgent</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Publish Date *</label>
        <input
          type="date"
          value={publishDate}
          onChange={(e) => setPublishDate(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-6">
        <label className="block font-medium mb-1">Image URL (optional)</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : isEditing
              ? "Update Notice"
              : "Create Notice"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/")}
          className="bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
