#!/usr/bin/env bash

#start dbus service for chrome
sudo service dbus start

#remove display lock files
sudo rm -f /tmp/.X*-lock

#start xvfb
sudo Xvfb $DISPLAY -screen 0 $SCREEN_SIZE &
echo Waiting for Xvfb...
sleep 10s

#start vnc server
x11vnc -forever -usepw
