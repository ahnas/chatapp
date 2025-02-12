from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import ChatbotMessageSerializer

class ChatbotAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"message": "Welcome to the Chatbot API!"})

    def post(self, request):
        serializer = ChatbotMessageSerializer(data=request.data)
        
        if serializer.is_valid():
            message = serializer.validated_data.get('message')
            response_message = f"You said: {message}"
            return Response({"message": response_message})
        
        return Response({"error": "Invalid message data"}, status=400)
