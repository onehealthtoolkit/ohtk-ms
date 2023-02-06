import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { BaseViewModel } from "lib/baseViewModel";
import { ICaseService } from "lib/services/case";
import { CaseDetail } from "lib/services/case/case";
import { CaseStateViewViewModel } from "components/case/caseState/viewViewModel";
import { Me } from "lib/services/profile/me";
import { FetchPolicy } from "@apollo/client";
import { GalleryDialogViewModel } from "components/widgets/dialogs/galleryDialogViewModel";
import { ICommentService } from "lib/services/comment/commentService";
import { ReportMapDialogViewModel } from "components/case/reportMapDialogViewModel";
import { IOutbreakService } from "lib/services/outbreak/outbreakService";
import { OutbreakPlace } from "lib/services/outbreak/outbreak";

export type OutbreakZone = {
  color: string;
  radius: number;
};

export class CaseViewModel extends BaseViewModel {
  data: CaseDetail = {} as CaseDetail;
  id: string;
  _activeTabIndex: number = 0;
  stateViewViewModel: CaseStateViewViewModel;
  galleryViewModel?: GalleryDialogViewModel = undefined;
  reportMapViewModel?: ReportMapDialogViewModel = undefined;
  outbreakPlaces: OutbreakPlace[] = [];

  constructor(
    id: string,
    readonly me: Me,
    readonly caseService: ICaseService,
    readonly commentService: ICommentService,
    readonly outbreakService: IOutbreakService
  ) {
    super();
    makeObservable(this, {
      data: observable,
      outbreakInfo: computed,
      fetch: action,
      _activeTabIndex: observable,
      activeTabIndex: computed,
      galleryViewModel: observable,
      openGallery: action,
      reportMapViewModel: observable,
      openReportMap: action,
      outbreakPlaces: observable,
    });
    this.id = id;
    this.stateViewViewModel = observable(
      new CaseStateViewViewModel(me, caseService, commentService)
    );
    this.fetch();
  }

  public get activeTabIndex(): number {
    return this._activeTabIndex;
  }
  public set activeTabIndex(value: number) {
    this._activeTabIndex = value;
  }

  get reportId() {
    return this.data.reportId ? String(this.data.reportId) : "";
  }

  async fetch(policy?: FetchPolicy) {
    this.isLoading = true;
    const data = (await this.caseService.getCase(this.id, policy)).data;
    if (data) {
      runInAction(() => {
        this.data = data;
        if (data.stateDefinition && data.states) {
          this.stateViewViewModel?.init(
            data.id,
            data.stateDefinition,
            data.states,
            data.threadId
          );
        }
      });

      this.fetchOutbreakPlaces();
    }
    this.isLoading = false;
  }

  async fetchOutbreakPlaces() {
    if (this.data.outbreakInfo) {
      const result = await this.outbreakService.fecthOutbreakPlaces(
        this.data.id
      );
      if (result.items) {
        this.outbreakPlaces = result.items;
      }
    }
  }

  get outbreakInfo(): OutbreakZone[] | undefined {
    let zones: OutbreakZone[] | undefined;
    if (this.data.outbreakInfo) {
      try {
        zones = JSON.parse(this.data.outbreakInfo).zones;
      } catch (_) {
        console.log("Error parsing outbreak plan info");
      }
    }
    return zones;
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
