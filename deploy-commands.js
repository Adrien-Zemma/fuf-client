const {SlashCommandBuilder} = require('@discordjs/builders');
const {REST} = require('@discordjs/rest');
const {Routes} = require('discord-api-types/v9');
require('dotenv').config()

const commands = [
    new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
    new SlashCommandBuilder().setName('wallet').setDescription("Vous informe du contenu du porte monnai d'un citoyen").addUserOption(option => option.setName('target').setDescription('Le citoyen souhaiter')),
    new SlashCommandBuilder().setName('transaction')
        .setDescription("Crée une transaction ")
        .addUserOption(option => option.setName('target').setDescription('Le citoyen souhaiter').setRequired(true))
        .addUserOption(option => option.setName('arbitre').setDescription('Le citoyen qui assure que le service est été rendu').setRequired(true))
        .addIntegerOption(option => option.setName('montant').setDescription('La somme qui sera versé').setRequired(true))


]
    .map(command => command.toJSON());

const rest = new REST({version: '9'}).setToken(process.env.DISCORD_TOKEN);

rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), {body: commands})
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);
