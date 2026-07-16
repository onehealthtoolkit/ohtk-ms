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
  published?: boolean;
  isFollowable?: boolean;
  /** JSON string of metric accumulation config (ReportType.metric_accumulation). */
  metricAccumulation?: string;
};

export type SimulationReportType = {
  rendererData: string;
  reporterNotifications: Array<{ id: string; name: string }>;
  caseDefinitions: Array<{ id: string; description: string }>;
};
