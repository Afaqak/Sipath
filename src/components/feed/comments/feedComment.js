
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useFormattedTimeAgo } from "@/hooks/useFormattedTimeAgo";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { CustomEditor } from "@/components/common/customEditor";
import { Icons } from "@/components/icons";
import { LoadingCommentsSkeleton } from "@/utils/skeletons";
import { fetchRepliesAsync,addReply } from "@/features/feedComments/feedCommentSlice";
import UserAvatar from "@/components/common/userAvatar";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { warningToastNoAction } from "@/utils/toasts";

export const FeedComment = ({ comment, itemId, noView, toggleReplyView, parentId }) => {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';

    const formattedTimeAgo = useFormattedTimeAgo(comment?.createdAt, userTimeZone);
    const axios = useAxiosPrivate();
    const [isReplying, setIsReplying] = useState(false);

    const [loadingReplies, setLoadingReplies] = useState(false);
    const router = useRouter();
    const dispatch = useDispatch();
    const comments = useSelector((state) => state.feedComments);
    const { data: user } = useSession();

    const onReplySubmit = async ({ file, text, setData }) => {
        const imgRegex = /<img[^>]*>/g;
        const textWithoutImages = text.replace(imgRegex, '');

        try {

            if (!text && !file) {
                return warningToastNoAction("You must specify either text or image to comment!");
            }
            const formdata = new FormData();
            formdata.append(
                'comment',
                `<div class="flex gap-1"><span class="font-bold">${user?.user?.id === comment?.author_id ? user?.user?.display_name : comment?.user?.display_name}</span> ${textWithoutImages}</div>`
            );
            formdata.append('image', file);

            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/${itemId}/comments/${parentId}`, formdata, {
                headers: {
                    Authorization: `Bearer ${user?.token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (setData && typeof setData === 'function') {
                setData()
            }
            dispatch(addReply({ postId: itemId, commentId: response?.data?.comment?.reply_to, reply: response?.data?.comment }));
            setIsReplying(false)
        } catch (error) {
            console.error(error);
        }
    };

    const handleFetchReplies = async () => {
        try {
            setLoadingReplies(true);

            if (!comments[comment?.id]) {
                dispatch(fetchRepliesAsync({ postId: itemId, commentId: comment?.id, token: user?.token }));
                toggleReplyView(comment?.id);
            } else {
                toggleReplyView(comment?.id);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingReplies(false);
        }
    };

    const handleIsReplying = () => {
        if (!user?.token) {
            return router.push('/sign-in');
        }
        setIsReplying(!isReplying);
    };

    return (
        <div className="flex flex-col mb-4">
            <div className="flex gap-4">
                <Link className="block" href={`/profile/${comment?.author_id}`}>
                    <UserAvatar
                        user={{
                            image: +comment?.author_id === +user?.user?.id ? user?.user?.profile_image : comment.user?.profile_image,
                            name: +comment?.author_id === +user?.user?.id ? user?.user?.display_name.slice(0, 2) : comment?.user?.display_name.slice(0, 2),
                        }}
                        className="h-8 w-8"
                    />
                </Link>

                <div className="w-full">
                    <div className="flex gap-4 items-center mb-1">
                        <span className="font-medium text-sm ">{comment?.author_id === user?.user?.id ? user?.user?.display_name : comment?.user?.display_name}</span>{' '}
                        <p className="text-[0.75rem] text-gray-500">{formattedTimeAgo}</p>
                    </div>
                    <div className="flex gap-4 items-center">
                        <div className="flex flex-col gap-1">
                            {comment?.image && <Image src={comment?.image} alt="comment-image" height={300} width={300} />}
                            <div
                                style={{
                                    whiteSpace: 'pre-wrap',
                                }}
                                dangerouslySetInnerHTML={{ __html: comment.comment }}
                                className="text-sm md:text-base py-2 px-3 bg-gray-100 shadow-md w-fit break-words"
                            ></div>
                        </div>
                        <div className="flex flex-col gap-2 self-start">
                            <Icons.reply onClick={handleIsReplying} />
                            <Icons.report />
                        </div>
                    </div>
                    <div className="flex justify-between text-gray-500 mt-2">
                        <div className="flex gap-2 items-center cursor-pointer">
                            <Icons.love />
                            <span className="text-sm">2</span>
                        </div>
                    </div>
                    {isReplying && (
                        <div className="w-full mt-2">
                            <CustomEditor
                                closeReplying={() => setIsReplying(false)}
                                onCommentSubmit={onReplySubmit}
                                reply={isReplying}
                            />

                        </div>
                    )}

                    {!noView && (
                        <button onClick={handleFetchReplies} className="text-blue-500 font-medium mt-2" type="button">
                            View Replies
                        </button>
                    )}
                    {loadingReplies ? <LoadingCommentsSkeleton times={2} /> : null}
                </div>
            </div>
        </div>
    );
};
