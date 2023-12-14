import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import style from './css/AllPokes.module.css' 
import axios from 'axios';
import { IonCol, IonContent, IonGrid, IonInfiniteScroll, IonInfiniteScrollContent, IonRefresher, IonRefresherContent, IonRow } from '@ionic/react';
import ImagenPoke from '../components/ImagenPoke';



interface Pokemon {
  id: number;
  name: string;
  experience: number;
  height: number;
  weight: number;
  img: string;
  ability: string[];
  onClick: () => void;
}

function AllPokes() {
  const [pokemonData, setPokemonData] = useState<any[]>([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState("")

 
    const fetchData = async () => {
      try {
        const apiurl1 = await axios.get("https://pokeapi.co/api/v2/pokemon");
        const apiurl2 = await axios.get(apiurl1.data.next);
        const apiurl3 = await axios.get(apiurl2.data.next);
        const apiurl4 = await axios.get(apiurl3.data.next);
        const apiurl5= await axios.get(apiurl4.data.next);

        const [res1, res2, res3, res4, res5] = await Promise.all([apiurl1, apiurl2, apiurl3, apiurl4, apiurl5]);

        const allpoke = res1.data.results.concat(res2.data.results).concat(res3.data.results).concat(res4.data.results).concat(res5.data.results);
      
        const apiInfo = await Promise.all(
          allpoke.map(async (e: { url: string; }) => {
            const p = await axios.get(e.url);
            return {
              id: p.data.id,
              name: p.data.name,
              experience: p.data.base_experience,
              height: p.data.height * 10, // a cm
              weight: p.data.weight / 10, // a kg
              img: p.data.sprites.other.home.front_default,
              ability : p.data.abilities.map((a: { ability: { name: any; }; }) => a.ability.name)
            };
          })
        );

        setPokemonData(apiInfo);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    

      useEffect(() => {
        fetchData();
      }, []);


    const loadMoreData = async (event: CustomEvent<void>) => {
      await fetchData(); 
      (event.target as HTMLIonInfiniteScrollElement).complete(); // Marca el evento como completado
    };

 


  const handleCardClick = (imageUrl: string) => {
    setSelectedImageUrl(imageUrl);
    setPopupOpen(true);
  };


    console.log(pokemonData)

    return(
      <IonContent>
        <div className={style.padre}>

        <div className={style.titleCont}>
          <h1>¡Welcome Pokefriend!</h1>
        </div>

          <IonGrid className={style.con}>
            <IonRow>
              {
                pokemonData.map(p=>(
                  <IonCol size="12" size-md="6" size-lg="2" key={p.id}>

                    <Card id={p.id} name={p.name} experience={p.experience} height={p.height} weight={p.weight}
                      img={p.img} ability={p.ability}
                      onClick={() => handleCardClick(p.img)}                
                    />
                    </IonCol> 
                
                ))
              }
            </IonRow>
          </IonGrid>
        </div>

        <IonInfiniteScroll
            threshold="100px"
            onIonInfinite={loadMoreData}
            disabled={false}
          >
          <IonInfiniteScrollContent></IonInfiniteScrollContent>
        </IonInfiniteScroll>

        <ImagenPoke  key={selectedImageUrl} isOpen={popupOpen} imageUrl={selectedImageUrl} onClose={() => setPopupOpen(false)} />
      </IonContent>
 
    )
}


export default AllPokes;

