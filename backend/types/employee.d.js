/**
 * @typedef Employee
 * @property {string} id - Unique employee ID
 * @property {string} name - Full name of the employee
 * @property {string} email - Email address of the employee
 * @property {string} teamId - ID of the team the employee belongs to (hardcoded "0")
 * @property {string} sharedSettingsId - Shared settings ID (hardcoded "0")
 * @property {string} accountId - Unique account ID (separate from employee ID)
 * @property {string} identifier - Identifier, same as email
 * @property {string} type - Type of account (e.g., "personal")
 * @property {string} organizationId - Organization ID (hardcoded "0")
 * @property {string[]} projects - Array of project IDs the employee is part of
 * @property {number} deactivated - Timestamp if deactivated, 0 if active
 * @property {number} invited - 0 if verified, otherwise timestamp of invitation
 * @property {number} createdAt - Timestamp when the employee was created
 */
