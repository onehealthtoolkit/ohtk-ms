import { action, makeObservable, observable, runInAction } from "mobx";
import { BaseViewModel } from "lib/baseViewModel";
import { GalleryDialogViewModel } from "components/widgets/dialogs/galleryDialogViewModel";
import { FollowupDetail } from "lib/services/followup/followup";
import { IFollowupService } from "lib/services/followup/followupService";

export class FollowupViewModel extends BaseViewModel {
  data: FollowupDetail = {} as FollowupDetail;
  id: string;
  galleryViewModel?: GalleryDialogViewModel = undefined;

  _activeTabIndex: number = 0;

  constructor(id: string, readonly followupService: IFollowupService) {
    super();
    makeObservable(this, {
      data: observable,
      fetch: action,
      galleryViewModel: observable,
      openGallery: action,
    });
    this.id = id;
    this.fetch();
  }

  async fetch() {
    this.isLoading = true;
    const data = (await this.followupService.getFollowup(this.id)).data;
    if (data) {
      runInAction(() => {
        this.data = data;
      });
    }
    this.isLoading = false;
  }

  openGallery(imageId: string) {
    const images =
      this.data.images?.map(image => ({
        imageUrl: image.file,
        thumbnailUrl: image.thumbnail,
      })) || [];

    const selectedIdx = this.data.images?.findIndex(it => it.id === imageId);

    this.galleryViewModel = new GalleryDialogViewModel(images, selectedIdx);
    this.galleryViewModel.open(null);
  }
}
