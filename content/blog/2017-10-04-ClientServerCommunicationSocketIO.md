---
title: Client/Server Strategy with SocketIO
---

I'm currently creating a text-based browser MMO. I'm using SocketIO to facilitate the client-server communication, as opposed to the AJAX requests typically seen in this kind of game.

I chose SocketIO in order to provide more functionality, like being able to see live what other players in your current location are doing, when players join / leave, and a robust chat system. All things not possible (or messy and slow at the very least) with AJAX.

However, that meant setting up more complicated client-server communication due to the fact that it's not request-based, but event-based logic.

### Choosing My Tech
I decided to use [Vue](https://vuejs.org/) as the front-end of the project, as I'm using it at work and wanted to get some more experience with the framework. Plus it's just a joy to use.

With that in mind, I decided to go with [Nuxt](https://nuxtjs.org/) as my framework of choice. Nuxt allows you to build isomorphic (or universal, pick your fancy word) applications by letting the code be run on either the client or server side. Perfect for wanting to use SocketIO.

Finally, I used [NodeJS](https://nodejs.org/) as the back-end. Since SocketIO is an event-driven technology anyway, Node seemed like the perfect fit. Plus I'll be able to scale well and handle a large number of concurrent users. Perfect for an MMO.

### The Workflow
Because this is a multiplayer game, it's safe to assume that all players are cheaters. Because of this, the client's *only* role is to handle state and present it to the user.

**All logic happens server-side.**

This means the client emits an event to the server, which handles all the logic and validation. The server then updates state in the database and emits an event back to the client. Finally the client updates its store and presents the data back to the player.

Because we're using SocketIO, this round trip is blazing fast and the player will feel like his actions are happening instantaneously. Something AJAX can't do.

So let's get into the nitty-gritty.

Here's a diagram showing the workflow:

<div align="center">

![Workflow](/clientserverstrategy/workflow.png)

</div>

Let's break it down.

#### The Component
This is an individual component on the client side. This could be a chat box, map element, or set of buttons presenting actions to the user.

The component dispatches a Vuex action, like so:

```javascript

// Client-side Component
// This is called in the component template with @submit="sendMessage"

export default {
  methods: {
    sendMessage (e) {
      e.preventDefault()
      const newChat = {
        name: this.chat.name,
        author: 'You',
        message: this.newMessage
      }
      this.$store.dispatch('chat/createMessage', newChat)
      this.newMessage = ''
    }
  }
}
```

Each component only cares about assembling data and dispatching actions to the store. This keeps our component methods clean and readable.

The component also gets its data from the Vuex store. This means we can set up grabbing the data once and then leave it. Great!

```javascript

// Client-side Component
export default {
  computed: {
    chats () { return this.$store.state.chat.list }
  }
}
```

---

#### Vuex Store
This is where the meat of the client-side logic happens. While components only care about receiving and sending data, the store cares about updating state.

All my store objects are namespaced into modules. This means all chat-related actions and mutations happen in `/store/chat.js`. This means I can also name my actions more freely. For example `$store.dispatch('chat/createMessage')` in the store is actually just `createMessage`, but in the `chat` namespace.

More on this at the end of the post, but honestly I think this is a no-brainer if you expect your project to reach any sort of scale.

So in the store's chat module, we handle the action dispatched by the component:

```javascript

// Client-side /store/chat.js
actions: {
  createMessage ({ commit }, message) {
    socket.emit('createMessage', message)
  }
}
```

Because actions are asynchronous, we could do a lot more in this action if we wanted to. Maybe we emit multiple events to the server. Or maybe we check the message for nasty language before processing it. Use your imagination.

This pretty solidly future-proofs our actions so we can scale as much as we need.

**So what's next?** The client has emitted an event via SocketIO to the server so let's head over there and see what's happening.

---

#### Server Store
Now this isn't Vuex but it's still separated by directory structure so that it acts the same way the client-side store does.

In my `/sockets/chat.js` file, I can see all incoming events and then send out actions to my controllers.

We don't receive events directly on the controllers for the same reason we don't emit events directly on components client-side. We want to make room for scale.

So in the future, when we add a new feature (like private chat groups for example), we can simply add a controller method (or a whole new store/controller combo) to our `/sockets/chat.js` file and we're good to go. No need to get spaghetti code everywhere in our controllers.

So an example of server store:

```javascript

// Server-side /sockets/chat.js
chat.on('connection', (client) => {
  client.on('createMessage', function (data) {
    chat.emit('broadcastMessage', data)
  })
})
```

In this case, we don't use a controller yet, we're just emitting the data right back to the client.

But if we wanted to, we could:

```javascript

// Server-side /sockets/chat.js
const ChatController = require('../controllers/ChatController')

chat.on('connection', (client) => {
  client.on('createMessage', function (data) {
    let cleanText = ChatController.noSwearing(data)
    chat.emit('broadcastMessage', cleanText)
  })
})
```

Plus we could emit other events, call as many controller methods as we want, and generally just add logic willy-nilly without stressing too much. If it gets *too* crazy, just abstract some method calls into a single method.

Plus doing it this way allows us to keep our code extremely readable and testable (yay!). You don't need to look at the controller to know what it does.

If you needed to do a DB lookup with the player's data, you could just pass through the SocketIO object (which you attach the player ID to during authentication) and do all your logic straight from the method.

Excellent.

And really, that's all you should ever need. Since we don't trust the client, we are only receiving what the client *wants* to do. Then we do all our checking and the actual action on the server. So all you'll ever need is intent and a player ID.

---

### Back to the Vuex Store
Once the server does its logic, it will emit an event containing only the data the client needs to update.

This gets pulled into the store on the client side:

```javascript

// Client-side /store/chat.js
io: (store) => {
  socket.on('broadcastMessage', (data) => {
    store.commit('chat/createMessage', data)
  })
}
```

You can see that after we've received the event, we commit a mutation which changes the state. We're also namespacing the commit, which we mentioned earlier and we'll go into more depth in a second.

```javascript

// Client-side /store/chat.js
mutations: {
  createMessage (state, chat) {
    state.list[chat.name].messages.push({
      author: chat.author,
      message: chat.message
    })
  }
}
```

This gets received by the component, which updates the view for the user. Full circle!

Let's dig a little bit deeper to see how exactly the store-to-store (client/server) communication works:

---

#### Keeping Things Clean
You may have noticed that we didn't namespace our SocketIO events. "Won't that get terribly messy?" you think...

Well...technically we did.

This is because they're already namespaced.

On the client-side we have our events namespaced automatically due to the namespacing of Vuex.

On the server-side, we namespace our events by separating our logic into equivalently-named files under `/sockets/`.

Let's see:

```javascript

// Client-side directory structure
- /store
  - index.js // Handles importing all the modules
  - chat.js
  - map.js
  - etc.js

// Server-side directory structure
- /sockets
  - index.js // Handles importing all the modules
  - chat.js
  - map.js
  - etc.js
```

Because of this matching, we can work confidently knowing that namespaces are equal across client and server and our event logic stays isolated. The way it should be.

"But wait, you can't just name files the same and expect things to just work?"

Right you are.

Let's see what these `index.js` files look like.

```javascript

// Client-side /store/index.js
import Vuex from 'vuex'
import io from '~/plugins/socket.io'

// Import components
import chatModule from './chat'
import mapModule from './map'
import authModule from './auth'

// Set up the modules by passing them a namespaced SocketIO instance
const chat = chatModule(io.chat)
const map = mapModule(io.map)
const auth = authModule(io.auth)

const store = () => {
  return new Vuex.Store({
    modules: {
      chat,
      map,
      auth
    },
    plugins: [
      chat.io,
      map.io
    ]
  })
}

export default store
```

The code is clean, self-documenting and easily expandable.

What about the server-side?

```javascript

// Server-side /sockets/index.js
const socketio = require('socket.io')

// Get the modules
const handleChat = require('./chat')
const handleMap = require('./map')

// Export this as a module that can easily be called in our server's root index.js
module.exports.listen = function (app) {
  const io = socketio.listen(app)

  // Pass through the SocketIO object
  handleChat(io)
  handleMap(io)
}
```

And then we add namespacing in each individual module:

```javascript

// Server-side /sockets/chat.js
module.exports = function (io) {
  const chat = io.of('/chat') // Set the namespace here

  // Listen for events like normal
  chat.on('connection', (client) => {
    client.on('createMessage', function (data) {
      chat.emit('broadcastMessage', data)
    })
  })
}
```

Because we set things up this way, we have flexibility to add lots of new features without worrying about cluttering anything up.

If we need, we can just throw some logic into its own module, match it up with the module on the client-side, and we're done.

It just works.
