from django.contrib.auth.models import User
from rest_framework import status, permissions, generics, viewsets
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import RegisterSerializer, UserSerializer, LoginSerializer
from rest_framework.views import APIView
from django.http import JsonResponse
from rest_framework.permissions import AllowAny 



def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

class ApiRootView(APIView):
    permission_classes = [AllowAny]
    def get(self, request, *args, **kwargs):
        api_urls = {
            'register': 'http://127.0.0.1:8000/api/register/',
            'login': 'http://127.0.0.1:8000/api/login/',
            'chat' : 'http://127.0.0.1:8000/chat/chatbot/'
        }
        return Response(api_urls)

class RegisterViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        tokens = get_tokens_for_user(user)
        return Response(
            {"message": "User registered successfully!", "user": UserSerializer(user).data, "tokens": tokens},
            status=status.HTTP_201_CREATED
        )

class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        tokens = get_tokens_for_user(user)
        return Response({"message": "Login successful!", "user": UserSerializer(user).data, "tokens": tokens})
