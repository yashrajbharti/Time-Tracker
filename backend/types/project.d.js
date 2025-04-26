/**
 * @typedef Project
 * @property {string} id - Unique project ID
 * @property {string} name - Project name
 * @property {string} description - Project description
 * @property {string[]} employees - Array of assigned employee IDs
 * @property {string[]} statuses - List of task statuses (default ["To do", "On hold", "In progress", "Done"])
 * @property {string[]} priorities - List of task priorities (default ["low", "medium", "high"])
 * @property {boolean} billable - Whether the project is billable (default true)
 * @property {boolean} archived - Whether the project is archived (default false)
 * @property {string} deadline - Deadline for the project (empty string by default)
 * @property {string} organizationId - Organization ID (hardcoded "0")
 * @property {string} creatorId - Creator ID (hardcoded "0")
 * @property {string[]} teams - Teams assigned to the project (default empty array)
 * @property {object} payroll - Payroll information
 * @property {string} payroll.billRate - Bill rate (default empty string)
 * @property {string} payroll.overtimeBillrate - Overtime bill rate (default empty string)
 * @property {number} createdAt - Timestamp when the project was created
 */
