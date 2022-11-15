require('dotenv').config();
const tmi = require('tmi.js');

const cron = require("node-cron");
var express = require('express');
var cors = require('cors');
const db = require('./database/connection');
var app = express();

app.use(cors());
app.use(express.json());

// const regexpCommand = new RegExp(/^!([a-zA-z0-9]+)(?:\W+)?(.*)?/);

const client = new tmi.Client({
  connection: {
    reconnect: true,
  },
  identity: {
    username: process.env.TWITCH_BOT_USERNAME,
    password: process.env.TWITCH_OAUTH_TOKEN,
  },
  channels: [
    'colonogamer',
    'batera'
  ]
});

client.connect();

// client.on("message", (channel, tags, message, self) => {
//   // const isNotBot = tags.username.toLocaleLowerCase() !== process.env.TWITCH_BOT_USERNAME;

//   // if (!isNotBot) return;

//   if (message) {
//     const [raw, command, argument] = message.match(regexpCommand);
//     if (command === "ping") {
//       client.say("Status do bot: Ok")
//       console.log("Status do bot: Ok")
//     }
//   }

// })

app.get('/status', async (req, res) => {
  const databaseResult = await db('users').select("*").first()

  console.log("---- CHAMADA /status ----")
  console.log("---- Status servidor ----")
  console.log({
    status: true,
    data: databaseResult,
  })

  return res.status(200).json({
    status: true,
    data: databaseResult,
  })
})

app.post('/user', async (req, res) => {
  const { twitchUser } = req.body;

  console.log("---- CHAMADA /user ----")
  console.log("---- Adicionando usuario na lista de permissões ----")
  console.log({ twitchUser })

  try {
    const insertDatabaseResult = await db("users").insert({
      name: twitchUser
    })

    if (insertDatabaseResult.errno) {
      return res.status(500).json(insertDatabaseResult)
    }

    if (insertDatabaseResult.length > 0) {
      return res.status(201).json({ message: "ok" })
    }
  }
  catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
})

app.post('/audio', async (req, res) => {
  const { twitchUser, command, channel } = req.body;

  console.log("---- CHAMADA /audio ----")
  console.log("---- Adicionando mensagem na fila ----")
  console.log({ twitchUser, command, channel })

  const databaseResult = await db('users').select("*").where("name", "=", twitchUser).first()

  if (databaseResult) {
    try {
      const insertDatabaseResult = await db("messages").insert({
        name: twitchUser,
        command,
        channel,
        isSended: false,
      })

      if (insertDatabaseResult.errno) {
        return res.status(500).json(insertDatabaseResult)
      }

      if (insertDatabaseResult.length > 0) {
        return res.status(201).json({ message: "ok" })
      }
    }
    catch (error) {
      console.log(error)
      return res.status(400).json(error)
    }
  }

});

cron.schedule("*/3 * * * * *", () => {
  const executeAsync = async () => {
    console.log("---- Executando Cron Envio de Mensagens ----")
    const lastMessageNotSend = await db("messages").select("*").where("isSended", "=", false)
      .orderBy('createdAt', 'asc').first()


    if (lastMessageNotSend) {
      client.say(lastMessageNotSend.channel, lastMessageNotSend.command)

      await db("messages").where("id", "=", lastMessageNotSend.id).update({
        isSended: true
      })
    }

  }
  executeAsync();

});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Aguardando comandos na porta ${process.env.PORT || 3000}`)
})