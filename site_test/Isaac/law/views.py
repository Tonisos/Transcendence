from django.shortcuts import render
from django.http import HttpResponse, Http404


# Create your views here.
def index(request):
    return render(request, "law/index.html")

def law0(request):
    return render(request, "law/law0.html")

texts = ["A robot may not injure a human being or, through inaction, allow a human being to come to harm",
        "A robot must obey the orders given it by human beings except where such orders would conflict with the First Law",
        "A robot must protect its own existence as long as such protection does not conflict with the First or Second Law",
        ""]

def section(request, num):
    if 1 <= num <= 4:
        return HttpResponse(texts[num-1])
    else:
        raise Http404("No such section")
