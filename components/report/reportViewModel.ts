import { action, makeObservable, observable, runInAction } from "mobx";
import { BaseViewModel } from "lib/baseViewModel";
import { IReportService } from "lib/services/report";
import { ReportDetail } from "lib/services/report/report";
import { ICaseService } from "lib/services/case";
import { GalleryDialogViewModel } from "components/widgets/dialogs/galleryDialogViewModel";

export class ReportViewModel extends BaseViewModel {
  data: ReportDetail = {} as ReportDetail;
  id: string;
  galleryViewModel?: GalleryDialogViewModel = undefined;

  constructor(
    id: string,
    readonly reportService: IReportService,
    readonly caseService: ICaseService
  ) {
    super();
    makeObservable(this, {
      data: observable,
      fetch: action,
      promoteToCase: action,
      galleryViewModel: observable,
      openGallery: action,
    });
    this.id = id;
    this.fetch();
  }

  async fetch() {
    this.isLoading = true;
    const data = (await this.reportService.getReport(this.id)).data;
    if (data) {
      runInAction(() => {
        this.data = data;
      });
    }
    this.isLoading = false;
  }

  public async promoteToCase(): Promise<String> {
    this.isLoading = true;
    const result = await this.caseService.promoteToCase(this.id);
    this.isLoading = false;
    return result;
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
