import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const AuthController = () => import('#controllers/auth_controller')
const ProfessionalController = () => import('#controllers/professionals_controller')
const ConsultationController = () => import('#controllers/consultas_controller')
const AvailabilityController = () => import('#controllers/availability_controller')

router.get('/', async () => { return { status: 'Online' } })

router.group(() => {
  router.post('/register', [AuthController, 'register'])
  router.post('/login', [AuthController, 'login'])
}).prefix('api/auth')


router.group(() => {
  
  router.get('/professionals', [ProfessionalController, 'index'])
  router.get('/professionals/:id', [ProfessionalController, 'show'])

  router.post('/Availability', [AvailabilityController, 'store'])
  router.get('/Availability/:professional_id', [AvailabilityController, 'index'])

  router.post('/consultations', [ConsultationController, 'store'])
  router.get('/consultations', [ConsultationController, 'index'])
  router.put('/consultations/:id', [ConsultationController, 'update'])
  router.delete('/consultations/:id', [ConsultationController, 'destroy'])

}).use(middleware.auth()).prefix('api')