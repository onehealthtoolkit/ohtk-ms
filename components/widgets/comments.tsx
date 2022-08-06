import { CameraIcon } from "@heroicons/react/solid";
import {
  CommentsViewModel,
  LocalFile,
} from "components/widgets/commentsViewModel";
import { TextArea } from "components/widgets/forms";
import Spinner from "components/widgets/spinner";
import { Attachment, Comment } from "lib/services/comment/comment";
import useServices from "lib/services/provider";
import { Observer } from "mobx-react";
import getConfig from "next/config";
import { useState } from "react";

const { publicRuntimeConfig } = getConfig();

type CommentsProps = {
  threadId?: number;
};

const Comments: React.FC<CommentsProps> = ({ threadId }) => {
  const { commentService } = useServices();
  const [viewModel] = useState(new CommentsViewModel(commentService, threadId));

  if (!threadId) return null;
  return (
    <Observer>
      {() => (
        <>
          <form
            className="mt-8 border border-gray-200 shadow mx-4 rounded"
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
                  rows={2}
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
                {viewModel.isSubmitting ? <Spinner /> : "Save"}
              </button>
            </div>
            {viewModel.submitError.length > 0 && (
              <div className="bg-red-100 p-4 rounded-md">
                {viewModel.submitError}
              </div>
            )}
          </form>
          <label className="block p-4 text-gray-700 text-sm font-bold mb-2">
            Comments
          </label>

          {viewModel.data.length > 0 ? (
            viewModel.data.map(comment => (
              <Comment key={comment.id} comment={comment} />
            ))
          ) : (
            <div>No comments</div>
          )}
        </>
      )}
    </Observer>
  );
};

export default Comments;

const Comment = ({ comment }: { comment: Comment }) => {
  return (
    <blockquote className="mb-8">
      <div className="mb-1 text-sm px-4">
        {comment.createdBy.firstName + "  "}
        {comment.createdBy.lastName}
      </div>
      <div
        className="border border-gray-50 bg-gray-50 
                    shadow mx-4 rounded mb-4 text-base p-4
                  "
      >
        <p>{comment.body}</p>
        {comment.attachments && comment.attachments.length > 0 && (
          <div className="flex flex-row gap-2 mt-4">
            {comment.attachments?.map(attachment => (
              <Attachment key={attachment.id} file={attachment} />
            ))}
          </div>
        )}
      </div>
    </blockquote>
  );
};
const TempAttachment = ({ file }: { file: LocalFile }) => {
  return (
    <div className="border border-gray-300 p-1 h-24 w-24 flex flex-row justify-center items-center">
      <img src={file.url} className="w-full h-full object-cover" />
    </div>
  );
};

const Attachment = ({ file: attachment }: { file: Attachment }) => {
  return (
    <div className="border border-gray-300 p-1 h-24 w-24 flex flex-row justify-center items-center">
      <img
        src={`${publicRuntimeConfig.serverUrl}/${attachment.file}`}
        className="w-full h-full object-cover"
      />
    </div>
  );
};
