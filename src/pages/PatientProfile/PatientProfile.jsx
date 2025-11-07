import { useCurrentUser } from "../../hooks/useCurrentUser";

const PatientProfile = () => {
    const { data: user, isLoading } = useCurrentUser();

    if (isLoading) return <p>Loading...</p>;

    return (
        <div>
            <h1>{user.fullName}</h1>
            <p>{user.email}</p>
        </div>
    );
}

export default PatientProfile;