from django import template
from django.db.models.query import QuerySet
from django.utils.safestring import mark_safe
import json
import pprint

register = template.Library()


@register.filter
def get_type(value):
    return type(value)


@register.filter
def jsonify(object):
    if isinstance(object, QuerySet):
        return mark_safe(serialize('json', object))
    return mark_safe(json.dumps(object))

@register.filter
def addstr(arg1,arg2):
    """concatenate arg1 and arg2"""
    return str(arg1)+ str(arg2)
                
@register.filter
def listvalue(var, key):
    #print("listvalue: key = ",key)
    #pprint.pprint(var)
    try:
        if type(key) != 'int':
            key = int(key)
        result = var[key]
    except:
        result = None
    #print("returning")
    #pprint.pprint(result)
    return result

@register.filter
def keyvalue(var, key):   
    if isinstance(var,dict): 
        return var.get(key)
    return None

@register.filter
def objgetattr(var, key):
    #print("key = ")
    #pprint.pprint(key)
    if(var): 
        return getattr(var,key)
    return None

@register.filter
def integer(value):
    if value:
        return int(value)
    return value


@register.filter
def dump(dict,name=""):
    print("dumping", name, ":", end="") 
    pprint.pprint(dict)   
    return "dump"


