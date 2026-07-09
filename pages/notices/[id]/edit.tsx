import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Notice } from "@/types/notice";
import NoticeForm from "@/components/NoticeForm";

export default function EditNotice() {
  const router = useRouter();
  const { id } = router.query;
  const [notice, setNotice] = useState<Notice | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchNotice = async () => {
      try {
        const res = await fetch(`/api/notices/${id}`);
        if (res.ok) {
          const data = await res.json();
          setNotice(data);
        }
      } catch (error) {
        console.error("Failed to fetch notice");
      } finally {
        setLoading(false);
      }
    };
    fetchNotice();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!notice) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-500">Notice not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <NoticeForm notice={notice} />
    </div>
  );
}
