download imager https://www.raspberrypi.org/software/
create file ssh
https://www.advanced-ip-scanner.com/ru/

wpa_supplicant.conf (/etc/wpa_supplicant/wpa_supplicant.conf)
country=us
update_config=1
ctrl_interface=/var/run/wpa_supplicant

network={
 scan_ssid=1
 ssid="Lanet_200"
 psk="Oracle_db12"
}

raspberrypi.local

HUAWEI-N1AV0F
WDElements5355



crontab -e
 and use nano
@reboot node /home/pi/radio-node/index.js >> /home/pi/radio-node/out.txt 2>&1

http://www.lcdwiki.com/3.5inch_RPi_Display

sudo apt-get update
sudo apt-get upgrade
sudo apt-get install nodejs
sudo apt-get install npm
sudo apt-get install unclutter

nano /home/pi/.config/lxsession/LXDE-pi/autostart
unclutter -idle 0.5 -root
chromium-browser --disable-features=AudioServiceOutOfProcess --kiosk http://localhost:3000/index.html

sudo nano /etc/xdg/lxsession/LXDE-pi/autostart
chromium-browser --disable-features=AudioServiceOutOfProcess --kiosk http://localhost:3000/index.html




How do I stop the audio message "To install the screen reader press control alt space"?
sudo rm /etc/xdg/autostart/piwiz.desktop







