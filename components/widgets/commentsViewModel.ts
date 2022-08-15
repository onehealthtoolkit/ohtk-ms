import { BaseFormViewModel } from "lib/baseFormViewModel";
import { Comment } from "lib/services/comment/comment";
import { ICommentService } from "lib/services/comment/commentService";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";

export type LocalFile = {
  id: string;
  file: File;
  url: string;
};

export class CommentsViewModel extends BaseFormViewModel {
  data: Comment[] = [];
  _body: string = "";
  attachments: LocalFile[] = [];

  constructor(
    readonly commentService: ICommentService,
    readonly threadId?: number | null
  ) {
    super();
    makeObservable(this, {
      data: observable,
      _body: observable,
      body: computed,
      attachments: observable,
      addAttachments: action,
      save: action,
    });
    this.fetch();
  }

  public get body(): string {
    return this._body;
  }
  public set body(value: string) {
    this._body = value;
    delete this.fieldErrors["body"];
    if (this.submitError.length > 0) {
      this.submitError = "";
    }
  }

  addAttachments(files: FileList) {
    const attachments = Array<LocalFile>();
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (file) {
        attachments.push({
          id: crypto.randomUUID(),
          file,
          url: URL.createObjectURL(file),
        });
      }
    }
    this.attachments.push(...attachments);
  }

  async fetch() {
    if (!this.threadId) return;

    const result = await this.commentService.fetchComments(this.threadId);
    runInAction(() => {
      this.data = result.items || [];
      if (result.error) {
        this.submitError = result.error;
      }
    });
  }

  async save(): Promise<boolean> {
    if (!this.threadId) return false;

    this.isSubmitting = true;
    var result = await this.commentService.createComment(
      this.body,
      this.threadId,
      this.attachments.map(it => it.file)
    );
    this.isSubmitting = false;

    if (!result.success) {
      if (result.message) {
        this.submitError = result.message;
      }
      if (result.fields) {
        this.fieldErrors = result.fields;
      }
    } else {
      this.body = "";
      this.attachments.splice(0, this.attachments.length);
      this.fetch(); // use cache from refetch
    }
    return result.success;
  }
}
