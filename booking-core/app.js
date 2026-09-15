import { BUSINESS } from './config.js'
import { createBookingStorage } from './storage.js'

const $ = (s) => document.querySelector(s)
const state = { service: '', location: '', provider: 'any', date: '', time: '' }
const storage = createBookingStorage(BUSINESS)

function moneySafe(text) { return String(text || '').replace(/[<>]/g, '') }
function esc(text) { return String(text || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c])) }
function getService() { return BUSINESS.services.find(x => x.id === state.service) }
function getLocation() { return BUSINESS.locations.find(x => x.id === state.location) }
function getProvider() { return BUSINESS.providers.find(x => x.id === state.provider) }
function pad(n) { return String(n).padStart(2,'0') }
function isoLocal(d) { return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}` }
function minutes(s) { const [h,m]=s.split(':').map(Number); return h*60+m }
function clock(total) { return `${pad(Math.floor(total/60))}:${pad(total%60)}` }
function humanDate(value) { return new Intl.DateTimeFormat(BUSINESS.locale,{weekday:'short',day:'numeric',month:'short'}).format(new Date(`${value}T12:00:00`)) }

function initBrand() {
  document.documentElement.style.setProperty('--accent', BUSINESS.accent)
  $('#businessName').textContent = BUSINESS.name
  $('#descriptor').textContent = BUSINESS.descriptor
  document.title = `Reservar | ${BUSINESS.name}`
}

function renderServices() {
  $('#services').innerHTML = BUSINESS.services.map(s => `<button class="choice ${state.service===s.id?'selected':''}" data-service="${s.id}"><strong>${esc(s.name)}</strong><span>${s.duration} min · ${esc(s.priceLabel)}</span></button>`).join('')
  document.querySelectorAll('[data-service]').forEach(b => b.onclick = () => {
    state.service = b.dataset.service; state.location=''; state.provider='any'; state.date=''; state.time='';
    renderAll();
  })
}

function renderLocations() {
  const service = getService()
  const options = service ? BUSINESS.locations.filter(l => service.locations.includes(l.id)) : []
  $('#locationStep').classList.toggle('disabled', !service)
  $('#locations').innerHTML = options.map(l => `<button class="choice ${state.location===l.id?'selected':''}" data-location="${l.id}"><strong>${esc(l.name)}</strong><span>${esc(l.address)}</span></button>`).join('')
  document.querySelectorAll('[data-location]').forEach(b => b.onclick = () => { state.location=b.dataset.location; state.provider='any'; state.date=''; state.time=''; renderAll() })
}

function renderProviders() {
  const service=getService(), location=getLocation()
  const options = service && location ? BUSINESS.providers.filter(p => p.services.includes(service.id) && p.locations.includes(location.id)) : []
  $('#providerStep').classList.toggle('disabled', !location)
  $('#providers').innerHTML = options.map(p => `<button class="choice ${state.provider===p.id?'selected':''}" data-provider="${p.id}"><strong>${esc(p.name)}</strong><span>${p.id==='any'?'Primera disponibilidad':'Especialista seleccionado'}</span></button>`).join('')
  document.querySelectorAll('[data-provider]').forEach(b => b.onclick=()=>{state.provider=b.dataset.provider;state.date='';state.time='';renderAll()})
}

function validDates() {
  const dates=[]; const now=new Date()
  for(let i=0;i<BUSINESS.bookingWindowDays;i++){
    const d=new Date(now.getFullYear(),now.getMonth(),now.getDate()+i)
    const iso=isoLocal(d)
    if(BUSINESS.hours[d.getDay()] && !BUSINESS.blockedDates.includes(iso)) dates.push(iso)
  }
  return dates
}

function renderDates() {
  const enabled = !!getLocation() && !!getProvider()
  $('#dateStep').classList.toggle('disabled', !enabled)
  $('#dates').innerHTML = enabled ? validDates().slice(0,8).map(d=>`<button class="date ${state.date===d?'selected':''}" data-date="${d}">${esc(humanDate(d))}</button>`).join('') : ''
  document.querySelectorAll('[data-date]').forEach(b=>b.onclick=()=>{state.date=b.dataset.date;state.time='';renderAll()})
}

function slotsFor(date) {
  const d=new Date(`${date}T12:00:00`), range=BUSINESS.hours[d.getDay()]
  if(!range) return []
  const service=getService(); if(!service) return []
  const start=minutes(range[0]), end=minutes(range[1]), result=[]
  const now=Date.now(), minStart=now + BUSINESS.leadTimeHours*3600000
  for(let t=start;t+service.duration<=end;t+=BUSINESS.slotIntervalMinutes){
    const [h,m]=clock(t).split(':').map(Number)
    const stamp=new Date(`${date}T${pad(h)}:${pad(m)}:00`).getTime()
    if(stamp>=minStart) result.push(clock(t))
  }
  return result
}

function renderTimes() {
  $('#timeStep').classList.toggle('disabled', !state.date)
  const slots=state.date?slotsFor(state.date):[]
  $('#times').innerHTML = slots.length ? slots.map(t=>`<button class="time ${state.time===t?'selected':''}" data-time="${t}">${t}</button>`).join('') : (state.date?'<p class="muted">No hay horarios disponibles ese día.</p>':'')
  document.querySelectorAll('[data-time]').forEach(b=>b.onclick=()=>{state.time=b.dataset.time;renderAll()})
}

function renderSummary() {
  const ready=state.service&&state.location&&state.provider&&state.date&&state.time
  $('#detailsStep').classList.toggle('disabled', !ready)
  const s=getService(),l=getLocation(),p=getProvider()
  $('#summary').innerHTML = ready ? `<strong>${esc(s.name)}</strong><span>${esc(l.name)} · ${esc(humanDate(state.date))} · ${esc(state.time)}</span><span>${esc(p.name)} · ${esc(s.priceLabel)}</span>` : '<span>Elige servicio, ubicación y horario.</span>'
}

function renderAll(){ renderServices(); renderLocations(); renderProviders(); renderDates(); renderTimes(); renderSummary() }

function whatsappUrl(request){
  const msg=[`Hola, soy ${request.customer.name}.`,`Quiero solicitar: ${request.service.name}.`,`Sucursal: ${request.location.name}.`,`Horario preferido: ${humanDate(request.date)} ${request.time}.`,`Tel: ${request.customer.phone}.`,`Folio: ${request.id}.`].join('\n')
  return `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(msg)}`
}

$('#bookingForm').addEventListener('submit', async e => {
  e.preventDefault()
  if(!(state.service&&state.location&&state.provider&&state.date&&state.time)) return
  const form=new FormData(e.currentTarget)
  const request={
    id:`EB-${Date.now().toString(36).toUpperCase()}`,
    businessId:BUSINESS.id,
    status:'requested',
    createdAt:new Date().toISOString(),
    service:getService(), location:getLocation(), provider:getProvider(), date:state.date, time:state.time,
    customer:{name:moneySafe(form.get('name')),phone:moneySafe(form.get('phone')),email:moneySafe(form.get('email')),notes:moneySafe(form.get('notes'))}
  }
  const submit=e.currentTarget.querySelector('button[type="submit"]')
  submit.disabled=true; submit.textContent='Guardando…'
  try {
    await storage.saveRequest(request)
    $('#bookingFlow').classList.add('hidden')
    $('#success').classList.remove('hidden')
    $('#folio').textContent=request.id
    $('#successText').textContent=`Solicitud para ${request.service.name}, ${humanDate(request.date)} a las ${request.time}. La cita queda pendiente de confirmación.`
    $('#whatsapp').href=whatsappUrl(request)
  } finally {
    submit.disabled=false; submit.textContent='Solicitar cita'
  }
})

$('#restart').onclick=()=>location.reload()
initBrand(); renderAll()
