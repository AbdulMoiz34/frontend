import axios from "axios";
axios.defaults.baseURL = "https://backend-two-flax-56.vercel.app/api";
axios.defaults.withCredentials = true;

const getDashboardSlats = async () => {
    try {
        const res = await axios.get("/admin/dashboard");
        return res.data;
    } catch (err) {
        throw err;
    }
}

const getAppointments = async () => {
    try {
        const res = await axios.get("/patient/appointments");
        return res.data;
    } catch (err) {
        throw err;
    }
}

export { getDashboardSlats, getAppointments };