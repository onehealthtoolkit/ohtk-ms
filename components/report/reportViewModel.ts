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
import { ReportMapDialogViewModel } from "components/case/reportMapDialogViewModel";
import { OutbreakPlace } from "lib/services/outbreak/outbreak";
import { IOutbreakService } from "lib/services/outbreak/outbreakService";
import { OutbreakZone } from "components/case/caseViewModel";
import { CaseDetail } from "lib/services/case/case";
import { FetchPolicy } from "@apollo/client";

export class ReportViewModel extends BaseViewModel {
  data: ReportDetail = {} as ReportDetail;
  caseData: CaseDetail = {} as CaseDetail;
  id: string;
  galleryViewModel?: GalleryDialogViewModel = undefined;

  _activeTabIndex: number = 0;
  _converting: boolean = false;
  reportMapViewModel?: ReportMapDialogViewModel = undefined;
  outbreakPlaces: OutbreakPlace[] = [];

  constructor(
    id: string,
    readonly reportService: IReportService,
    readonly caseService: ICaseService,
    readonly outbreakService: IOutbreakService
  ) {
    super();
    makeObservable(this, {
      data: observable,
      caseData: observable,
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
      imageUrlMap: computed,
      fileUrlMap: computed,
      reportMapViewModel: observable,
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
    const data = (await this.reportService.getReport(this.id)).data;
    if (data) {
      runInAction(() => {
        this.data = data;
      });
      if (data.caseId) {
        this.fetchCase(data.caseId);
      }
    }
    this.isLoading = false;
  }

  async fetchCase(caseId: string, policy?: FetchPolicy) {
    this.isLoading = true;
    const data = (await this.caseService.getCase(caseId, policy)).data;
    if (data) {
      runInAction(() => {
        this.caseData = data;
      });

      this.fetchOutbreakPlaces();
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
    return this.data.testFlag == false;
  }

  get shouldDisplayPromoteToCase() {
    return !this.data.caseId && this.data.testFlag == false;
  }

  async fetchOutbreakPlaces() {
    if (this.caseData.outbreakInfo) {
      const result = await this.outbreakService.fecthOutbreakPlaces(
        this.caseData.id
      );
      if (result.items) {
        this.outbreakPlaces = result.items;
      }
    }
  }

  get outbreakInfo(): OutbreakZone[] | undefined {
    let zones: OutbreakZone[] | undefined;
    if (this.caseData.outbreakInfo) {
      try {
        zones = JSON.parse(this.caseData.outbreakInfo).zones;
      } catch (_) {
        console.log("Error parsing outbreak plan info");
      }
    }
    return zones;
  }

  openReportMap(caseId: string) {
    console.log(caseId);
    this.reportMapViewModel = new ReportMapDialogViewModel(
      this.outbreakService,
      caseId,
      this.outbreakPlaces
    );
    this.reportMapViewModel.open(null);
  }
}
