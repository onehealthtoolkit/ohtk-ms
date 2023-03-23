import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { BaseViewModel } from "lib/baseViewModel";
import { IReportService } from "lib/services/report";
import { ReportDetail } from "lib/services/report/report";
import { ICaseService } from "lib/services/case";
import { GalleryDialogViewModel } from "components/widgets/dialogs/galleryDialogViewModel";

export class ReportViewModel extends BaseViewModel {
  data: ReportDetail = {} as ReportDetail;
  id: string;
  galleryViewModel?: GalleryDialogViewModel = undefined;

  _activeTabIndex: number = 0;
  _converting: boolean = false;

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
      _activeTabIndex: observable,
      activeTabIndex: computed,
      _converting: observable,
      converting: computed,
      shouldDisplayActions: computed,
      shouldDisplayConvertToTestReport: computed,
      shouldDisplayPromoteToCase: computed,
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

  public get converting(): boolean {
    return this._converting;
  }
  public set converting(value: boolean) {
    this._converting = value;
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

  public async convertToTestReport(): Promise<String> {
    this.converting = true;
    const result = await this.reportService.convertToTestReport(this.id);
    if (result) this.data.testFlag = true;
    this.converting = false;
    return result;
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

  get shouldDisplayActions() {
    return (
      this.shouldDisplayConvertToTestReport || this.shouldDisplayPromoteToCase
    );
  }

  get shouldDisplayConvertToTestReport() {
    return this.data.testFlag == false && this.data.caseId == null;
  }

  get shouldDisplayPromoteToCase() {
    return !this.data.caseId && this.data.testFlag == false;
  }
}
