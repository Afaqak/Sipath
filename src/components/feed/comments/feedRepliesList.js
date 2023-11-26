import Image from "next/image";
import { FeedComment } from "@/components";

export const FeedRepliesList = ({ comments, itemId, parentId, handleFetchReplies }) => {
    console.log(comments)
    return (
      <div className="">
        {comments?.length > 0 ? (
          comments?.map((comment) => (
            <>
  
              <FeedComment
                key={comment.id} itemId={itemId} noView={true} comment={comment} parentId={parentId} />
            </>
          ))
        ) : (
          <p className="mb-2">No comments found!</p>
        )}
        {comments?.length > 0 && (
          <div className="w-full flex justify-center">
            <button className="" onClick={handleFetchReplies}>
              <Image src={'/svgs/add_circle.svg'} width={30} height={30} />
            </button>
          </div>
        )}
      </div>
    );
  };
  
  
  
  
  
  
  
  
  