import {
  AbstractDefinitionViewModel,
  Definition,
} from "components/admin/formBuilder/shared";
import { action, makeObservable, observable } from "mobx";

export class FilesFieldViewModel extends AbstractDefinitionViewModel {
  minValue?: string = "";
  maxValue?: string = "";
  maxFileSize = (5 * 1024 * 1024).toString(); // 5MB per file
  allowAudioFiles = true;
  allowVideoFiles = false;
  allowDocumentFiles = false;

  audioTypes = [
    "audio/mid",
    "audio/mpeg",
    "audio/mp4",
    "audio/m4a",
    "audio/ogg",
    "audio/webm",
    "audio/wav",
    "audio/x-wav",
    "audio/x-m4a",
    "audio/x-ms-wma",
  ];
  videoTypes = [
    "video/mpeg",
    "video/x-mpeg",
    "video/mp4",
    "video/ogg",
    "video/webm",
    "video/quicktime",
    "video/x-quicktime",
    "video/avi",
    "video/x-m4v",
    "video/x-ms-wmv",
    "video/x-ms-asf",
    "video/msvideo",
    "video/x-msvideo",
  ];
  documentTypes = [
    "text/plain",
    "application/rtf",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/excel",
    "application/vnd.ms-excel",
    "application/x-excel",
    "application/x-msexcel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/powerpoint",
    "application/mspowerpoint",
    "application/x-mspowerpoint",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "application/vnd.oasis.opendocument.text",
    "application/vnd.oasis.opendocument.presentation",
    "application/vnd.oasis.opendocument.spreadsheet",
  ];

  constructor() {
    super();
    makeObservable(this, {
      minValue: observable,
      maxValue: observable,
      maxFileSize: observable,
      allowAudioFiles: observable,
      allowVideoFiles: observable,
      allowDocumentFiles: observable,
      setMinValue: action,
      setMaxValue: action,
      setMaxFileSize: action,
    });
  }

  setMinValue(value: string) {
    this.minValue = value || "";
  }

  setMaxValue(value: string) {
    this.maxValue = value || "";
  }

  setMaxFileSize(value: string) {
    this.maxFileSize = value || "";
  }

  setAllowAudioFiles(value: boolean) {
    this.allowAudioFiles = value;
  }

  setAllowVideoFiles(value: boolean) {
    this.allowVideoFiles = value;
  }

  setAllowDocumentFiles(value: boolean) {
    this.allowDocumentFiles = value;
  }

  parse(definition: Definition) {
    if (definition.min !== undefined) {
      this.minValue = String(definition.min);
    } else {
      this.minValue = "";
    }
    if (definition.max !== undefined) {
      this.maxValue = String(definition.max);
    } else {
      this.maxValue = "";
    }
    if (definition.maxSize !== undefined) {
      this.maxFileSize = String(definition.maxSize);
    } else {
      this.maxFileSize = "";
    }
    if (definition.audio !== undefined) {
      this.allowAudioFiles = Boolean(definition.audio);
    } else {
      this.allowAudioFiles = false;
    }
    if (definition.video !== undefined) {
      this.allowVideoFiles = Boolean(definition.video);
    } else {
      this.allowVideoFiles = false;
    }
    if (definition.document !== undefined) {
      this.allowDocumentFiles = Boolean(definition.document);
    } else {
      this.allowDocumentFiles = false;
    }
  }

  toJson() {
    const json: Definition = {};
    const minNum = parseInt(this.minValue || "");
    if (minNum >= 0) {
      json.min = minNum;
    }
    const maxNum = parseInt(this.maxValue || "");
    if (maxNum >= 0) {
      json.max = maxNum;
    }
    const maxFileSize = parseInt(this.maxFileSize || "");
    if (maxFileSize >= 0) {
      json.maxSize = maxFileSize;
    }
    json.audio = this.allowAudioFiles || false;
    json.video = this.allowVideoFiles || false;
    json.document = this.allowDocumentFiles || false;

    let supportedFiles = Array<string>();
    if (this.allowAudioFiles) {
      supportedFiles = supportedFiles.concat(...this.audioTypes);
    }
    if (this.allowVideoFiles) {
      supportedFiles = supportedFiles.concat(...this.videoTypes);
    }
    if (this.allowDocumentFiles) {
      supportedFiles = supportedFiles.concat(...this.documentTypes);
    }
    json.supports = supportedFiles;
    return json;
  }
}
