import { NavLink, useLocation } from 'react-router-dom'
import { Home, Dumbbell, BarChart3, MessageCircle } from 'lucide-react'

const tabs = [
  { to: '/', label: 'Home', Icon: Home },
  { to: '/workout', label: 'Allenamento', Icon: Dumbbell },
  { to: '/progress', label: 'Progressi', Icon: BarChart3 },
  { to: '/chat', label: 'da capì', Icon: MessageCircle },
]

export default function TabBar() {
  const { pathname } = useLocation()
  const index = Math.max(0, tabs.findIndex((t) => t.to === pathname))

  return (
    <nav className="tabbar" style={{ '--count': tabs.length, '--index': index }}>
      <div className="tab-pill" />
      {tabs.map(({ to, label, Icon }) => (
        <NavLink key={to} to={to} className="tab-link" aria-label={label}>
          <Icon size={22} />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}