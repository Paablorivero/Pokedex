import type { Pokemon } from '../types/pokemon';

export type { Pokemon };

export const  PokeService = {
    //Enlace api pokemon
    BASE_URL: 'https://pokeapi.co/api/v2/pokemon',

    //Url de las imagenes
    IMAGEN_URL_FRONT: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/back/',
    IMAGEN_URL_BACK: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/',

    //Imagenes de reserva
    IMAGEN_EXTRA_FRONT: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/',

    async getPokedex(): Promise<Pokemon[]> {
        const totalPokemons = 151;
        const pokemons: Pokemon[] = [];
        const chunkSize = 50;//He aumentado la carga para que sea mas rapido

        console.log(`Iniciando descarga de ${totalPokemons} Pokémon por lotes... `);

        for (let i = 1; i <= totalPokemons; i += chunkSize){ //Cargamos los pokemons de 50 en 50
            const chunkPromises = [];

            //Carga individual pra evitar problemas con la api
            for (let id = i; id < i + chunkSize && id <= totalPokemons; id++){//Cada vez que cargue un lote de 50 este se cargara dentro individualmente
                chunkPromises.push(
                    fetch(`${this.BASE_URL}/${id}`)
                    .then(res => res.ok ? res.json() : null)
                    .catch(() => null) //Evito problemas ya que no estoy seguro de todas las id
                );
            }

            //Se ejecutan las 50 peticiones
            const chunkResults = await Promise.all(chunkPromises);

            //Mapeamos los resultados del lote
            for (const data of chunkResults){
                if (!data) continue; //Salta si no cargan correctamente los datos (Error en el fetch o me devuelve null)

                // Función auxiliar para extraer stats de forma segura por nombre
                const getStat = (statName: string) => 
                    data.stats.find((s: any) => s.stat.name === statName)?.base_stat || 0;

                pokemons.push({
                    id: data.id,
                    nombre: data.name,
                    urlStats: `${this.BASE_URL}/${data.id}`,
                    images: {
                        front: `${this.IMAGEN_URL_FRONT}${data.id}.gif`,
                        back: `${this.IMAGEN_URL_BACK}${data.id}.gif`,
                        extra_front: `${this.IMAGEN_EXTRA_FRONT}${data.id}.png`
                    },
                    stats: {
                        hp: getStat('hp'),
                        attack: getStat('attack'),
                        defense: getStat('defense'),
                        specialAttack: getStat('special-attack'),
                        specialDefense: getStat('special-defense'),
                        speed: getStat('speed')
                    }
                });
            }
            console.log(`Cargados hasta el ID: ${Math.min(i + chunkSize - 1, totalPokemons)}`);//Control de carga
        }

        console.log("Se han descargado todos los pokemon"); //Mensaje para la finalizacion del proceso
        return pokemons;
    }
}