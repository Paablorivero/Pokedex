import type { Pokemon, FrontSprite } from '../types/pokemon';

export type { Pokemon };

const GEN_RANGES: [number, number][] = [
    [1, 151],     // Gen 1
    [152, 251],   // Gen 2
    [252, 386],   // Gen 3
    [387, 493],   // Gen 4
    [494, 649],   // Gen 5
    [650, 721],   // Gen 6
    [722, 809],   // Gen 7
    [810, 905],   // Gen 8
    [906, 1025],  // Gen 9
];

function getGeneration(id: number): number {
    for (let i = 0; i < GEN_RANGES.length; i++) {
        if (id >= GEN_RANGES[i][0] && id <= GEN_RANGES[i][1]) return i + 1;
    }
    return 9;
}

function extractFrontSprites(sprites: any): FrontSprite[] {
    const result: FrontSprite[] = [];

    if (sprites.front_default)
        result.push({ label: 'Default', url: sprites.front_default });
    if (sprites.front_shiny)
        result.push({ label: 'Shiny', url: sprites.front_shiny });

    const other = sprites.other || {};

    if (other['official-artwork']?.front_default)
        result.push({ label: 'Official Artwork', url: other['official-artwork'].front_default });
    if (other['official-artwork']?.front_shiny)
        result.push({ label: 'Official Artwork Shiny', url: other['official-artwork'].front_shiny });
    if (other.dream_world?.front_default)
        result.push({ label: 'Dream World', url: other.dream_world.front_default });
    if (other.home?.front_default)
        result.push({ label: 'Home', url: other.home.front_default });
    if (other.home?.front_shiny)
        result.push({ label: 'Home Shiny', url: other.home.front_shiny });
    if (other.showdown?.front_default)
        result.push({ label: 'Showdown', url: other.showdown.front_default });
    if (other.showdown?.front_shiny)
        result.push({ label: 'Showdown Shiny', url: other.showdown.front_shiny });

    return result;
}

export const  PokeService = {
    BASE_URL: 'https://pokeapi.co/api/v2/pokemon',

    IMAGEN_URL_FRONT: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/back/',
    IMAGEN_URL_BACK: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/',

    IMAGEN_EXTRA_FRONT: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/',

    async getPokedex(): Promise<Pokemon[]> {
        const totalPokemons = 1350;
        const pokemons: Pokemon[] = [];
        const chunkSize = 250;

        console.log(`Iniciando descarga de ${totalPokemons} Pokémon por lotes... `);

        for (let i = 1; i <= totalPokemons; i += chunkSize){
            const chunkPromises = [];

            for (let id = i; id < i + chunkSize && id <= totalPokemons; id++){
                chunkPromises.push(
                    fetch(`${this.BASE_URL}/${id}`)
                    .then(res => res.ok ? res.json() : null)
                    .catch(() => null)
                );
            }

            const chunkResults = await Promise.all(chunkPromises);

            for (const data of chunkResults){
                if (!data) continue;

                const getStat = (statName: string) => 
                    data.stats.find((s: any) => s.stat.name === statName)?.base_stat || 0;

                pokemons.push({
                    id: data.id,
                    nombre: data.name,
                    generation: getGeneration(data.id),
                    urlStats: `${this.BASE_URL}/${data.id}`,
                    images: {
                        front: `${this.IMAGEN_URL_FRONT}${data.id}.gif`,
                        back: `${this.IMAGEN_URL_BACK}${data.id}.gif`,
                        extra_front: `${this.IMAGEN_EXTRA_FRONT}${data.id}.png`
                    },
                    frontSprites: extractFrontSprites(data.sprites),
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
            console.log(`Cargados hasta el ID: ${Math.min(i + chunkSize - 1, totalPokemons)}`);
        }

        console.log("Se han descargado todos los pokemon");
        return pokemons;
    }
}