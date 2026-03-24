export interface FrontSprite {
    label: string;
    url: string;
}

export interface Pokemon {
    id: number;
    nombre: string;
    urlStats: string;
    generation: number;
    images: {
        front: string;
        back: string;
        extra_front: string;
    };
    frontSprites: FrontSprite[];
    stats: {
        hp: number;
        attack: number;
        defense: number;
        speed: number;
        specialAttack: number;
        specialDefense: number;
    };
}
