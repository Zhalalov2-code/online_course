import {useAuth} from "../utils/authContext.js";
import "../css/profile.css";

function Profile() {
    const {user, isLoading} = useAuth();

    if (isLoading) {
        return <div>Загрузка...</div>
    }
    if (!user) {
        return <div>Пожалуйста, войдите в систему, чтобы просмотреть ваш профиль.</div>
    }

    return (
        <div className="profile-container">
            <h1 className="profile-title">Профиль пользователя</h1>
            <div className="user-avatar-profile">
                <img src={user.avatar} alt="Avatar" className="user-avatar" />
            </div>
            <div className="profile-info">
                <p><b>Имя:</b> {user.name}</p>
                <p><b>Электронная почта:</b> {user.email}</p>
                <p><b>Телефон:</b> {user.phone}</p>
                <p><b>Роль:</b> {user.role}</p>
            </div>
        </div>
    )
}

export default Profile;