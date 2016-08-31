"""
Django settings for bdsm_checklist project.

Generated by 'django-admin startproject' using Django 1.8.4.

For more information on this file, see
https://docs.djangoproject.com/en/1.8/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.8/ref/settings/
"""

# default switches
SFW = 0
PRODUCTION=False
ALLOWED_HOSTS = []

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'b!ijq8j8rfa*-rqs=lycc*69wij_+kuzda0_e7g1pu&4+i0-7l'

# pull in any switches from a local settings file
# this file might not exist, so we ignore any errors
# which means syntax errors in this file will quietly be
#  ignored. For debugging, uncomment the following line,
# which will show any errors (but also fail if there is
# no local_settings.py file

#from .local_switches import *

try:
    from .local_switches import *
except ImportError as e:
    pass

if PRODUCTION:
     DEBUG = False
else:
    # SECURITY WARNING: don't run with debug turned on in production!
    DEBUG = True

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

if SFW:
    APP_NAME = "Sports Quiz"
    DBNAME = 'sports_checklist.sq3'
else:
    APP_NAME = "BDSM Quiz"
    DBNAME = 'bdsm_checklist.sq3'

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.8/howto/deployment/checklist/



# Application definition

INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    "static_precompiler",
    'rest_framework',
    'registration',
    'checklist',
)


REGISTRATION_OPEN = True            # If True, users can register
ACCOUNT_ACTIVATION_DAYS = 7         # One-week activation window; you may, of course, use a different value.
REGISTRATION_AUTO_LOGIN = True      # If True, the user will be automatically logged in.
LOGIN_REDIRECT_URL = '/checklist/'  # The page you want users to arrive at after they successful log in
LOGIN_URL = '/accounts/login/'      # The page users are directed to if they are not logged in,
                                    # and are trying to access pages requiring authentication


MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.middleware.security.SecurityMiddleware',
)

ROOT_URLCONF = 'bdsm_checklist.urls'



TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'checklist.context_processors.app_globals',
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'bdsm_checklist.wsgi.application'


# Database
# https://docs.djangoproject.com/en/1.8/ref/settings/#databases

#DATABASES = {
#    'default': {
#        'ENGINE': 'django.db.backends.sqlite3',
#        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
#    }
#}

PROJECT_DIR = os.path.dirname(__file__)
DBFULLPATH=os.path.join(PROJECT_DIR,DBNAME)

DATABASES = {
        'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': DBFULLPATH,
    },


#    'default': {
#        'ENGINE': 'django.db.backends.postgresql_psycopg2',
#        'NAME':  'bdsm_checklist',
#        'USER': 'bdsm_checklist',
#        'PASSWORD': 'oj9387gy2hb0s',
#        'HOST': '127.0.0.1',
#        'PORT': '5432',
#    },
#    'default': {
#        # mysql -u tenettiquiz2 -p -h mysql.quiz.tenetti.org tenetti_quiz 
#        # You can also go to http://mysql.quiz.tenetti.org/ to manage your MySQL database from the web.
#        'ENGINE': 'mysql.connector.django',
#        'NAME':  'tenetti_quiz',
#        'USER': 'tenettiquiz2',
#        'PASSWORD': 'oj9387gy2hb0s',
#        'HOST': 'mysql.quiz.tenetti.org',
#        'PORT': '5432',
#    }

}

# REST FRAMEWORK

REST_FRAMEWORK = {
    'PAGE_SIZE': 10,


    # Use Django's standard `django.contrib.auth` permissions,
    # or allow read-only access for unauthenticated users.
    'DEFAULT_PERMISSION_CLASSES': [
        # kts TODO: learn more about Django REST interface authentication model

#        'rest_framework.permissions.IsAdminUser',
   'rest_framework.permissions.AllowAny',

        # right now, if I enable this, it won't let us view details
#        'rest_framework.permissions.DjangoModelPermissions'
#        'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly'
    ],
    'DEFAULT_RENDERER_CLASSES': (
        'rest_framework.renderers.JSONRenderer',
        'rest_framework.renderers.BrowsableAPIRenderer',
    )
}



# Internationalization
# https://docs.djangoproject.com/en/1.8/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'US/Pacific'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.8/howto/static-files/

STATIC_URL = '/static/'

STATIC_ROOT = os.path.dirname(BASE_DIR) + '/public/static/'

STATICFILES_DIRS = (
    os.path.join(BASE_DIR, "static"),
)




if DEBUG:
    import mimetypes
    mimetypes.add_type("text/x-handlebars-template", ".handlebar", True)

#===============================================================================

STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
    # other finders..
    'static_precompiler.finders.StaticPrecompilerFinder',
)

STATIC_PRECOMPILER_COMPILERS = (
    'static_precompiler.compilers.CoffeeScript',
    ('static_precompiler.compilers.Babel', {
        "executable": os.path.join(BASE_DIR, "node_modules/babel-cli/bin/babel.js"),
        # kts TODO: dev version of django-static-precompiler has support for babel sourcemaps.
        # as soon as it is released add it here
        # "sourcemap_enabled": True,
        "plugins": "transform-react-jsx"
    }),


    ('static_precompiler.compilers.SCSS', {
        "sourcemap_enabled": True,
#        "compass_enabled": True,
        "load_paths": [os.path.join(BASE_DIR, "static/css")],
        "precision": 8,
#        "output_style": "compressed",

    }),
#    'static_precompiler.compilers.SASS',
#    'static_precompiler.compilers.LESS',
#    'static_precompiler.compilers.Stylus',
)



# pull in any overrides from a local settings file
# this file might not exist, so we ignore any errors
# which means syntax errors in this file will quietly be
#  ignored. For debugging, uncomment the following line,
# which will show any errors (but also fail if there is
# no local_settings.py file

#from .local_overrides import *

try:
    from .local_overrides import *
except ImportError as e:
    pass


