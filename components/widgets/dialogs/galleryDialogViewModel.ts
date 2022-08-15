import { ModalDialogViewModel } from "lib/dialogViewModel";
import { action, computed, makeObservable, observable } from "mobx";

type GalleryImage = { imageUrl: string; thumbnailUrl: string };

export class GalleryDialogViewModel extends ModalDialogViewModel {
  images = Array<GalleryImage>();
  _currentIndex = 0;

  constructor(images: Array<GalleryImage>, index?: number) {
    super();
    makeObservable(this, {
      images: observable,
      _currentIndex: observable,
      currentImage: computed,
      next: action,
      previous: action,
      select: action,
      couldGoToPreviousImage: computed,
      couldGoToNextImage: computed,
      hasMultipleItems: computed,
    });
    this.images = this.images.concat(...images);
    if (index) {
      this._currentIndex = index;
    }
  }

  get currentImage(): GalleryImage | undefined {
    return this.images[this._currentIndex];
  }

  get couldGoToPreviousImage(): boolean {
    return this._currentIndex > 0;
  }

  get couldGoToNextImage(): boolean {
    return this._currentIndex < this.images.length - 1;
  }

  get hasMultipleItems(): boolean {
    return this.images.length > 1;
  }

  next() {
    if (this.couldGoToNextImage) {
      this._currentIndex++;
    } else {
      this._currentIndex = 0;
    }
  }

  previous() {
    if (this.couldGoToPreviousImage) {
      this._currentIndex--;
    } else {
      this._currentIndex = this.images.length - 1;
    }
  }

  select(idx: number) {
    this._currentIndex = idx;
  }
}
