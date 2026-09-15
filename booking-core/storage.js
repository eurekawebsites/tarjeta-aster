export function createBookingStorage(business) {
  const key = `eureka-booking:${business.id}:requests`

  function read() {
    try {
      const value = JSON.parse(localStorage.getItem(key) || '[]')
      return Array.isArray(value) ? value : []
    } catch {
      return []
    }
  }

  return {
    mode: 'demo-local',
    async listRequests() { return read() },
    async saveRequest(request) {
      const rows = read()
      rows.unshift(request)
      localStorage.setItem(key, JSON.stringify(rows.slice(0, 100)))
      return request
    },
    async clearRequests() { localStorage.removeItem(key) }
  }
}

/*
Production boundary:
Create a Firestore-backed adapter with the same listRequests/saveRequest API,
plus authenticated admin operations and server-side slot collision protection.
Do not put Firebase credentials or paid messaging providers into this public demo.
*/
