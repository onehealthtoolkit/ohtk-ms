import { BaseFormViewModel } from "lib/baseFormViewModel";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { INotificationService, Notification } from "lib/services/notification";
import { IReportTypeService } from "lib/services/reportType";

type NotificationData = {
  reportTypeId: string;
  reportTypeName: string;
  notifications: Notification[];
};
export class NotificationViewModel extends BaseFormViewModel {
  notificationService: INotificationService;

  _data: Notification[] = [];
  _activeTabIndex: number = 0;
  _reportTypeId: string = "";
  _reportTypeName: string = "";
  _isDataLoding: boolean = false;

  constructor(
    notificationService: INotificationService,
    readonly reportTypeService: IReportTypeService
  ) {
    super();
    makeObservable(this, {
      _data: observable,
      data: computed,
      _activeTabIndex: observable,
      activeTabIndex: computed,
      _reportTypeId: observable,
      reportTypeId: computed,
      _reportTypeName: observable,
      reportTypeName: computed,
      _isDataLoding: observable,
      isDataLoding: computed,
      save: action,
      setValue: action,
      validate: action,
      delete: action,
      fetch: action,
    });
    this.notificationService = notificationService;
  }

  public get data(): Notification[] {
    return this._data;
  }
  public set data(value: Notification[]) {
    this._data = value;
  }

  public get activeTabIndex(): number {
    return this._activeTabIndex;
  }
  public set activeTabIndex(value: number) {
    this._activeTabIndex = value;
  }

  public get reportTypeId(): string {
    return this._reportTypeId;
  }
  public set reportTypeId(value: string) {
    this._reportTypeId = value;
  }

  public get reportTypeName(): string {
    return this._reportTypeName;
  }
  public set reportTypeName(value: string) {
    this._reportTypeName = value;
  }

  public get isDataLoding(): boolean {
    return this._isDataLoding;
  }
  public set isDataLoding(value: boolean) {
    this._isDataLoding = value;
  }

  setValue(item: Notification, value: string) {
    item.to = value;
  }

  async fetch(): Promise<void> {
    this.isDataLoding = true;
    if (this.reportTypeId) {
      const result = await this.notificationService.fetchNotifications(
        this.reportTypeId
      );
      runInAction(() => {
        this.data = result || [];
      });
    }

    this.isDataLoding = false;
  }

  public async save(item: Notification): Promise<boolean> {
    this.isSubmitting = true;
    item.submitError = "";
    item.fieldErrors = {};

    if (this.validate(item)) {
      var result = await this.notificationService.upsertAuthorityNotification(
        this.reportTypeId,
        item.notificationTemplateId,
        item.to!
      );
      runInAction(() => {
        if (!result.success) {
          if (result.message) {
            item.submitError = result.message;
          }
          if (result.fields) {
            item.fieldErrors = result.fields;
          }
        } else {
          item.notificationId = result.data!.id;
        }
      });
      return result.success;
    }
    this.isSubmitting = false;
    return false;
  }

  validate(item: Notification): boolean {
    let isValid = true;
    if (!item.to) {
      isValid = false;
      item.fieldErrors = { to: "this field is required" };
    }

    return isValid;
  }

  async delete(item: Notification): Promise<void> {
    const result = await this.notificationService.deleteAuthorityNotification(
      String(item.notificationId),
      this.reportTypeId
    );
    if (result.error) {
      item.submitError = result.error;
    } else {
      item.notificationId = undefined;
      item.to = undefined;
    }
  }

  async exportNotification() {
    this.isLoading = true;
    const data = await this.notificationService.fetchNotifications(
      this.reportTypeId
    );
    if (data) {
      var element = document.createElement("a");
      element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," +
          encodeURIComponent(
            JSON.stringify(
              {
                reportTypeId: this.reportTypeId,
                reportTypeName: this._reportTypeName,
                notifications: data,
              } as NotificationData,
              null,
              2
            )
          )
      );
      element.setAttribute(
        "download",
        `notification-${this._reportTypeName}.json`
      );
      element.style.display = "none";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
    this.isLoading = false;
  }

  public async importNotification(file: File): Promise<boolean> {
    this.isSubmitting = true;
    this.submitError = "";
    const data = (await this.readAsync(file)) as NotificationData;
    var reportType;
    if (data.reportTypeId) {
      reportType = await (
        await this.reportTypeService.getReportType(data.reportTypeId)
      ).data;
    }

    if (!reportType && data.reportTypeName) {
      reportType = await this.reportTypeService.findByName(data.reportTypeName);
    }
    if (!reportType) {
      this.submitError = `Import errors : report type ${data.reportTypeName} not found.`;
      this.isSubmitting = false;
      return false;
    }

    var errors: string[] = [];
    var result;
    for (var item of data.notifications) {
      if (item.to) {
        result = await this.notificationService.upsertAuthorityNotification(
          reportType.id,
          item.notificationTemplateId,
          item.to
        );
        if (!result.success) {
          if (result.message) {
            errors.push(result.message);
          }
          if (result.fields) {
            const msg = Object.values(result.fields).join(",");
            if (msg) errors.push(msg);
          }
        }
      }
    }

    this.isSubmitting = false;

    return errors.length == 0;
  }

  readAsync(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(JSON.parse(reader.result as string));
      };
      reader.onerror = () => {
        reject(new Error("Unable to read.."));
      };
      reader.readAsText(file);
    });
  }
}
