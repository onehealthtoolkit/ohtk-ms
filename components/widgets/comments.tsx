/* eslint-disable @next/next/no-img-element */
import { CameraIcon } from "@heroicons/react/solid";
import { ChatAltIcon } from "@heroicons/react/outline";
import {
  CommentsViewModel,
  LocalFile,
} from "components/widgets/commentsViewModel";
import { TextArea, UserAvatar } from "components/widgets/forms";
import Spinner from "components/widgets/spinner";
import { Attachment, Comment } from "lib/services/comment/comment";
import useServices from "lib/services/provider";
import { observer, Observer } from "mobx-react";
import getConfig from "next/config";
import { useState } from "react";
import { useRouter } from "next/router";
import { formatDateTime } from "lib/datetime";
import GalleryDialog from "components/widgets/dialogs/galleryDialog";

const { publicRuntimeConfig } = getConfig();

type CommentsProps = {
  threadId?: number | null;
};

const Comments: React.FC<CommentsProps> = ({ threadId }) => {
  const { commentService } = useServices();
  const [viewModel] = useState(new CommentsViewModel(commentService, threadId));

  if (!threadId) return null;
  return (
    <Observer>
      {() => (
        <>
          <label className="mt-4 px-4 text-gray-700 text-sm font-bold flex gap-1">
            <ChatAltIcon className="w-5 h-5" />
            <span>Comments</span>
          </label>

          <div>
            {viewModel.data.length > 0 ? (
              viewModel.data.map(comment => (
                <Comment
                  key={comment.id}
                  comment={comment}
                  onViewImage={id => viewModel.openGallery(comment.id, id)}
                />
              ))
            ) : (
              <div>No comments</div>
            )}
          </div>

          <CommentForm viewModel={viewModel} />

          <GalleryDialog viewModel={viewModel.galleryViewModel} />
        </>
      )}
    </Observer>
  );
};

export default Comments;

const CommentForm = observer(
  ({ viewModel }: { viewModel: CommentsViewModel }) => {
    return (
      <form
        className="border border-gray-200  mx-4 rounded"
        onSubmit={async evt => {
          evt.preventDefault();
          viewModel.save();
        }}
      >
        <div className="p-4">
          <div className="flex flex-row gap-2">
            <TextArea
              id="body"
              placeholder="Enter comment here..."
              rows={3}
              value={viewModel.body}
              onChange={evt => (viewModel.body = evt.target.value)}
              disabled={viewModel.isSubmitting}
              required
            />
            <label
              htmlFor="attachment"
              className="p-4 bg-gray-200 border border-transparent 
                      hover:border-gray-400 rounded shadow cursor-pointer 
                    "
            >
              <CameraIcon className="w-5 h-5 fill-black" />
            </label>
            <input
              id="attachment"
              type="file"
              accept="image/*"
              placeholder="attachment"
              multiple
              onChange={evt => {
                if (evt.target.files?.length) {
                  viewModel.addAttachments(evt.target.files);
                }
              }}
              disabled={viewModel.isSubmitting}
              className="hidden"
            />
          </div>
          <p className="text-red-700 text-xs italic">
            {viewModel.fieldErrors.body}
          </p>
          <div className="flex flex-row flex-wrap gap-2 py-2 items-start">
            {viewModel.attachments.map(attachment => (
              <TempAttachment key={attachment.id} file={attachment} />
            ))}
          </div>
          <button
            className="border
                      text-white
                      text-sm
                      bg-[#4C81F1] 
                      border-blue-300
                      hover:border-blue-500
                      rounded
                      px-4
                      py-2
                    "
            type="submit"
            disabled={viewModel.isSubmitting}
          >
            {viewModel.isSubmitting ? <Spinner /> : "Submit"}
          </button>
        </div>
        {viewModel.submitError.length > 0 && (
          <div className="bg-red-100 p-4 rounded-md">
            {viewModel.submitError}
          </div>
        )}
      </form>
    );
  }
);

const Comment = ({
  comment,
  onViewImage,
}: {
  comment: Comment;
  onViewImage: (id: string) => void;
}) => {
  const router = useRouter();
  return (
    <>
      <blockquote className="mt-1 border-b">
        <div className="bg-white mb-4 text-base py-2">
          <div className="flex items-top gap-2">
            <UserAvatar url={comment.createdBy.avatarUrl} />
            <div className="flex-row">
              <div className="mb-1 text-sm">
                {comment.createdBy.firstName + "  "}
                {comment.createdBy.lastName}
              </div>
              <div className="text-[0.65rem] text-gray-500">
                {formatDateTime(comment.createdAt, router.locale)}
              </div>
            </div>
          </div>

          <div className="flex-row mt-4 text-sm">
            <p>{comment.body}</p>
            {comment.attachments && comment.attachments.length > 0 && (
              <div className="flex flex-row gap-2 mt-4">
                {comment.attachments?.map(attachment => (
                  <Attachment
                    key={attachment.id}
                    file={attachment}
                    onViewImage={onViewImage}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </blockquote>
    </>
  );
};
const TempAttachment = ({ file }: { file: LocalFile }) => {
  return (
    <div className="border border-gray-300 p-1 h-24 w-24 flex flex-row justify-center items-center">
      <img
        src={file.url}
        className="w-full h-full object-cover"
        alt="file.url"
      />
    </div>
  );
};

const Attachment = ({
  file: attachment,
  onViewImage,
}: {
  file: Attachment;
  onViewImage: (id: string) => void;
}) => {
  return (
    <div
      className="border border-gray-300 p-1 h-24 w-24 flex flex-row 
        justify-center items-center cursor-pointer
      "
      onClick={() => onViewImage(attachment.id)}
    >
      <img
        src={`${publicRuntimeConfig.serverUrl}/${attachment.thumbnail}`}
        className="w-full h-full object-cover"
        alt={attachment.file}
      />
    </div>
  );
};
