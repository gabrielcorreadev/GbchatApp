import api from '../../axios.config'; // importing axios from customAxios

class MapsDiscoverService {

    geoPosition(lat:number, long:number) {
        return api.get(`/discover?at=${lat},${long}`);
    }

    getById(id: string) {
        return api.get(`/devices/${id}`);
    }

    logout(id: string) {
        return api.post(`/devices/${id}/logout`);
    }

    logout_all() {
        return api.post(`/devices/logout-all`);
    }
}

const mapsDiscover = new MapsDiscoverService();
export {mapsDiscover};