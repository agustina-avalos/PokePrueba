import React from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonItem, IonLabel, IonList } from '@ionic/react';
import style from "./css/Card.module.css"


interface Pokemon {
  id: number;
  name: string;
  experience: number;
  height: number;
  weight: number;
  img: string;
  ability: string[];
  onClick: ()=>void;
}




function Card({ id, name, experience,height,weight,img,ability, onClick} : Pokemon ) {
  return (
    <IonCard className={style.containerCard}   onClick={onClick}>
      <img  className={style.img}  src={img} />
      <IonCardHeader >
        <IonCardTitle className={style.name}> {name.toUpperCase()}</IonCardTitle>
        <IonItem >
          <IonLabel>Experience: {experience}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Height: {height} cm</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Weight: {weight} kg</IonLabel>
        </IonItem>
        
        <IonItem>
          <IonLabel className={style.abili}>Abilities:
          
            <ul>
              {ability.map((a) => (
                <li >{a.toUpperCase()}</li>
              ))}
            </ul>
            </IonLabel>
        </IonItem>
      
      </IonCardHeader>

    </IonCard>
  );
}
export default Card;