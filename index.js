// Require the necessary discord.js classes
const {Client, Intents} = require('discord.js');
const axios = require('axios');
require('dotenv').config()


// Create a new client instance
const client = new Client({intents: [Intents.FLAGS.GUILDS]});

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('Ready!');
});


async function handleBalance(interaction) {
    const user = interaction?.options?.getUser('target');
    const {wallet} = await axios.get(process.env.API_URL + '/balance/' + (user?.id || interaction?.user?.id))

    if (user) {
        return interaction.reply({
            content: `Le citoyen ${user.tag} disposer de ${wallet} fuf`, ephemeral: true
        });
    }
    return interaction.reply({
        content: `Vous disposer de ${wallet} fuf`, ephemeral: true
    });
}

async function handleTransaction(interaction) {

    const target = interaction?.options?.getUser('target');
    const arbitre = interaction?.options?.getUser('arbitre');
    const montant = interaction?.options?.getInteger('montant');

    const {data} = await axios.post(process.env.API_URL + '/transaction', {
        amount: montant,
        to: target.id,
        from: interaction.user.id,
        arbitrator: arbitre.id
    })
    console.log(data)

    return interaction.reply('oui');


}


client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const {commandName} = interaction;

    switch (commandName) {
        case 'ping':
            return interaction.reply('Pong!');
        case 'wallet':
            return await handleBalance(interaction);
        case 'transaction':
            return await handleTransaction(interaction);
        default:
            await interaction.reply("Wala j'ai pas compris");
    }
});


// Login to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);
