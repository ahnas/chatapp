from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'register', RegisterViewSet, basename='register')

urlpatterns = [
    path('', ApiRootView.as_view(), name='api-root'),  
    path('login/', LoginView.as_view(), name='login'),
]

urlpatterns += router.urls
