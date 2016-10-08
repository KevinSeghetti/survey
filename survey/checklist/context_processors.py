import json
import pprint
from itertools import chain
from django.shortcuts import render
from django.shortcuts import get_object_or_404, get_list_or_404,render
from django.http import HttpResponseRedirect, HttpResponse, Http404, JsonResponse
from django.shortcuts import redirect
from django.views.decorators.csrf import csrf_protect
from django.core import serializers
from django.db import transaction
from django.core.urlresolvers import reverse
from django.core import serializers

from survey.settings import APP_NAME,SFW,DEBUG_LOGGING,DEBUG,PRODUCTION


def app_globals(httpRequest):
    return {
        'APP_NAME'    : APP_NAME,
        'SFW'         : SFW,
        'DEBUG'       : DEBUG,
        'PRODUCTION'  : PRODUCTION,

    }


