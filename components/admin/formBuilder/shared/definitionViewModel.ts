import { Definition } from "components/admin/formBuilder/shared/interfaces";

/**
 * Definiton to be parsed to viewModel and serialized to json object
 */
export abstract class AbstractDefinitionViewModel {
  constructor() {}

  public abstract parse(definition: Definition): void;

  public abstract toJson(): Definition;
}
