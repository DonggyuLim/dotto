type severity = 'error' | 'success' | 'warning'

interface alertType {
  message: string
  id: string
  alertType: severity
}

export default alertType
