require('dotenv').config();
const tmi = require('tmi.js');

const cron = require("node-cron");
var express = require('express');
var cors = require('cors');
const db = require('./database/connection');
var app = express();

app.use(cors());
app.use(express.json());

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

app.get('/status', async (req, res) => {
  try {
    const databaseResult = await db('users').select("*").first()

    console.log("---- CHAMADA GET /status ----")
    console.log("---- Status servidor ----")
    console.log({
      status: true,
      data: databaseResult,
    })

    return res.status(200).json({
      status: true,
      data: databaseResult
    })
  } catch (error) {
    return res.status(500).json({
      status: false,
      data: error
    })
  }
})

app.post('/user', async (req, res) => {
  const { twitchUser } = req.body;

  console.log("---- CHAMADA POST /user ----")
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
    return res.status(500).json({
      status: false,
      data: error
    })
  }
})

app.post('/audio', async (req, res) => {
  const { twitchUser, command, channel } = req.body;

  console.log("---- CHAMADA POST /audio ----")
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

      console.log("To porraqui", insertDatabaseResult)

      if (insertDatabaseResult.errno) {
        return res.status(500).json(insertDatabaseResult)
      }

      if (insertDatabaseResult.length > 0) {
        return res.status(201).json({
          status: true,
          data: {
            name: twitchUser,
            command,
            channel,
            isSended: false,
          },
          row: insertDatabaseResult
        })
      }
    }
    catch (error) {
      console.log(error)
      return res.status(500).json({
        status: false,
        data: error
      })
    }
  } else {
    return res.status(500).json({
      status: false,
      data: databaseResult
    })
  }

});

app.get('/audio', async (req, res) => {

  try {
    const databaseResult = await db('messages').select("*").limit(10)

    console.log("---- CHAMADA GET /audio ----")
    console.log("---- Listando ultimas 10 mensagens ----")
    console.log(databaseResult)

    return res.status(200).json({
      status: true,
      data: databaseResult
    })
  } catch (error) {
    return res.status(500).json({
      status: false,
      data: error
    })
  }

});

cron.schedule("*/5 * * * * *", () => {
  const executeAsync = async () => {
    console.log("---- Executando Cron Envio de Mensagens ----")
    const lastMessageNotSend = await db("messages").select("*").where("isSended", "=", false)
      .orderBy('createdAt', 'asc').first()


    if (lastMessageNotSend) {
      try {
        // await client.say(lastMessageNotSend.channel, lastMessageNotSend.command + " enviado por: @" +lastMessageNotSend.name)
        await client.say(lastMessageNotSend.channel, lastMessageNotSend.command)

        console.log("---- Mensagem Enviada ----")
        console.log(lastMessageNotSend)

        await db("messages").where("id", "=", lastMessageNotSend.id).update({
          isSended: true
        })

      } catch (error) {
        console.log("---- Nenhuma Mensagem Enviada ----")
        console.log({
          status: false,
          data: error
        })
      }
    } else {
      console.log("---- Nenhuma Mensagem Enviada ----")
    }

  }
  executeAsync();

});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Aguardando comandos na porta ${process.env.PORT || 3000}`)
})