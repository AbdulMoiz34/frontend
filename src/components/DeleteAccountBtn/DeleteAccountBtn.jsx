import { Modal, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { confirm } = Modal;

const DeleteAccountButton = ({ userId }) => {
    const navigate = useNavigate();

    const handleDelete = () => {
        confirm({
            title: "Are you sure you want to delete your account?",
            content: "This action cannot be undone and all your data will be permanently deleted.",
            okText: "Yes, Delete",
            okType: "danger",
            cancelText: "Cancel",
            async onOk() {
                try {
                    const res = await axios.delete(`/auth/deleteAcc/${userId}`);
                    message.success(res.data.message || "Account deleted successfully");
                    navigate("/login");
                } catch (err) {
                    console.error(err);
                    message.error(err.response?.data?.message || "Something went wrong");
                }
            },
            onCancel() {
                message.info("Account deletion cancelled");
            },
        });
    };

    return (
        <button
            onClick={handleDelete}
            className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-all"
        >
            Delete My Account
        </button>
    );
};

export default DeleteAccountButton;