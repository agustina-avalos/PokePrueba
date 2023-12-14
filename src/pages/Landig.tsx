import { Link } from "react-router-dom"
import style from "./css/Landing.module.css"

function Landig (){

    return(
<div>
    <div className={style.padre}>
            <div className={style.cont_titulo}>
                <h2 className={style.titulo}>ARE YOU READY TO MEET THE POKEMONS?</h2>
            </div>

            <div className={style.cont_btn}>
                <Link to="/home">
                    <button className={style.btn_landing}>Get in</button>
                </Link>
            </div>
            
        </div>

    </div>

    )




}

export default Landig