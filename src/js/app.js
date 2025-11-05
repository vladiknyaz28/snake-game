import { Game } from './modules/game.js';
import '../styles.css';

const canvas = document.getElementById('game-field');
const context = canvas.getContext('2d');

const settings = { positionsCount: 30, positionsSize: 20 };
const game = new Game(context, settings);
