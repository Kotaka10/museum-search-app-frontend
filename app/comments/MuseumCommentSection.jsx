'use client';

import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import CommentForm from "@/app/comments/CommentForm";
import CommentList from "@/app/comments/CommentList";

export default function MuseumCommentSection({ museumId }) {
    const [comments, setComments] = useState([]);
    const { user } = useAuth();
    const currentUser = user?.email || null;

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comments/museum/${museumId}`);
                if (res.ok) {
                    const data = await res.json();
                    setComments(data);
                }
            } catch (err) {
                console.error('コメントの取得に失敗しました', err)
            }
        }

        fetchComments();
    }, [museumId]);

    return (
    <div>
      <CommentForm
        museumId={museumId}
        onCommentAdded={(newComment) => setComments((prev) => [...prev, newComment])}
        currentUser={currentUser}
      />
      <CommentList
        comments={comments}
        setComments={setComments}
        currentUser={currentUser}
      />
    </div>
  );
}