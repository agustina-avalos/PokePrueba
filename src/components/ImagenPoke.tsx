// Popup.tsx
import React from 'react';
import { IonModal, IonContent, IonImg, IonButton } from '@ionic/react';
import style from "./css/ImagenPoke.module.css"

interface PopupProps {
  isOpen: boolean;
  imageUrl: string;
  onClose: () => void;
}

const ImagenPoke: React.FC<PopupProps> = ({ isOpen, imageUrl, onClose }) => {
  return (
    <IonModal isOpen={isOpen} >
      <IonContent className={style.cont}>
        <div className={style.cont}>
        <IonButton onClick={onClose}>x</IonButton>
        <IonImg  className={style.img}  src={imageUrl} />
        </div>
     
        
      </IonContent>
    </IonModal>
  );
};

export default ImagenPoke;
