/**
 * @typedef Screenshot
 * @property {string} id - Unique screenshot ID
 * @property {string} type - Screenshot type ("scheduled")
 * @property {string} employeeId - ID of the employee who took the screenshot
 * @property {string} projectId - ID of the project
 * @property {string} taskId - ID of the task (optional)
 * @property {string} link - URL to the screenshot image
 * @property {number} timestamp - Original timestamp (ms)
 * @property {number} timestampTranslated - Same as timestamp
 * @property {boolean} permissionGranted - Whether screen capture permission was granted
 * @property {string} fingerprint - FingerprintJS ID or device identifier (optional)
 * @property {string} ipAddress - IP address from where screenshot was uploaded
 *
 * @property {string[]} gateways - Hardcoded, default ["b0:ac:d2:54:71:6a"]
 * @property {number} timezoneOffset - Hardcoded 0
 * @property {string} app - Application name (e.g., "Google Chrome")
 * @property {string} appFileName - Application filename (e.g., "chrome.exe")
 * @property {string} appFilePath - Application path (e.g., "/usr/bin/google-chrome")
 * @property {string} title - Window title when screenshot was taken
 * @property {string} url - URL being accessed during screenshot
 * @property {string} document - (Empty string)
 * @property {string} windowId - Random generated ID
 * @property {string} shiftId - (Empty string)
 * @property {string} taskStatus - Hardcoded "in progress"
 * @property {string} taskPriority - Hardcoded "low"
 * @property {string} user - Username or mock name
 * @property {string} name - Full name of employee
 * @property {string} computer - Computer/device name
 * @property {string} domain - (Empty string)
 * @property {string} hwid - Hardware ID (mock value)
 * @property {string} os - Operating system ("web")
 * @property {string} osVersion - OS version ("1.0")
 * @property {boolean} processed - Hardcoded false
 * @property {string} createdAt - ISO timestamp when record created
 * @property {string} updatedAt - ISO timestamp when record updated
 * @property {string} teamId - Hardcoded "0"
 * @property {string} sharedSettingsId - Hardcoded "0"
 * @property {string} organizationId - Hardcoded "0"
 * @property {string} appId - Mock app ID ("mockapp")
 * @property {string} appLabelId - Mock app label ID ("mocklabel")
 * @property {string} categoryId - (Empty string)
 * @property {string} categoryLabelId - (Empty string)
 * @property {number} productivity - Hardcoded 1
 * @property {string} site - Website domain (e.g., "app.mercor.com")
 * @property {string} _index - Static/fake elasticsearch index name
 */
