import json
from channels.generic.websocket import AsyncWebsocketConsumer

class ChatBotConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        data = json.loads(text_data)
        user_message = data.get('message', '')

        if user_message.lower() == "hello":
            bot_response = "Hello, how are you?"
        else:
            bot_response = f"You said: {user_message}"

        await self.send(text_data=json.dumps({"message": bot_response}))
