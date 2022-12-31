import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import { setApiToken, setJocId, setTeam1Name, setTeam1Points, setTeam2Name, setTeam2Points, setTeam3Name, setTeam3Points, setUserAtributes } from "../../features/reus/reusSlice";

export default function PillaCookies() {

    const dispatch = useDispatch();
    const cookies = new Cookies();
    const reus = useSelector(state => state.reusdereus)

    //Comprovem si existeix Cookies amb info User/Api/GameId
    //Son 3 cookies per si es recarga la pagina, segueixi funcionant
    useEffect(() => {
        if ((cookies.get('reusdereusApiKey'))
            && (cookies.get('reusdereusUser'))
            && (cookies.get('reusdereusGameId'))) {
            dispatch(setApiToken(cookies.get('reusdereusApiKey')));
            let cuki = cookies.get('reusdereusUser');
            dispatch(setUserAtributes({
                id: cuki.id,
                name: cuki.name,
                email: cuki.email,
                roles: cuki.roles[0].name
            }));
            dispatch(setJocId(parseInt(cookies.get('reusdereusGameId'))))
        }
    }, [])

    // quan es carga l'api token i el game ID desde la cookie, fem un POST per les altres dades
    // aixo es en cas de refrescar la pagina
    useEffect(() => {
        if (reus.user.apiToken !== '') {
            if (reus.game.jocId === -999) { return }
            getGameDades()
        }
    }, [reus.user.apiToken])

    // pillo les dades del equip -> nom i puntuació    
    const getGameDades = () => {
        fetch(`${process.env.REACT_APP_API_ENDPOINT}/mostrasoloequipos/${reus.game.jocId}`, {
            headers: {
                Authorization: `Bearer ${reus.user.apiToken}`,
                'Content-Type': "application/json",
                'Accept': "application/json",
            }
        })
            .then((response) => response.json())
            .then((jsonResponse) => {
                if (jsonResponse.message) {
                    return alert(jsonResponse.message)
                }
                dispatch(setTeam1Points(jsonResponse.team1Points))
                dispatch(setTeam2Points(jsonResponse.team2Points))
                dispatch(setTeam3Points(jsonResponse.team3Points))
                dispatch(setTeam1Name(jsonResponse.team1Name))
                dispatch(setTeam2Name(jsonResponse.team2Name))
                dispatch(setTeam3Name(jsonResponse.team3Name))
            });
    }





}