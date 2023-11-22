const { getServerSession } = require("next-auth")
const { default: Chat } = require(".")
const { authOptions } = require("@/app/api/auth/[...nextauth]/route")
const { fetchConversations } = require("@/features/chat/conversation/conversationThunk")

const ChatPage = async () => {

  const session =await getServerSession(authOptions)


  async function getUserConversations() {

    if (!session?.token) return 
    try {
   
      const request = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/chats`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${session?.token}`
        }
      })
      const response = await request.json()
      console.log(response?.userChats)
      return response?.userChats

    } catch (err) {
      console.log(err)
    }
  }

  const convos=await getUserConversations()
  return (
    <div>
      <Chat convos={convos} />
    </div>
  )
}
export default ChatPage