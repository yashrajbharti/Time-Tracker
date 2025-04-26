/**
 * @typedef Task
 * @property {string} id - Unique task ID
 * @property {string} name - Name of the task
 * @property {string} description - Description of the task
 * @property {string[]} employees - Array of employee IDs assigned to this task
 * @property {string} projectId - ID of the project this task belongs to
 * @property {string} status - Status of the task (default "To Do")
 * @property {string} priority - Priority of the task (default "low")
 * @property {boolean} billable - Whether the task is billable (default true)
 * @property {string} creatorId - ID of the task creator (hardcoded "0")
 * @property {string} organizationId - Organization ID (hardcoded "0")
 * @property {string[]} teams - List of team IDs (default ["0"])
 * @property {object} payroll - Payroll information
 * @property {string} payroll.billRate - Bill rate (default empty string)
 * @property {string} payroll.overtimeBillRate - Overtime bill rate (default empty string)
 * @property {number} createdAt - Timestamp when the task was created
 */
