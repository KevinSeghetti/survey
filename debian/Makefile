
PRODUCT = PRODUCT

# survey/survey/local_switches...

#bundle package --all --all-platforms

deb:
	export RAILS_ENV=production
	./pipsetup.py	# need local copies
	pwd
	cd ../survey/survey && npm install
	pwd
	export PYTHONPATH=`pwd`/localpythonlibraries/lib64/python3.5/site-packages/:`pwd`/localpythonlibraries/lib/python3.5/site-packages/
	cd ../survey && ( ./node_modules/.bin/webpack -p; ./manage.py migrate -v 0; ./manage.py collectstatic --noinput -i jsx -i '*.scss' -v 0; ./manage.py collectstatic --clear --noinput -i jsx -i '*.scss' -v 0; ./manage.py compilestatic )
	export VERSION=1.0-1
	export APP_DIR=app_${VERSION}
	sudo rm -rf package ; mkdir package && cd package
	pwd
	( cd package &&
		mkdir -p ${APP_DIR}/DEBIAN ;
		cp ../control ${APP_DIR}/DEBIAN/control ;
		export DEB_APP_DIR=${APP_DIR}/opt/app/ ;
		mkdir -p ${DEB_APP_DIR} ;
		cp -R ../.bundle/ ${DEB_APP_DIR} ;
		rsync -avz --exclude 'app/assets/' ../app ${DEB_APP_DIR} ;
		cp -R ../bin/ ${DEB_APP_DIR} ;
		cp -R ../config/ ${DEB_APP_DIR} ;
		cp -R ../config.ru ${DEB_APP_DIR} ;
		cp -R ../db/ ${DEB_APP_DIR} ;
		cp -R ../Gemfile* ${DEB_APP_DIR} ;
		cp -R ../gems/ ${DEB_APP_DIR} ;
		cp -R ../lib/ ${DEB_APP_DIR} ;
		cp -R ../log/ ${DEB_APP_DIR} ;
		cp -R ../public/ ${DEB_APP_DIR} ;
		mkdir ${DEB_APP_DIR}/public/uploads ;
		cp -R ../Rakefile ${DEB_APP_DIR} ;
		-sudo adduser --disabled-password deployer ;
		sudo chown -R deployer:staff ${APP_DIR} ;
		dpkg-deb -v --build app_${VERSION} ;
	)


#upload-to-repo:
#	ARCH=`dpkg --print-architecture`
#	PRODUCT=$(PRODUCT)
#	REPO=localhost
#	REPO_API=${REPO}:8081
#	curl -s ${REPO_API}/api/version
#	curl -s -X POST -F file=@/tmp/jenkins/workspace/app/package/app_1.0-1.deb ${REPO_API}/api/files/$PRODUCT
#	curl -s -X POST ${REPO_API}/api/repos/$PRODUCT/file/$PRODUCT
#	curl -s -X DELETE ${REPO_API}/api/publish//${PRODUCT}
#	cat | \
#	    perl -pe 's/\$(\w+)/$ENV{$1}/g' | \
#	    curl -s -X POST -H 'Content-Type: application/json' --data @- ${REPO_API}/api/publish/:. <<__EOF__
#{"SourceKind": "local", "Signing":{"Skip":true}, "Sources": [{"Name": "$PRODUCT"}], "Distribution": "$PRODUCT"}
#__EOF__


print:
	@echo PRODUCT = $(PRODUCT)
