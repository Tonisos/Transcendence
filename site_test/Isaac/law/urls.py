from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name='index'),
    path("law0/", views.law0, name='law0'),
    path("sections/<int:num>", views.section, name='section'),
]
