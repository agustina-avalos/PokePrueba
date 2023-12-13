import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import style from './AllPokes.module.css' 
import axios from 'axios';
import { IonCol, IonContent, IonGrid, IonInfiniteScroll, IonInfiniteScrollContent, IonRow } from '@ionic/react';




interface Pokemon {
  id: number;
  name: string;
  experience: number;
  height: number;
  weight: number;
  img: string;
  ability: string[];
}

function AllPokes() {
  const [pokemonData, setPokemonData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiurl1 = await axios.get("https://pokeapi.co/api/v2/pokemon");
        const apiurl2 = await axios.get(apiurl1.data.next);
        const apiurl3 = await axios.get(apiurl2.data.next);
        const apiurl4 = await axios.get(apiurl3.data.next);



        const [res1, res2, res3, res4] = await Promise.all([apiurl1, apiurl2, apiurl3, apiurl4]);

        const allpoke = res1.data.results.concat(res2.data.results).concat(res3.data.results).concat(res4.data.results);
      
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

    fetchData();
  }, []);


  console.log(pokemonData)

    return(

     
      <IonContent  >
        <div className={style.padre}>
       <IonGrid className={style.con}>
        <IonRow>
          {
            
            pokemonData.map(p=>(
              <IonCol size="12" size-md="6" size-lg="2" key={p.id}>

                <Card id={p.id} name={p.name} experience={p.experience} height={p.height} weight={p.weight}
                  img={p.img} ability={p.img}                
                />
                </IonCol>
              
            
            ))
          
          }
          </IonRow>
          </IonGrid>
          </div>

   

        <IonInfiniteScroll
          onIonInfinite={(ev) => {
          setTimeout(() => ev.target.complete(), 500);
           }}
          >
        <IonInfiniteScrollContent></IonInfiniteScrollContent>
      </IonInfiniteScroll>
      
        </IonContent>
 
    )
}


export default AllPokes;