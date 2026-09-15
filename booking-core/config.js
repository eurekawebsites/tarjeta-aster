const TENANTS = {
  'clinica-demo-roma': {
    id: 'clinica-demo-roma',
    name: 'Clínica Demo Roma',
    descriptor: 'Medicina estética y bienestar',
    locale: 'es-MX', timezone: 'America/Mexico_City', currency: 'MXN', accent: '#17501e',
    whatsappNumber: '525500000000', contactEmail: 'citas@example.com', confirmationMode: 'request',
    leadTimeHours: 2, bookingWindowDays: 14, slotIntervalMinutes: 30,
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
    ]
  },
  'dental-demo': {
    id: 'dental-demo', name: 'Dental Demo CDMX', descriptor: 'Odontología estética y funcional',
    locale: 'es-MX', timezone: 'America/Mexico_City', currency: 'MXN', accent: '#155e75',
    whatsappNumber: '525500000000', contactEmail: 'citas@example.com', confirmationMode: 'request',
    leadTimeHours: 2, bookingWindowDays: 14, slotIntervalMinutes: 30,
    locations: [{ id: 'roma-sur', name: 'Roma Sur', address: 'Roma Sur, Ciudad de México' }],
    services: [
      { id: 'valoracion-dental', name: 'Valoración dental', duration: 30, priceLabel: 'Solicitar precio', locations: ['roma-sur'] },
      { id: 'limpieza', name: 'Limpieza dental', duration: 60, priceLabel: 'Solicitar precio', locations: ['roma-sur'] },
      { id: 'implantes', name: 'Valoración de implantes', duration: 45, priceLabel: 'Cotización personalizada', locations: ['roma-sur'] }
    ],
    providers: [{ id: 'any', name: 'Primera disponibilidad', services: ['valoracion-dental','limpieza','implantes'], locations: ['roma-sur'] }]
  },
  'spa-demo': {
    id: 'spa-demo', name: 'Spa Demo Roma', descriptor: 'Masajes y bienestar',
    locale: 'es-MX', timezone: 'America/Mexico_City', currency: 'MXN', accent: '#7c3f58',
    whatsappNumber: '525500000000', contactEmail: 'reservas@example.com', confirmationMode: 'request',
    leadTimeHours: 2, bookingWindowDays: 14, slotIntervalMinutes: 30,
    locations: [
      { id: 'cabina', name: 'Cabina Roma Norte', address: 'Roma Norte, Ciudad de México' },
      { id: 'domicilio', name: 'A domicilio', address: 'Zona central CDMX · sujeto a cobertura' }
    ],
    services: [
      { id: 'relajante', name: 'Masaje relajante', duration: 60, priceLabel: 'Desde $1,000 MXN', locations: ['cabina','domicilio'] },
      { id: 'deep', name: 'Deep tissue', duration: 60, priceLabel: 'Desde $1,200 MXN', locations: ['cabina','domicilio'] },
      { id: 'pareja', name: 'Masaje en pareja', duration: 60, priceLabel: 'Solicitar disponibilidad', locations: ['cabina'] }
    ],
    providers: [{ id: 'any', name: 'Primera disponibilidad', services: ['relajante','deep','pareja'], locations: ['cabina','domicilio'] }]
  }
}

const COMMON_HOURS = { 0: null, 1: ['10:00','19:00'], 2: ['10:00','19:00'], 3: ['10:00','19:00'], 4: ['10:00','19:00'], 5: ['10:00','19:00'], 6: ['10:00','15:00'] }
for (const tenant of Object.values(TENANTS)) {
  tenant.hours = tenant.hours || COMMON_HOURS
  tenant.blockedDates = tenant.blockedDates || []
}

const requestedTenant = new URLSearchParams(window.location.search).get('business') || 'clinica-demo-roma'
export const BUSINESS = TENANTS[requestedTenant] || TENANTS['clinica-demo-roma']
export const BUSINESS_IDS = Object.keys(TENANTS)
