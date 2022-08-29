export type ReportType = {
  id: string;
  name: string;
  definition: string;
  categoryId: number;
  categoryName: string;
  ordering: number;
  stateDefinitionId?: number;
  stateDefinitionName?: string;
  rendererDataTemplate?: string;
  followupDefinition?: string;
  rendererFollowupDataTemplate?: string;
};
