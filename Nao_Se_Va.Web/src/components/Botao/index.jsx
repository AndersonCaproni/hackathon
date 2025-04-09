import { Button } from "@mui/material"

export const Botao = ({ children, tipo, style, onClick}) => {
    return (
        <Button variant={tipo} style={style} onClick={onClick}>
            {children}
        </Button>
    )
}