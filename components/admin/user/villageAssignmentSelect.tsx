import { Checkbox, Select } from "components/widgets/forms";
import { AccountsVillageReporterAssignmentCensusRoleChoices } from "lib/generated/graphql";
import { IVillageService, Village } from "lib/services/village";
import { Observer, observer } from "mobx-react";
import { useEffect, useState } from "react";
import { UserViewModel } from "./userViewModel";

const VillageAssignmentSelect = ({
  viewModel,
  villageService,
}: {
  viewModel: UserViewModel;
  villageService: IVillageService;
}) => {
  const [villages, setVillages] = useState<Village[]>([]);
  const authorityId = viewModel.authorityId;

  useEffect(() => {
    let active = true;
    if (!authorityId) {
      setVillages([]);
      return () => {
        active = false;
      };
    }
    villageService.fetchVillages(200, 0, "", true).then(result => {
      if (active) {
        setVillages(result.items || []);
      }
    });
    return () => {
      active = false;
    };
  }, [villageService, authorityId]);

  return (
    <Observer>
      {() => (
        <div className="max-h-72 overflow-y-auto border rounded px-3 py-2">
          {villages.map(village => {
            const villageId = parseInt(village.id);
            const assignment = viewModel.villageAssignments.find(
              item => item.villageId === villageId
            );
            return (
              <div
                key={village.id}
                className="grid grid-cols-[minmax(0,1fr)_10rem] gap-3 items-start border-b border-gray-100 last:border-b-0 py-2"
              >
                <Checkbox
                  id={`village-assignment-${village.id}`}
                  name="villageAssignments"
                  value={village.id}
                  label={`${village.code} - ${village.name}`}
                  checked={Boolean(assignment)}
                  disabled={viewModel.isSubmitting}
                  onChange={evt =>
                    viewModel.toggleVillageAssignment(
                      {
                        villageId,
                        id: assignment?.id,
                        code: village.code,
                        name: village.name,
                        active: village.active,
                      },
                      evt.target.checked
                    )
                  }
                />
                <Select
                  aria-label={`${village.code} census role`}
                  disabled={!assignment || viewModel.isSubmitting}
                  value={
                    assignment?.censusRole ||
                    AccountsVillageReporterAssignmentCensusRoleChoices.Off
                  }
                  onChange={evt =>
                    viewModel.setVillageAssignmentRole(
                      villageId,
                      evt.target
                        .value as AccountsVillageReporterAssignmentCensusRoleChoices
                    )
                  }
                >
                  <option
                    value={
                      AccountsVillageReporterAssignmentCensusRoleChoices.Off
                    }
                  >
                    Official
                  </option>
                  <option
                    value={
                      AccountsVillageReporterAssignmentCensusRoleChoices.Vol
                    }
                  >
                    Volunteer
                  </option>
                </Select>
              </div>
            );
          })}
          {!authorityId && (
            <div className="text-sm text-gray-500 py-2">
              Select authority first
            </div>
          )}
          {authorityId > 0 && !villages.length && (
            <div className="text-sm text-gray-500 py-2">
              No villages found for selected authority
            </div>
          )}
        </div>
      )}
    </Observer>
  );
};

export default observer(VillageAssignmentSelect);
