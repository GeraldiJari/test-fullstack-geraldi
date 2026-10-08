import { useEffect, useState } from "react";
import { getUsers } from "../services/userService";

const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                setError(null);

                const data = await getUsers();

                setUsers(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return {
        users,
        loading,
        error,
    };
};

export default useUsers;