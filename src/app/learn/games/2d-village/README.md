# 2D Village Game

This is a simple 2D village exploration game built with HTML5 Canvas and React. The player can move around a village, visit houses to gain points, and avoid trees.

## Game Features

- Move the character with arrow keys or WASD
- Visit houses to gain 10 points
- Avoid trees to prevent losing 5 points
- Explore the village at your own pace

## Image Assets

The game now automatically generates all required images at runtime using canvas drawing. There's no need to create or install external image files.

### Asset Generation

All game assets (player, houses, trees, and background) are procedurally generated when the game loads:
- `player` - A small character (blue body with yellow head)
- `house` - A simple house with windows and door
- `tree` - A basic tree with trunk and foliage
- `background` - A village scene with sky, grass and path

## Customization Ideas

Feel free to customize the game further:
- Add more houses or trees
- Create different types of obstacles
- Add a time limit or a goal to reach
- Implement power-ups or collectibles

## Technical Details

The game is built using:
- React for UI components
- HTML5 Canvas for game rendering
- TypeScript for type safety

All game logic is contained within the single page component, making it easy to understand and modify.

## Credits

The 2D village game concept is inspired by "Village, country road, country house and farm" by Metazeon, licensed under Creative Commons Attribution 4.0. 