import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    team1Name: 'Equipo uno',
    team1Points: 0,
    team2Name: 'Equipo dos',
    team2Points: 0,
    team3Name: 'Equipo tres',
    team3Points: 0,
    puntsGuanyaProva1: 10,
    puntsGuanyaProva2: 20,
    puntsPerdProva2: 10,
    puntsGuanyaProva3: 20,
    puntsGuanyaProva4: 20
}



export const reusSlice = createSlice({
    name: 'reus',
    initialState: initialState,
    reducers: {
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
            if (action.payload === "giveMeTheNumber") {
                state.team1Points += state.puntsGuanyaProva1
            } else if (action.payload === "quantes-saps-guanya") {
                state.team1Points += state.puntsGuanyaProva2                
            } else if (action.payload === "quantes-saps-perd") {
                state.team1Points -= state.puntsPerdProva2                
            } else if (action.payload === 'endevinaSong') {
                state.team1Points += state.puntsGuanyaProva3
            } else if (action.payload === 'unaDeDues') {
                state.team1Points += state.puntsGuanyaProva4
            }
        },
        setTeam2Points: (state, action) => {
            if (action.payload === "giveMeTheNumber") {
                state.team2Points += state.puntsGuanyaProva1
            }else if (action.payload === "quantes-saps-guanya") {
                state.team2Points += state.puntsGuanyaProva2                
            } else if (action.payload === "quantes-saps-perd") {
                state.team2Points -= state.puntsPerdProva2                
            } else if (action.payload === 'endevinaSong') {
                state.team2Points += state.puntsGuanyaProva3
            }else if (action.payload === 'unaDeDues') {
                state.team2Points += state.puntsGuanyaProva4
            }
        },
        setTeam3Points: (state, action) => {
            if (action.payload === "giveMeTheNumber") {
                state.team3Points += state.puntsGuanyaProva1
            }else if (action.payload === "quantes-saps-guanya") {
                state.team3Points += state.puntsGuanyaProva2                
            } else if (action.payload === "quantes-saps-perd") {
                state.team3Points -= state.puntsPerdProva2                
            }else if (action.payload === 'endevinaSong') {
                state.team3Points += state.puntsGuanyaProva3
            }else if (action.payload === 'unaDeDues') {
                state.team3Points += state.puntsGuanyaProva4
            }
        }
    }
})


export const {
    setTeam1Name, setTeam1Points,
    setTeam2Name, setTeam2Points,
    setTeam3Name, setTeam3Points
} = reusSlice.actions

export default reusSlice.reducer