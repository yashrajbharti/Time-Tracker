/**
 * @typedef TimelogWindow
 * @property {string} id - Unique ID of the time log entry
 * @property {string} employeeId - ID of the employee who logged the time
 * @property {string} projectId - ID of the project
 * @property {string} taskId - ID of the task
 * @property {number} start - Start timestamp in milliseconds
 * @property {number} end - End timestamp in milliseconds
 * @property {number} startTranslated - Copy of start timestamp
 * @property {number} endTranslated - Copy of end timestamp
 * @property {number} duration - Duration of the work session (in milliseconds)
 * @property {string} fingerprint - Device fingerprint ID (optional)
 * @property {string} ipAddress - IP address from which the log was made
 *
 * @property {string} type - Type of log ("manual")
 * @property {string} note - Notes for the log (empty string by default)
 * @property {boolean} billable - Whether the time is billable (default true)
 * @property {boolean} paid - Whether the time is paid (default false)
 * @property {number} billRate - Bill rate (default 0)
 * @property {number} overtimeBillRate - Overtime bill rate (default 0)
 * @property {number} payRate - Pay rate (default 0)
 * @property {number} overtimePayRate - Overtime pay rate (default 0)
 * @property {string} taskStatus - Status of the task (default "in progress")
 * @property {string} taskPriority - Priority of the task (default "low")
 * @property {string} teamId - Team ID (default "0")
 * @property {string} organizationId - Organization ID (default "0")
 * @property {string} sharedSettingsId - Shared settings ID (default "0")
 * @property {string} shiftId - Shift ID (empty string by default)
 * @property {number} timezoneOffset - Timezone offset in milliseconds (default 0)
 * @property {number} deletedScreenshots - Number of deleted screenshots (default 0)
 * @property {number} negativeTime - Negative logged time (default 0)
 * @property {string} createdAt - ISO timestamp when log was created
 * @property {string} updatedAt - ISO timestamp when log was updated
 */

/**
 * @typedef TimelogProjectTime
 * @property {string} id - ID of the employee (same as employeeId)
 * @property {number} time - Total time worked across projects (in milliseconds)
 * @property {number} costs - Cost associated with work (always 0 for now)
 * @property {number} income - Income generated for the work (e.g., $100/hour calculation)
 */
