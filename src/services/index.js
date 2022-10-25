import { aspirationService } from "./aspiration";
import { aspirationCategoriesService } from "./aspirationCategories";
import { authService } from "./auth";

export const WEB_SERVICES = {
  AspirationCategories: aspirationCategoriesService,
  Auth: authService,
  Aspiration: aspirationService,
};
