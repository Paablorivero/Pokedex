export interface Pokemon {
    id: number;
    nombre: string;
    urlStats: string;
    images: {
        front: string;
        back: string;
        extra_front: string;
    };
    stats: {
        hp: number;
        attack: number;
        defense: number;
        speed: number;
        specialAttack: number;
        specialDefense: number;
    };
}
