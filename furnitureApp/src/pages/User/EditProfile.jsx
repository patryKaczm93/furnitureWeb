import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import "./EditProfile.scss";

const fetchUserData = async (user_id) => {
    const response = await axios.get(`http://localhost:8000/user/${user_id}`);
    return response.data;
};

const updateUserData = async ({ user_id, formData }) => {
    const response = await axios.patch(`http://localhost:8000/user/${user_id}`, formData);
    return response.data;
};

const deleteUserData = async (user_id) => {
    const response = await axios.delete(`http://localhost:8000/user/${user_id}`);
    return response.data;
};

const EditProfile = () => {
    const user_id = localStorage.getItem("userId");
    const queryClient = useQueryClient();

    const { data: userData, isLoading, error } = useQuery({
        queryKey: ["user", user_id],
        queryFn: () => fetchUserData(user_id),
        enabled: !!user_id,
    });

    const [formData, setFormData] = useState({
        username: "",
        firstname: "",
        lastname: "",
        email: "",
    });

    useEffect(() => {
        if (userData) {
            setFormData({
                username: userData.username,
                firstname: userData.firstname,
                lastname: userData.lastname,
                email: userData.email,
            });
        }
    }, [userData]);

    const mutationUpdate = useMutation({
        mutationFn: updateUserData,
        onSuccess: () => {
            queryClient.invalidateQueries(["user", user_id]);
        },
    });

    const mutationDelete = useMutation({
        mutationFn: deleteUserData,
        onSuccess: () => {
            queryClient.removeQueries(["user", user_id]);
        },
    });

    const handleEdit = () => {
        mutationUpdate.mutate({ user_id, formData });
    };

    const handleDelete = () => {
        mutationDelete.mutate(user_id);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className="EditProfile-container">
            <h2 className="EditProfile-title">Edit Profile {userData?.username}</h2>
            {isLoading ? (
                <p>Ładowanie...</p>
            ) : error ? (
                <p className="error">Błąd podczas pobierania danych użytkownika</p>
            ) : (
                <div>
                    <form className="EditProfile-form">
                        <label>
                            Username:
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            First Name:
                            <input
                                type="text"
                                name="firstname"
                                value={formData.firstname}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Last Name:
                            <input
                                type="text"
                                name="lastname"
                                value={formData.lastname}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Email:
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </label>
                    </form>
                    <button className="EditProfile-button" onClick={handleEdit}>
                        Zapisz zmiany
                    </button>
                    <button className="DeleteProfile-button" onClick={handleDelete}>
                        Usuń konto
                    </button>
                </div>
            )}
        </div>
    );
};

export default EditProfile;
