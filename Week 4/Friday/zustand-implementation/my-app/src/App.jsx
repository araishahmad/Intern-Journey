import { useStore } from './Store'
import './App.css'

function Navbar() {
    const user = useStore((state) => state.user)
    const theme = useStore((state) => state.theme)
    const toggleTheme = useStore((state) => state.toggleTheme)
    const notificationCount = useStore((state) => state.notifications.length)

    return (
        <nav className="navbar">
            <span>{user.name} ({user.role})</span>

            <button onClick={toggleTheme}>
                Switch to {theme === 'light' ? 'dark' : 'light'} mode
            </button>

            <span className="bell">
                Notifications
                {notificationCount > 0 && (
                    <span className="badge">{notificationCount}</span>
                )}
            </span>
        </nav>
    )
}

function NotificationList() {
    const notifications = useStore((state) => state.notifications)
    const dismissNotification = useStore((state) => state.dismissNotification)

    return (
        <ul className="notification-list">
            {notifications.map((n) => (
                <li key={n.id}>
                    {n.message}
                    <button onClick={() => dismissNotification(n.id)}>✕</button>
                </li>
            ))}
        </ul>
    )
}

function AddNotificationButton() {
    const addNotification = useStore((state) => state.addNotification)

    return (
        <button onClick={() => addNotification('New message received')}>
            Add notification
        </button>
    )
}

function App() {
    const theme = useStore((state) => state.theme)

    return (
        <div className={`app ${theme}`}>
            <Navbar />
            <AddNotificationButton />
            <NotificationList />
        </div>
    );
}

export default App;
