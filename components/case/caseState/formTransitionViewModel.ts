import { ModalDialogViewModel } from "lib/dialogViewModel";
import Form, { FormImageMap } from "lib/opsvForm/models/form";
import { parseForm } from "lib/opsvForm/models/json";
import Section from "lib/opsvForm/models/section";
import { ICaseService } from "lib/services/case";
import { ICommentService } from "lib/services/comment/commentService";
import { StateTransitionRef } from "lib/services/stateTransition/stateTransition";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { v4 as uuidv4 } from "uuid";

export class FormTransitionViewModel extends ModalDialogViewModel {
  form?: Form = undefined;
  errorRendering = false;
  isSubmitting = false;
  errorForwardState?: string = undefined;

  constructor(
    readonly caseService: ICaseService,
    readonly commentService: ICommentService,
    readonly caseId: string,
    readonly transition: StateTransitionRef,
    readonly definition: string,
    readonly threadId?: number | null
  ) {
    super();
    makeObservable(this, {
      form: observable,
      errorRendering: observable,
      errorForwardState: observable,
      isSubmitting: observable,
      currentSection: computed,
      next: action,
      previous: action,
      isFirst: computed,
      isLast: computed,
      submit: action,
    });
    this._init();
  }

  private _init() {
    try {
      const json = JSON.parse(this.definition);
      json.id = uuidv4();
      // json can be empty {}, to be able to run parseForm, then add sections
      if (!json.sections) {
        json.sections = [];
      }
      this.form = parseForm(json);
    } catch (e) {
      console.log(e);
      this.errorRendering = true;
    }
  }

  get currentSection(): Section | undefined {
    return this.form?.currentSection;
  }

  get isFirst() {
    return !this.form?.couldGoToPreviousSection;
  }

  get isLast() {
    return !this.form?.couldGoToNextSection;
  }

  next() {
    this.errorForwardState = undefined;
    this.form?.next();
  }

  previous() {
    this.errorForwardState = undefined;
    this.form?.previous();
  }

  async submit(): Promise<boolean> {
    const formData = this.form?.toJsonValue();
    console.log("on complete form", formData);

    this.isSubmitting = true;

    if (formData) {
      const imageFieldNames = Object.keys(this.form?.images || {});

      try {
        if (this.threadId) {
          for (const fieldName of imageFieldNames) {
            const imageUrls = await this.uploadImages(
              fieldName,
              this.form!.images[fieldName]
            );

            if (imageUrls.length > 0) {
              formData[fieldName] = (
                (formData[fieldName] as Array<string>) || []
              ).concat(...imageUrls);
            }
          }
          // refetch
          this.commentService.fetchComments(this.threadId, true);
        }
      } catch (e) {
        console.log(e);
        runInAction(() => {
          this.isSubmitting = false;
          this.errorForwardState = "Server error";
        });
        return false;
      }
    }

    const result = await this.caseService.forwardState(
      this.caseId,
      this.transition.id,
      formData
    );

    runInAction(() => {
      this.isSubmitting = false;
    });

    if (result.data) {
      return true;
    }
    if (result.error) {
      this.errorForwardState = "Server error";
      return false;
    }
    return false;
  }

  /**
   * Upload form images through creating comment and its attachments,
   * then retrieve image urls from response
   */
  async uploadImages(field: string, images: FormImageMap): Promise<string[]> {
    const urls = Array<string>();
    if (!this.threadId) {
      return urls;
    }

    const files = Array<File>();
    const imageEntries = Object.entries(images);

    // convert base64 to file
    for (const [uuid, base64] of imageEntries) {
      const file = await dataURLtoFile(base64, uuid);
      files.push(file);
    }

    if (files.length > 0) {
      const fromTransition = this.transition.fromStep?.name;
      const toTransition = this.transition.toStep?.name;

      var result = await this.commentService.createComment(
        `❗️ Attach images in form field: '${field}' during case transition from ` +
          `'${fromTransition}' to '${toTransition}' `,
        this.threadId,
        files
      );

      if (result.success) {
        result.data?.attachments?.forEach(attachment =>
          urls.push(attachment.file)
        );
      } else {
        throw new Error("Failed to upload images");
      }
    }
    return urls;
  }
}

function dataURLtoFile(dataurl: string, filename: string): Promise<File> {
  var arr = dataurl.split(","),
    mime = arr[0]!.match(/:(.*?);/)![1];
  return fetch(dataurl)
    .then(res => res.blob())
    .then(blob => {
      return new File([blob], filename, { type: mime });
    });
}
