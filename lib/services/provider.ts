import React, { useContext } from "react";
import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { AuthService, IAuthService } from "./auth";
import { AuthorityService, IAuthorityService } from "./authority";
import ProfileService, { IProfileService } from "./profile";
import { InvitationCodeService } from "./invitationCode";
import { IUserService, UserService } from "./user";
import { ReportCategoryService } from "./reportCategory";
import { ReportTypeService } from "./reportType/reportTypeService";
import { ReportService } from "./report";
import { CaseService } from "./case";
import { CaseDefinitionService } from "./caseDefinition";
import { ReporterNotificationService } from "./reporterNotification";
import { StateDefinitionService } from "./stateDefinition";
import { StateStepService } from "./stateStep";
import { StateTransitionService } from "./stateTransition";
import { DashboardService } from "./dashboard/dashboardService";
import { NotificationTemplateService } from "./notificationTemplate";
import { NotificationService } from "./notification";
import { CommentService } from "lib/services/comment/commentService";
import { RegisterService } from "./register/registerService";
import { FollowupService } from "./followup/followupService";
import { ForgotPasswordService } from "./forgotPassword/forgotPasswordService";
import { OutbreakPlanService } from "./outbreakPlan";
import { PlaceService } from "./place";
import { ConfigurationService } from "./configuration";
import { OutbreakService } from "./outbreak/outbreakService";
import { ObservationDefinitionService } from "./observationDefinition/observationDefinitionService";
import { ObservationMonitoringDefinitionService } from "./observationMonitoringDefinition";
import { ObservationService } from "./observation";

export interface IServiceProvider {
  get authService(): IAuthService;
  get profileService(): IProfileService;
  get authorityService(): IAuthorityService;
  get userService(): IUserService;
  get invitationCodeService(): InvitationCodeService;
  get reportCategoryService(): ReportCategoryService;
  get reportTypeService(): ReportTypeService;
  get reportService(): ReportService;
  get reporterNotificationService(): ReporterNotificationService;
  get caseService(): CaseService;
  get caseDefinitionService(): CaseDefinitionService;
  get stateDefinitionService(): StateDefinitionService;
  get stateStepService(): StateStepService;
  get stateTransitionService(): StateTransitionService;
  get dashboardService(): DashboardService;
  get notificationTemplateService(): NotificationTemplateService;
  get notificationService(): NotificationService;
  get commentService(): CommentService;
  get registerService(): RegisterService;
  get forgotPasswordService(): ForgotPasswordService;
  get followupService(): FollowupService;
  get outbreakPlanService(): OutbreakPlanService;
  get placeService(): PlaceService;
  get configurationService(): ConfigurationService;
  get outbreakService(): OutbreakService;
  get observationDefinitionService(): ObservationDefinitionService;
  get observationMonitoringDefinitionService(): ObservationMonitoringDefinitionService;
  get observationService(): ObservationService;
}

export class ServicesProvider implements IServiceProvider {
  client: ApolloClient<NormalizedCacheObject>;

  authService: AuthService;
  profileService: ProfileService;
  authorityService: AuthorityService;
  userService: UserService;
  invitationCodeService: InvitationCodeService;
  reportCategoryService: ReportCategoryService;
  reportTypeService: ReportTypeService;
  reporterNotificationService: ReporterNotificationService;
  reportService: ReportService;
  caseService: CaseService;
  caseDefinitionService: CaseDefinitionService;
  stateDefinitionService: StateDefinitionService;
  stateStepService: StateStepService;
  stateTransitionService: StateTransitionService;
  dashboardService: DashboardService;
  notificationTemplateService: NotificationTemplateService;
  notificationService: NotificationService;
  commentService: CommentService;
  registerService: RegisterService;
  forgotPasswordService: ForgotPasswordService;
  followupService: FollowupService;
  outbreakPlanService: OutbreakPlanService;
  placeService: PlaceService;
  configurationService: ConfigurationService;
  outbreakService: OutbreakService;
  observationDefinitionService: ObservationDefinitionService;
  observationMonitoringDefinitionService: ObservationMonitoringDefinitionService;
  observationService: ObservationService;

  constructor(client: ApolloClient<NormalizedCacheObject>) {
    this.client = client;
    this.authService = new AuthService(client);
    this.profileService = new ProfileService(client);
    this.authorityService = new AuthorityService(client);
    this.userService = new UserService(client);
    this.invitationCodeService = new InvitationCodeService(client);
    this.reportCategoryService = new ReportCategoryService(client);
    this.reportTypeService = new ReportTypeService(client);
    this.reportService = new ReportService(client);
    this.reporterNotificationService = new ReporterNotificationService(client);
    this.caseService = new CaseService(client);
    this.caseDefinitionService = new CaseDefinitionService(client);
    this.stateDefinitionService = new StateDefinitionService(client);
    this.stateStepService = new StateStepService(client);
    this.stateTransitionService = new StateTransitionService(client);
    this.dashboardService = new DashboardService(client);
    this.notificationTemplateService = new NotificationTemplateService(client);
    this.notificationService = new NotificationService(client);
    this.commentService = new CommentService(client);
    this.registerService = new RegisterService(client);
    this.forgotPasswordService = new ForgotPasswordService(client);
    this.followupService = new FollowupService(client);
    this.outbreakPlanService = new OutbreakPlanService(client);
    this.placeService = new PlaceService(client);
    this.configurationService = new ConfigurationService(client);
    this.outbreakService = new OutbreakService(client);
    this.observationDefinitionService = new ObservationDefinitionService(
      client
    );
    this.observationMonitoringDefinitionService =
      new ObservationMonitoringDefinitionService(client);
    this.observationDefinitionService = new ObservationDefinitionService(
      client
    );
    this.observationService = new ObservationService(client);
  }
}

export const ServicesContext = React.createContext<
  ServicesProvider | undefined
>(undefined);

const useServices = (): IServiceProvider => {
  const currentServices = useContext(ServicesContext);
  if (!currentServices) {
    throw new Error("useServices must be used within ServiceContextProvider");
  }

  return currentServices;
};

export default useServices;
