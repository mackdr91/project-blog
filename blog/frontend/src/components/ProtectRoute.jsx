// wrapper for a protected route
// Will need an authorization token in order to use a route


import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect } from "react";


function ProtectedRoute({ children }) {
    const [IsAuthorized, setIsAuthorized] = useState(null)

    useEffect(() => {
        // Run this code of the initial mount of this use effect (GIVEN)
        auth().catch(() => setIsAuthorized(false))

    },[])

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try{

            const response = await api.post("api/token/refresh/", {
                refresh: refreshToken,
            });

            if (response.status === 200 ){

                localStorage.setItem(ACCESS_TOKEN, response.data.access)
                setIsAuthorized(true)

            } else {

                setIsAuthorized(false)

            }

        }catch (error) {

            console.log(error)
            setIsAuthorized(false)

        }


    }
    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN)

        if(!token) {

            setIsAuthorized(false)
            return

        }

        const decoded = jwtDecode(token)
        const tokenExpiration = decoded.exp
        const now = Date.now() / 1000

        if ( tokenExpiration < now ) {

            await refreshToken()

        } else {

            setIsAuthorized(true)

        }

    }
    if (IsAuthorized === null ) {
        return <div>Loading....</div>
    }

    return IsAuthorized ? children : <Navigate to="/login" />
}

export default ProtectedRoute