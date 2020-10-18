import { AddPointsToUserProfileHandler } from './handlers/add-points-to-user-profile.handler';
import { UpdateUserProfileHandler } from './handlers/update-user-profile.handler';
import { DeductPointsToUserProfileHandler } from './handlers/deduct-points-to-user-profile.handler';
export const CommandHandlers = [AddPointsToUserProfileHandler, UpdateUserProfileHandler, DeductPointsToUserProfileHandler];