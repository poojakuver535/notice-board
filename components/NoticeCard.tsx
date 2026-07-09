import { Notice } from "@/types/notice";
import { useRouter } from "next/router";
import { useState } from "react";

interface NoticeCardProps {
  notice: Notice;
  onDelete: (id: number) => void;
}

export default function NoticeCard({ notice, onDelete }: NoticeCardProps) {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);

  const categoryColors: Record<string, string> = {
    Exam: "bg-purple-100 text-purple-700",
    Event: "bg-blue-100 text-blue-700",
    General: "bg-gray-100 text-gray-700",
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          {notice.priority === "Urgent" && (
            <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
              Urgent
            </span>
          )}
          <span
            className={`text-xs font-medium px-2 py-1 rounded ${
              categoryColors[notice.category] || categoryColors.General
            }`}
          >
            {notice.category}
          </span>
        </div>

        <h2 className="text-lg font-semibold mb-2">{notice.title}</h2>
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">{notice.body}</p>

        {notice.image && (
          <img
            src={notice.image}
            alt={notice.title}
            className="w-full h-40 object-cover rounded mb-3"
          />
        )}

        <p className="text-xs text-gray-400">
          {new Date(notice.publishDate).toLocaleDateString()}
        </p>
      </div>

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => router.push(`/notices/${notice.id}/edit`)}
          className="flex-1 bg-yellow-400 text-yellow-900 text-sm font-medium py-2 rounded hover:bg-yellow-500"
        >
          Edit
        </button>

        {!showConfirm ? (
          <button
            onClick={() => setShowConfirm(true)}
            className="flex-1 bg-red-100 text-red-700 text-sm font-medium py-2 rounded hover:bg-red-200"
          >
            Delete
          </button>
        ) : (
          <div className="flex-1 flex gap-1">
            <button
              onClick={() => onDelete(notice.id)}
              className="flex-1 bg-red-600 text-white text-sm py-2 rounded hover:bg-red-700"
            >
              Confirm
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              className="flex-1 bg-gray-200 text-gray-600 text-sm py-2 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
