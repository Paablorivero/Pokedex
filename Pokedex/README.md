# Pokédex

Pokédex interactiva construida con [Astro](https://astro.build) que muestra los 151 Pokémon originales usando la [PokéAPI](https://pokeapi.co/).

## Estructura del proyecto

```
src/
├── components/
│   ├── PokedexGrid.astro      # Rejilla principal con todas las tarjetas
│   ├── PokemonCard.astro      # Tarjeta individual de cada Pokémon
│   └── SplashScreen.astro     # Pantalla de carga con animación de Pokeball
├── layouts/
│   └── Layout.astro           # Layout base HTML con estilos globales
├── pages/
│   ├── index.astro            # Landing page
│   └── pokedex.astro          # Página principal de la Pokédex
├── services/
│   └── pokemon.service.ts     # Servicio para obtener datos de la PokéAPI
└── types/
    └── pokemon.ts             # Interfaz TypeScript de Pokemon
```

## Comandos

| Comando             | Acción                                       |
| :------------------ | :------------------------------------------- |
| `npm install`       | Instala las dependencias                     |
| `npm run dev`       | Inicia el servidor de desarrollo en `localhost:4321` |
| `npm run build`     | Genera el sitio de producción en `./dist/`   |
| `npm run preview`   | Previsualiza el build antes de desplegar     |
