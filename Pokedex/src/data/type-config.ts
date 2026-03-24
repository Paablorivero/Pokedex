export interface TypeInfo {
    name: string;
    nameEs: string;
    color: string;
    icon: string;
}

export const TYPE_CONFIG: Record<string, TypeInfo> = {
    normal:   { name: 'normal',   nameEs: 'Normal',    color: '#A8A77A', icon: '⬤' },
    fire:     { name: 'fire',     nameEs: 'Fuego',     color: '#EE8130', icon: '🔥' },
    water:    { name: 'water',    nameEs: 'Agua',      color: '#6390F0', icon: '💧' },
    electric: { name: 'electric', nameEs: 'Eléctrico', color: '#F7D02C', icon: '⚡' },
    grass:    { name: 'grass',    nameEs: 'Planta',    color: '#7AC74C', icon: '🌿' },
    ice:      { name: 'ice',      nameEs: 'Hielo',     color: '#96D9D6', icon: '❄️' },
    fighting: { name: 'fighting', nameEs: 'Lucha',     color: '#C22E28', icon: '🥊' },
    poison:   { name: 'poison',   nameEs: 'Veneno',    color: '#A33EA1', icon: '☠️' },
    ground:   { name: 'ground',   nameEs: 'Tierra',    color: '#E2BF65', icon: '⛰️' },
    flying:   { name: 'flying',   nameEs: 'Volador',   color: '#A98FF3', icon: '🕊️' },
    psychic:  { name: 'psychic',  nameEs: 'Psíquico',  color: '#F95587', icon: '🔮' },
    bug:      { name: 'bug',      nameEs: 'Bicho',     color: '#A6B91A', icon: '🐛' },
    rock:     { name: 'rock',     nameEs: 'Roca',      color: '#B6A136', icon: '🪨' },
    ghost:    { name: 'ghost',    nameEs: 'Fantasma',   color: '#735797', icon: '👻' },
    dragon:   { name: 'dragon',   nameEs: 'Dragón',    color: '#6F35FC', icon: '🐉' },
    dark:     { name: 'dark',     nameEs: 'Siniestro', color: '#705746', icon: '🌑' },
    steel:    { name: 'steel',    nameEs: 'Acero',     color: '#B7B7CE', icon: '⚙️' },
    fairy:    { name: 'fairy',    nameEs: 'Hada',      color: '#D685AD', icon: '🧚' },
};

export const ALL_TYPE_NAMES = Object.keys(TYPE_CONFIG);

export function getTypeInfo(typeName: string): TypeInfo {
    return TYPE_CONFIG[typeName] || { name: typeName, nameEs: typeName, color: '#888', icon: '?' };
}
