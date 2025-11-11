import React, { useState } from 'react';
import '../../css/modalEditProfile.css';

function ModalEditProfile({ isOpen, onClose, userData, onSave }) {
    const [formData, setFormData] = useState({
        name: userData?.name || '',
        email: userData?.email || '',
        avatar: userData?.avatar || '',
        avatar2: userData?.avatar2 || '',
        avatar3: userData?.avatar3 || '',
        avatar4: userData?.avatar4 || '',
        avatar5: userData?.avatar5 || '',
    });

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'file' ? e.target.files[0] : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Редактировать профиль</h2>
                    <button className="modal-close" onClick={onClose}>
                        &times;
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="form-group">
                        <label htmlFor="name">Имя</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Введите имя"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="example@email.com"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="bio">Фото профиля 1</label>
                        <input
                            type="file"
                            id="avatar"
                            name="avatar"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="bio">Фото профиля 2</label>
                        <input
                            type="file"
                            id="avatar2"
                            name="avatar2"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="bio">Фото профиля 3</label>
                        <input
                            type="file"
                            id="avatar3"
                            name="avatar3"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="bio">Фото профиля 4</label>
                        <input
                            type="file"
                            id="avatar4"
                            name="avatar4"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="bio">Фото профиля 5</label>
                        <input
                            type="file"
                            id="avatar5"
                            name="avatar5"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn-cancel" onClick={onClose}>
                            Отмена
                        </button>
                        <button type="submit" className="btn-save">
                            Сохранить
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalEditProfile;