import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {
        id: '',
        apiToken: '',
        name: '',
        roles: '',
        email: ''
    },
    game: {
        jocId: -999,        
    },
    team1Name: 'Equipo uno',
    team1Points: 0,
    team2Name: 'Equipo dos',
    team2Points: 0,
    team3Name: 'Equipo tres',
    team3Points: 0,
    /*
    puntsGuanyaProva1: 10,
    puntsGuanyaProva2: 20,
    puntsPerdProva2: 10,
    puntsGuanyaProva3: 20,
    puntsGuanyaProva4: 20
    */
}

export const reusSlice = createSlice({
    name: 'reus',
    initialState: initialState,
    reducers: {
        setUserAtributes: (state, action) => {
            state.user.id = action.payload.id
            state.user.name = action.payload.name;
            state.user.email = action.payload.email;
            state.user.roles = action.payload.roles;
        },
        setJocId: (state, action) => {
            state.game.jocId = action.payload
        },
        setApiToken: (state, action) => {
            state.user.apiToken = action.payload
        },
        setTeam1Name: (state, action) => {
            state.team1Name = action.payload
        },
        setTeam2Name: (state, action) => {
            state.team2Name = action.payload
        },
        setTeam3Name: (state, action) => {
            state.team3Name = action.payload
        },
        setTeam1Points: (state, action) => {
            state.team1Points = action.payload
        },
        setTeam2Points: (state, action) => {
            state.team2Points = action.payload
        },
        setTeam3Points: (state, action) => {
            state.team3Points = action.payload
        }
    }
})

export const {
    setNumOfPlayers, setJocId,
    setApiToken, setUserAtributes,
    setTeam1Name, setTeam1Points,
    setTeam2Name, setTeam2Points,
    setTeam3Name, setTeam3Points
} = reusSlice.actions

export default reusSlice.reducer