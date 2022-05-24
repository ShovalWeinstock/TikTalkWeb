import mondayMorning from '../mondayMorning.jpeg'
import shabbatShalom from '../shabbatShalom.mp4'
import dishes from '../dishes.jpg';
import indian from '../indian.mpeg';


const hardCodedMsg = [
      {
         nickname: "grandma", chats: [{ type: "image", sentBy: "sentByOther", content: mondayMorning, currTime: "2022-4-11 | 19:18" },
         { type: "video", sentBy: "sentByOther", content: shabbatShalom, currTime: "2022-4-15 | 16:18" }
         ]
      },

      {
         nickname: "roomie", chats: [{ type: "image", sentBy: "sentByOther", content: dishes, currTime: "2022-4-16 | 19:18" },
         { type: "text", sentBy: "sentByOther", content: "clean it up", currTime: "2022-4-16 | 19:18" }
         ]
      },

      {
         nickname: "dude", chats: [{ type: "text", sentBy: "sentByOther", content: "She doesn't even go here", currTime: "2022-4-16 | 19:18" }
         ]
      },

      {
         nickname: "Gili", chats: [{ type: "text", sentBy: "sentByOther", content: "Hi", currTime: "2022-4-16 | 19:18" },
         { type: "text", sentBy: "sentByOther", content: "How are you?", currTime: "2022-4-16 | 19:18" },
         { type: "audio", sentBy: "sentByOther", content: indian, currTime: "2022-4-16 | 19:18" }
         ]
      },

      {
         nickname: "Shir", chats: [{ type: "text", sentBy: "sentByOther", content: "Hi", currTime: "2022-4-16 | 19:18" },
         { type: "text", sentBy: "sentByOther", content: "Whats up?", currTime: "2022-4-16 | 19:18" }
         ]
      }
   ]



const messages = [
   {
      username: "shoval", userChats: hardCodedMsg
   },


   {
      username: "itamar", userChats: hardCodedMsg
   }
]


export default messages;