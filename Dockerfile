FROM ubuntu:xenial
RUN apt-get update && apt-get install -y \
	nano \
	bzip2 \
	ffmpeg \
	xvfb \
	ca-certificates \
	openjdk-8-jre-headless \
	xz-utils \
	vim \
	sudo \
	wget \
	x11vnc \
&& 	sed -i 's/securerandom\.source=file:\/dev\/random/securerandom\.source=file:\/dev\/urandom/' ./usr/lib/jvm/java-8-openjdk-amd64/jre/lib/security/java.security
###############
# NodeJs
###############
RUN wget https://nodejs.org/dist/v6.11.4/node-v6.11.4-linux-x64.tar.xz \
&& 	tar -C /usr --strip-components 1 -xJf node-v6.11.4-linux-x64.tar.xz \
&&  npm install -g protractor@4.0.14 \
&&  webdriver-manager update
###############
# Chrome
###############
RUN wget http://www.slimjetbrowser.com/chrome/lnx/chrome64_55.0.2883.75.deb
RUN apt-get install -y \ 
	gconf-service \
	libasound2 \
	libatk1.0-0 \
	libcairo2 \
	libgconf-2-4 \
	libgdk-pixbuf2.0-0 \
	libglib2.0-0 \
	libgtk2.0-0 \
	libpango1.0-0 \ 
	libx11-xcb1 \
	libxss1 \
	fonts-liberation \
	libappindicator1 \
	xdg-utils \
	dbus-x11 \
&& 	dpkg -i chrome64_55.0.2883.75.deb \
&&  mv /opt/google/chrome/google-chrome /opt/google/chrome/mychrome \
&&  echo '#!/usr/bin/env bash' > /google-chrome \
&&  echo 'exec /opt/google/chrome/mychrome --no-sandbox --disable-gpu $@' >> /google-chrome \
&&  mv /google-chrome /opt/google/chrome/google-chrome \
&&  chmod +x /opt/google/chrome/google-chrome
###############
# Firefox
###############
RUN wget https://ftp.mozilla.org/pub/firefox/releases/46.0/linux-x86_64/en-US/firefox-46.0.tar.bz2 \
&& 	tar -C /usr/bin --strip-components 1 -xjf firefox-46.0.tar.bz2
###############
# User setup
###############
RUN useradd ulcuser --shell /bin/bash --create-home \
&&	usermod -a -G sudo ulcuser \
&&	echo 'ALL ALL = (ALL) NOPASSWD: ALL' >> /etc/sudoers \
&&	echo 'ulcuser:secret' | chpasswd
USER ulcuser 
WORKDIR /home/ulcuser
###############
# VNC Conf
###############
RUN	mkdir ~/.vnc \
&&	x11vnc -storepasswd 1234 ~/.vnc/passwd
###############
# Env setup
###############
ENV DISPLAY=:99 \
    SCREEN_SIZE=1200x768x24
###############
# Entrypoint
###############
COPY ["docker-entrypoint.sh","/docker-entrypoint.sh"]
ENTRYPOINT ["/docker-entrypoint.sh"]
#################################
# EXPOSE <VNC_PORT> <REPORTS_PORT>
#################################
EXPOSE 5900 8787