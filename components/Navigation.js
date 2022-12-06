import useSession from '../lib/auth/useSession'
import {useRouter} from 'next/router'
import Link from 'next/link'
import Copyright from './Copyright'

export default function Navigation() {
  const router = useRouter()
  const {session} = useSession()
  const isAdmin = session?.user?.status === 'ADMIN' ? true : false

  return <>

    <div className="mt-4 d-none d-md-block">
      <img src="/logo-silberpfoten.png" alt="SilberPfoten Logo" style={{width:70}} />
      <div className="mt-4">
        <Link href="/" className="text-decoration-none"><div className="text-dark d-block h4 fw-light"><i className={`${router.pathname === '/' ? 'bi-house-fill' : 'bi-house'} me-2`} style={{fontSize: 24}}></i><span className="d-none d-lg-inline">Neuigkeiten</span></div></Link>
        <div className="text-secondary mt-4 border-top">
          {isAdmin ? <>
            <Link href="/members" className="text-decoration-none"><div className="cursor-pointer mt-3 text-dark d-block h4 fw-light"><i className={`${router.pathname === '/members' ? 'bi bi-person-heart' : 'bi bi-person-heart'} me-2`} style={{fontSize: 24}} /><span className="d-none d-lg-inline">Mitglieder</span></div></Link>
            <Link href="/admins" className="text-decoration-none"><div className="cursor-pointer mt-2 text-dark d-block h4 fw-light"><i className={`${router.pathname === '/admins' ? 'bi bi-person-fill-gear' : 'bi bi-person-gear'} me-2`} style={{fontSize: 24}} /><span className="d-none d-lg-inline">Admins</span></div></Link>
          </> : null}
          <Link href="/signout" className="text-decoration-none"><div className="cursor-pointer text-secondary d-block h4 fw-light mt-3"><i className="bi bi-box-arrow-left me-2" style={{fontSize: 24}} /><span className="d-none d-lg-inline">Abmelden</span></div></Link>
        </div>
      </div>
      
      <div className="d-none d-lg-block bg-light rounded-pill mt-5 py-2 px-3 cursor-pointer">
        <div className="row align-items-center">
          <div className="col-10">
            <div className="p text-muted">Angemeldet als</div>
            <div className="h4 fw-bold">{session?.user.firstname} {session?.user.lastname}</div>
          </div>
        </div>
      </div>
      
      <div className="d-none d-lg-block mt-4 py-2 px-3">
        <div className="row">
          <div className="col-12">
            <Copyright />
          </div>
        </div>
      </div>

    </div>
  </>
}