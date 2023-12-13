import React from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonItem, IonLabel, IonList } from '@ionic/react';
import style from "./Card.module.css"


interface Pokemon {
  id: number;
  name: string;
  experience: number;
  height: number;
  weight: number;
  img: string;
  ability: string[];
}

function Card({ id, name, experience,height,weight,img,ability} : Pokemon ) {
  return (
    <IonCard className={style.containerCard}>
      <img  className={style.img} alt="Silhouette of mountains" src={img} />
      <IonCardHeader>
        <IonCardTitle className={style.name}> {name}</IonCardTitle>
        <IonItem>
          <IonLabel>Experience: {experience}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Height: {height}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>weight: {weight}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>The Legend of Zelda</IonLabel>
        </IonItem>
      </IonCardHeader>

    </IonCard>
  );
}
export default Card;