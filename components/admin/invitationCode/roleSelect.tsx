import { Select } from "components/widgets/forms";
import { observer } from "mobx-react-lite";
import React from "react";
import { InvitationCodeViewModel } from "./invitationCodeViewModel";

type RoleSelectProps = {
  viewModel: InvitationCodeViewModel;
};
const RoleSelect: React.FC<RoleSelectProps> = ({ viewModel }) => {
  return (
    <Select
      id="role"
      onChange={evt => {
        viewModel.role = evt.target.value;
      }}
      disabled={viewModel.isSubmitting}
      defaultValue="REP"
      value={viewModel.role}
    >
      <option value="REP">Reporter</option>
      <option value="OFC">Officer</option>
    </Select>
  );
};

export default observer(RoleSelect);
