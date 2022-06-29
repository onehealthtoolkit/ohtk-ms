import { BaseViewModel } from "components/admin/formBuilder/shared/baseViewModel";
import { action, computed, makeObservable } from "mobx";

type MovableItem = {
  id: string;
};

export abstract class MovableItemsViewModel<
  VM extends MovableItem
> extends BaseViewModel {
  constructor(id: string, label: string) {
    super(id, label);

    makeObservable(this, {
      movableItems: computed,
      moveItemUp: action,
      moveItemDown: action,
    });
  }

  abstract get movableItems(): VM[];

  moveItemUp(itemId: string) {
    this.moveItem(itemId, -1);
  }

  moveItemDown(itemId: string) {
    this.moveItem(itemId, 1);
  }

  private moveItem(itemId: string, step: number) {
    const index = this.movableItems.findIndex(item => item.id === itemId);
    if (index > -1) {
      const newIndex = index + step;
      if (newIndex >= 0 && newIndex < this.movableItems.length) {
        const movedItem = this.movableItems.splice(index, 1)[0];
        this.movableItems.splice(newIndex, 0, movedItem);
      }
    }
  }
}
