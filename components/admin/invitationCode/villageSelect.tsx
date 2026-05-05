import { Checkbox } from "components/widgets/forms";
import { IVillageService, Village } from "lib/services/village";
import { Observer } from "mobx-react";
import { useEffect, useState } from "react";
import { InvitationCodeViewModel } from "./invitationCodeViewModel";

const VillageSelect = ({
  viewModel,
  villageService,
}: {
  viewModel: InvitationCodeViewModel;
  villageService: IVillageService;
}) => {
  const [villages, setVillages] = useState<Village[]>([]);

  useEffect(() => {
    let active = true;
    villageService.fetchVillages(200, 0, "", true).then(result => {
      if (active) {
        setVillages(result.items || []);
      }
    });
    return () => {
      active = false;
    };
  }, [villageService]);

  return (
    <Observer>
      {() => (
        <div className="max-h-56 overflow-y-auto border rounded px-3 py-2">
          {villages.map(village => (
            <Checkbox
              key={village.id}
              id={`village-${village.id}`}
              name="villages"
              value={village.id}
              label={`${village.code} - ${village.name}`}
              checked={viewModel.villageIds.includes(parseInt(village.id))}
              disabled={viewModel.isSubmitting}
              onChange={evt =>
                viewModel.toggleVillage(
                  parseInt(village.id),
                  evt.target.checked
                )
              }
            />
          ))}
          {!villages.length && (
            <div className="text-sm text-gray-500 py-2">No villages found</div>
          )}
        </div>
      )}
    </Observer>
  );
};

export default VillageSelect;
