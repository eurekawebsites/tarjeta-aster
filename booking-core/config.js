export const BUSINESS = {
  id: 'clinica-demo-roma',
  name: 'Clínica Demo Roma',
  descriptor: 'Medicina estética y bienestar',
  locale: 'es-MX',
  timezone: 'America/Mexico_City',
  currency: 'MXN',
  accent: '#17501e',
  whatsappNumber: '525500000000',
  contactEmail: 'citas@example.com',
  confirmationMode: 'request',
  leadTimeHours: 2,
  bookingWindowDays: 14,
  slotIntervalMinutes: 30,
  locations: [
    { id: 'roma', name: 'Roma Norte', address: 'Roma Norte, Ciudad de México' },
    { id: 'condesa', name: 'Condesa', address: 'Condesa, Ciudad de México' }
  ],
  services: [
    { id: 'valoracion', name: 'Valoración inicial', duration: 30, priceLabel: 'Sin costo', locations: ['roma','condesa'] },
    { id: 'facial', name: 'Facial personalizado', duration: 60, priceLabel: 'Desde $1,200 MXN', locations: ['roma','condesa'] },
    { id: 'botox', name: 'Toxina botulínica', duration: 45, priceLabel: 'Desde $5,500 MXN', locations: ['roma'] },
    { id: 'bioestimulador', name: 'Bioestimulador', duration: 60, priceLabel: 'Desde $8,500 MXN', locations: ['roma'] }
  ],
  providers: [
    { id: 'any', name: 'Cualquier especialista', services: ['valoracion','facial','botox','bioestimulador'], locations: ['roma','condesa'] },
    { id: 'dra-demo', name: 'Dra. Demo', services: ['valoracion','botox','bioestimulador'], locations: ['roma'] },
    { id: 'terapeuta-demo', name: 'Terapeuta Demo', services: ['facial'], locations: ['roma','condesa'] }
  ],
  hours: {
    0: null,
    1: ['10:00','19:00'],
    2: ['10:00','19:00'],
    3: ['10:00','19:00'],
    4: ['10:00','19:00'],
    5: ['10:00','19:00'],
    6: ['10:00','15:00']
  },
  blockedDates: []
}
