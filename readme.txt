download imager https://www.raspberrypi.org/software/
create file ssh
https://www.advanced-ip-scanner.com/ru/

sudo raspi-config
network={
 ssid="TP-LINK_D696CE"
 psk="Oracledb_11"
 key_mgmt=WPA-PSK
}

L200
0968236492


raspberrypi.local

sudo reboot

crontab -e
 and use nano
@reboot node /home/pi/radio/index.js >> /home/pi/radio/out.txt 2>&1

http://www.lcdwiki.com/3.5inch_RPi_Display

sudo apt-get install unclutter

nano /home/pi/.config/lxsession/LXDE-pi/autostart
unclutter -idle 0.5 -root
chromium-browser --disable-features=AudioServiceOutOfProcess --kiosk http://localhost:3000/index.html


sudo nano /etc/xdg/lxsession/LXDE-pi/autostart
chromium-browser --disable-features=AudioServiceOutOfProcess --kiosk http://localhost:3000/index.html







