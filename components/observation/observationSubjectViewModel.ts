import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { BaseViewModel } from "lib/baseViewModel";
import { GalleryDialogViewModel } from "components/widgets/dialogs/galleryDialogViewModel";
import { IObservationService } from "lib/services/observation";
import { ObservationSubjectDetail } from "lib/services/observation/observation";

export class ObservationSubjectViewModel extends BaseViewModel {
  data: ObservationSubjectDetail = {} as ObservationSubjectDetail;
  id: string;
  galleryViewModel?: GalleryDialogViewModel = undefined;

  _activeTabIndex: number = 0;

  constructor(id: string, readonly observationService: IObservationService) {
    super();
    makeObservable(this, {
      data: observable,
      fetch: action,
      galleryViewModel: observable,
      openGallery: action,
      _activeTabIndex: observable,
      activeTabIndex: computed,
      imageUrlMap: computed,
      fileUrlMap: computed,
    });
    this.id = id;
    this.fetch();
  }

  public get activeTabIndex(): number {
    return this._activeTabIndex;
  }
  public set activeTabIndex(value: number) {
    this._activeTabIndex = value;
  }

  get imageUrlMap(): Record<string, string> {
    const m = {} as Record<string, string>;
    if (this.data.images) {
      this.data.images.forEach(image => {
        m[image.id] = image.imageUrl;
      });
    }
    return m;
  }

  get fileUrlMap(): Record<string, string> {
    const m = {} as Record<string, string>;
    if (this.data.files) {
      this.data.files.forEach(file => {
        m[file.id] = file.fileUrl;
      });
    }
    return m;
  }

  async fetch() {
    this.isLoading = true;
    const data = (await this.observationService.getObservationSubject(this.id))
      .data;
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
        imageUrl: image.imageUrl,
        thumbnailUrl: image.thumbnail,
      })) || [];

    const selectedIdx = this.data.images?.findIndex(it => it.id === imageId);

    this.galleryViewModel = new GalleryDialogViewModel(images, selectedIdx);
    this.galleryViewModel.open(null);
  }
}
